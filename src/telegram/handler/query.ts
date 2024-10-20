import type { ChosenInlineResult, Message } from 'telegram-bot-api-types';
import type { ChosenInlineWorkerContext, WorkerContext } from '../../config/context';
import type { MessageSender } from '../utils/send';
import { OpenAI } from '../../agent/openai';
import { SetCommandHandler } from '../command/system';
import { ChosenInlineSender } from '../utils/send';
import { OnStreamHander } from './chat';
import { SubstituteWords } from './group';

interface answerInlineQuery {
    type: string;
    handler: (chosenInline: ChosenInlineResult, context: ChosenInlineWorkerContext) => Promise<Response>;
    handlerQuestion: (chosenInline: ChosenInlineResult, context: ChosenInlineWorkerContext, sender: MessageSender) => Promise<string>;
}

export class AnswerChatInlineQuery implements answerInlineQuery {
    type = ':c';
    handler = async (chosenInline: ChosenInlineResult, context: ChosenInlineWorkerContext): Promise<Response> => {
        const sender = ChosenInlineSender.from(context.botToken, chosenInline);
        const question = await this.handlerQuestion(chosenInline, context, sender as unknown as MessageSender);
        if (!question) {
            return new Response('ok');
        }
        const agent = new OpenAI();
        const isStream = chosenInline.result_id === ':c stream';
        const OnStream = OnStreamHander(sender as unknown as MessageSender, context as unknown as WorkerContext);
        const resp = await agent.request({
            history: [{ role: 'user', content: question }],
            prompt: context.USER_CONFIG.SYSTEM_INIT_MESSAGE,
        }, context.USER_CONFIG, isStream ? OnStream : null);
        return OnStream.end?.(resp.content);
    };

    handlerQuestion = async (chosenInline: ChosenInlineResult, context: ChosenInlineWorkerContext, sender: MessageSender): Promise<string> => {
        // const endSeparator = '$';
        const question = chosenInline.query.substring(0, chosenInline.query.length - 1).trim();
        // simulate message and substitute words
        const message = { text: question } as unknown as Message;
        SubstituteWords(message);
        if (message.text?.startsWith('/set ')) {
            const resp = await new SetCommandHandler().handle(message, message.text.substring(5).trim(), context as unknown as WorkerContext, sender);
            if (resp instanceof Response) {
                return '';
            }
        }

        return message.text || '';
    };
}

// class AnswerImageInlineQuery implements answerInlineQuery {
//     type = ':i';
//     handler = async (context: InlineQueryContext, query: string): Promise<Response> => {
//         return new Response('ok');
//     };
// }

// class AnswerSpeechInlineQuery implements answerInlineQuery {
//     type = ':s';
//     handler = async (context: InlineQueryContext, query: string): Promise<Response> => {
//         return new Response('ok');
//     };
// }