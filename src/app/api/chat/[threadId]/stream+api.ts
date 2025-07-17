import { createResumeStreamResponse } from '$ai/stream';
import { auth } from '$auth';
import { ThreadError } from '$ai/error';
import { prepareResumeThread, streamContext } from '$ai/service';

export function GET(request: Request, { threadId }: { threadId: string }) {
    return createResumeStreamResponse({
        streamContext,
        onPrepare: async () => {
            const session = await auth.api.getSession({
                headers: request.headers,
            });

            if (!session) {
                throw new ThreadError('NotAuthorized', {
                    status: 401,
                });
            }

            const streamId = await prepareResumeThread({
                threadId,
                userId: session.user.id,
            });

            return streamId;
        },
    });
}
