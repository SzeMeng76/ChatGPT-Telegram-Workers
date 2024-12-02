import type { AgentUserConfig } from '../../config/env';
import { cosineSimilarity } from 'ai';
import { OpenaiEmbedding, OpenAILikeEmbedding } from './embedding';

interface RerankResult {
    similar: number;
    value: string;
}

export class Rerank {
    readonly rank = async (context: AgentUserConfig, data: string[], topN: number = 1): Promise<RerankResult[]> => {
        switch (context.RERANK_AGENT) {
            case 'jina':
                return this.jina(context, data, topN);
            case 'openai':
                return this.openai(context, data, topN);
            case 'oailike':
                return context.OAILIKE_RERANK_TYPE === 'v1' ? this.oailikeV1(context, data, topN) : this.oailikeV2(context, data, topN);
            default:
                throw new Error('Invalid RERANK_AGENT');
        }
    };

    readonly jina = async (context: AgentUserConfig, data: string[], topN: number): Promise<RerankResult[]> => {
        const url = 'https://api.jina.ai/v1/rerank';
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.JINA_API_KEY}`,
            },
            body: JSON.stringify({
                model: context.JINA_RERANK_MODEL,
                query: data[0],
                documents: data.slice(1),
                top_n: topN,
            }),
        }).then(res => res.json());
        if (!result.results) {
            throw new Error(`${JSON.stringify(result)}`);
        }
        return result.results.map((item: any) => ({ similar: item.relevance_score, value: item.document.text }));
    };

    readonly openai = async (context: any, data: string[], topN: number): Promise<RerankResult[]> => {
        const embeddings = await new OpenaiEmbedding().request(context, data);
        const inputEmbeddings = embeddings[0].embed;
        return embeddings.slice(1)
            .map(({ embed, value }) => ({ similar: cosineSimilarity(inputEmbeddings, embed), value }))
            .sort((a, b) => b.similar - a.similar)
            .slice(0, topN);
    };

    readonly oailikeV1 = async (context: AgentUserConfig, data: string[], topN: number): Promise<RerankResult[]> => {
        const embeddings = await new OpenAILikeEmbedding().request(context, data);
        const inputEmbeddings = embeddings[0].embed;
        return embeddings.slice(1)
            .map(({ embed, value }) => ({ similar: cosineSimilarity(inputEmbeddings, embed), value }))
            .sort((a, b) => b.similar - a.similar)
            .slice(0, topN);
    };

    readonly oailikeV2 = async (context: AgentUserConfig, data: string[], topN: number): Promise<RerankResult[]> => {
        const url = `${context.OAILIKE_API_BASE}/rerank`;
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.OAILIKE_API_KEY}`,
            },
            body: JSON.stringify({
                model: context.OAILIKE_RERANK_MODEL,
                query: data[0],
                documents: data.slice(1),
                top_n: topN,
                // siliconflow: return the documents
                return_documents: true,
            }),
        }).then(res => res.json());
        if (!result.results) {
            throw new Error(`${JSON.stringify(result)}`);
        }
        return result.results.map((item: any) => ({ similar: item.relevance_score, value: item.document.text }));
    };
}
