import { AIError } from '$ai/stream';

export type ThreadErrorCodes =
    | 'ThreadAlreadyStreaming'
    | 'ThreadNotFound'
    | 'StreamNotFound'
    | 'NotAuthorized'
    | 'ModelNotFound'
    | 'MessageNotFound';

export class ThreadError extends AIError<ThreadErrorCodes> {}
