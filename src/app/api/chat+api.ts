import { createUIMessageStreamResponse, convertUIMessagesToModelMessages } from '$ai/stream';
import { auth } from '$auth';
import { ThreadMessage } from '$ai/types';
import { z } from 'zod';
import { ThreadError } from '$ai/error';
import { nanoid } from '$lib/utils';
import {
    generateThreadTitle,
    prepareThread,
    saveMessageAndResetThreadStatus,
    streamContext,
} from '$ai/service';
import { smoothStream } from 'ai';

export function POST(request: Request) {
    return createUIMessageStreamResponse<ThreadMessage>()({
        request,
        schema: z.object({
            id: z.string(),
            modelId: z.string(),
            message: z.any(),
        }),
        onPrepare: async ({ body, request }) => {
            const session = await auth.api.getSession({
                headers: request.headers,
            });

            if (!session) {
                throw new ThreadError('NotAuthorized', {
                    status: 401,
                });
            }

            const streamId = nanoid();

            const { history, thread, message, model } = await prepareThread({
                streamId,
                modelId: body.modelId,
                userId: session.user.id,
                threadId: body.id,
                message: body.message,
            });

            return {
                streamId,
                threadId: thread.id,
                userId: session.user.id,
                model,
                thread,
                message,
                messages: await convertUIMessagesToModelMessages(history, {
                    supportsImages: model.capabilities.includes('vision'),
                    supportsDocuments: model.capabilities.includes('documents'),
                }),
            };
        },
        onStream: ({ context: { messages, model } }) => {
            return {
                model: model.model,
                messages,
                temperature: 0.8,
                experimental_transform: smoothStream({
                    chunking: 'word',
                }),
            };
        },
        onStreamMessageMetadata: ({ part, context: { model } }) => {
            if (part.type === 'start') {
                return {
                    model: {
                        id: model.id,
                        name: model.name,
                        icon: model.icon,
                    },
                };
            }
        },
        onAfterStream: async ({ context: { threadId, message, streamId, thread }, stream }) => {
            const promises: Promise<any>[] = [];

            if (!thread.title) {
                promises.push(generateThreadTitle(threadId, message.message));
            }

            promises.push(streamContext.createNewResumableStream(streamId, () => stream));

            await Promise.all(promises);
        },
        onStreamError: ({ error, writer }) => {
            console.error(error);
            writer.write({
                type: 'data-error',
                data: 'Error generating response.',
            });
        },
        onFinish: async ({ responseMessage, context: { threadId, userId } }) => {
            await saveMessageAndResetThreadStatus({
                threadId,
                userId,
                message: responseMessage,
            });
        },
    });
}
