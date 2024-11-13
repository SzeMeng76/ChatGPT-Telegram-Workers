/* eslint-disable unused-imports/no-unused-vars */

interface Database {
    get: (key: string) => Promise<string | null>;
}

interface Message {
    text?: string;
    id?: string;
    type: string;
}

interface ReadMessageResult {
    text: string;
    id: string[];
    type: string;
}

async function readMessage(DATABASE: Database, key: string, fileType: string = 'text'): Promise<ReadMessageResult> {
    const data: Message[] = JSON.parse((await DATABASE.get(key)) || '[]').filter((i: Message) => i.type === fileType);
    return {
        text: data.map(({ text }) => text || '').join('\n\n'),
        id: data.map(({ id }) => id || []).flat(),
        type: fileType,
    };
}

interface UserConfig {
    ALLOW_MODIFY_KEYS: string[];
    [key: string]: any;
}

interface ChangeUserConfigParams {
    [key: string]: any;
}

function changeUserConfig(params: ChangeUserConfigParams, userConfig: UserConfig): void {
    for (const [key, value] of Object.entries(params)) {
        if (userConfig.ALLOW_MODIFY_KEYS.includes(key)) {
            userConfig[key] = value;
        }
    }
}

export const llmControl = {
    read_history_to_chat_with_llm: {
        name: 'read_history_to_chat_with_llm',
        strict: true,
        description:
      'Based on the user\'s input, generate parameters for the historical records to be read, including quantity and type, and create a question for dialogue with llm based on the user\'s input. For example when a user inputs: "Interpret the two images I just sent,". The limit is 2. The type is "image". And extracts the question: "Interpret these two images."',
        parameters: {
            type: 'object',
            properties: {
                limit: {
                    type: 'number',
                    description:
            'Number of historical records to be read',
                },
                type: {
                    type: 'string',
                    enum: ['text', 'image'], // 读取文本与图片
                    description: 'Type of historical records to be read',
                },
                question: {
                    type: 'string',
                    description:
            'The question posed to the large model',
                },
            },
            required: ['limit', 'type', 'question'],
            additionalProperties: false,
        },
    },
    change_user_config_to_chat_with_llm: {
        name: 'change_user_config',
        strict: true,
        description:
      'Modify user configuration based on user input',
        parameters: {
            type: 'object',
            properties: {
                key: {
                    default: 'OPENAI_CHAT_MODEL',
                    enum: ['CHAT_MODEL', 'OPENAI_CHAT_MODEL', 'VISION_MODEL', 'USE_TOOLS', 'FUNC_CALL_MODEL'],
                    description: 'Configurable properties that can be modified.',
                },
                value: {
                    type: 'string',
                    enum: [''],
                    description: 'The value of the property that the user needs to change.',
                },
            },
            required: ['key', 'value'],
            additionalProperties: false,
        },
    },
    type: 'buildin',
};
