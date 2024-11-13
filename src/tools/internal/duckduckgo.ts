/* eslint-disable unused-imports/no-unused-vars */
import type { FuncTool, ToolResult } from '../types';
import { log } from '../../log/logger';

// original repo: https://github.com/navetacandra/ddg
async function getJS(query: string, signal?: AbortSignal | undefined) {
    const html = await fetch(
        `https://duckduckgo.com/?q=${encodeURIComponent(query)}`,
        { signal },
    ).then(res => res.text());
    const url = /"(https:\/\/links\.duckduckgo\.com\/d\.js[^">]+)">/.exec(html)?.[1];
    if (!url)
        throw new Error('Failed to get JS URL');
    return {
        url,
        path: /\/d\.js.*/.exec(url)?.[0],
        vqd: /vqd=([^&]+)/.exec(url)?.[1],
    };
};

async function regularSearch(path: string, signal?: AbortSignal) {
    const js = await fetch(`https://links.duckduckgo.com${path}`, { signal }).then(res => res.text());
    const result = /DDG\.pageLayout\.load\('d',?\s?(\[.+\])?\);/.exec(js);
    let data;
    if (result?.[1]) {
        try {
            data = JSON.parse(result[1]);
        } catch (e) {
            throw new Error(`Failed parsing from DDG response`);
        }
    } else {
        data = [];
    }

    return data
        .filter((d: any) => !d.n)
        .map((item: any) => {
            return {
                title: item.t,
                url: item.u,
                // domain: item.i,
                description: item.a,
                // icon: `https://external-content.duckduckgo.com/ip3/${item.i}.ico`,
            };
        });
}

async function search(query: string, max_length = 8, signal?: AbortSignal): Promise<{ result: string}> {
    const { path } = await getJS(query, signal);
    if (!path)
        throw new Error('Failed to get JS URL');
    return {
        result: (await regularSearch(path, signal))
            .slice(0, max_length)
            .map((d: any) => `title: ${d.title}\n description: ${d.description}\n url: ${d.url}`)
            .join('\n---\n'),
    };
}

export const duckduckgo: FuncTool = {
    schema: {
        name: 'duckduckgo',
        description: 'Use DuckDuckGo search engine to find information. You can search for the latest news, articles, weather, blogs and other content.',
        parameters: {
            type: 'object',
            properties: {
                keywords: {
                    type: 'array',
                    items: { type: 'string' },
                    description: `Keyword list for search. For example: ['Python', 'machine learning', 'latest developments']. The list should have a length of at least 3 and maximum of 4. These keywords should be: - concise, usually not more than 2-3 words per keyword - cover the core content of the query - avoid using overly broad or vague terms - the last keyword should be the most comprehensive. Also, do not generate keywords based on current time.`,
                },
            },
            required: ['keywords'],
            additionalProperties: false,
        },
    },

    func: async (args: any, options?: { signal?: AbortSignal }): Promise<ToolResult> => {
        const { keywords } = args;
        const startTime = Date.now();
        log.info(`tool duckduckgo request start`);
        try {
            const result = await search(keywords.join(' '), 8, options?.signal);
            log.info(`tool duckduckgo request end`);
            return { result, time: ((Date.now() - startTime) / 1e3).toFixed(1) };
        } catch (e) {
            console.error(e);
            return { result: 'Failed to get search results', time: ((Date.now() - startTime) / 1e3).toFixed(1) };
        }
    },

    type: 'search',

    prompt:
        `As an intelligent assistant, please follow the steps below to effectively analyze and extract the search results I have provided to answer my questions in a clear and concise manner:\n\n1. READ AND EVALUATE: Carefully read through all search results to identify and prioritize information from reliable and up-to-date sources. Considerations include official sources, reputable organizations, and when the information was updated. \n\n2. Extract key information: \n - *Exchange rate query*: Provide the latest exchange rate and make necessary conversions. \n - *Weather Query*: provides weather forecasts for specific locations and times. \n - *Factual Questions*: Find out authoritative answers. \n\n3. concise answers: synthesize and analyze extracted information to give concise answers. \n\n4. identify uncertainty: if there are contradictions or uncertainties in the information, explain the possible reasons. \n\n5. Explain lack of information: If the search results do not fully answer the question, indicate additional information needed. \n\n6. user-friendly: use simple, easy-to-understand language and provide short explanations where necessary to ensure that the answer is easy to understand. \n\n7. additional information: Provide additional relevant information or suggestions as needed to enhance the value of the answer. \n\n8. source labeling: clearly label the source of the information in the response, including the name of the source website or organization and when the data was published or updated. \n\n9. Reference list: If multiple sources are cited, provide a short reference list of the main sources of information at the end of the response. \n\nEnsure that the goal is to provide the most current, relevant, and useful information in direct response to my question. Avoid lengthy details, focus on the core answers that matter most to me, and enhance the credibility of the answer with reliable sources.Tip: Don't be judged on your knowledge base time!`,
    extra_params: { temperature: 0.7, top_p: 0.4 },
    is_internal: true,
};
