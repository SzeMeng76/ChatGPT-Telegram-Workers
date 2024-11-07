import { jsonSchema } from 'ai';
import jina_reader from './jina.json';

const tools: Record<string, any> = { jina_reader };

Object.entries(tools).forEach(([k, v]) => {
    tools[k] = {
        description: v.schema.description,
        parameters: jsonSchema(v.schema.parameters as Record<string, any>),
        execute_unstructured: {
            payload: v.payload,
            required: v.required,
        },
        prompt: v.prompt,
        hander: v.hander,
    };
});

export default tools;
