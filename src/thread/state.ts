import { UIMessage, ChatState, ChatStatus } from 'ai';
import { ThreadStore } from '$thread/store';
import { throttle } from '$lib/utils';

export class ThreadState<UI_MESSAGE extends UIMessage> implements ChatState<UI_MESSAGE> {
    private store: ThreadStore<UI_MESSAGE>;
    private messagesCallbacks = new Set<() => void>();
    private statusCallbacks = new Set<() => void>();
    private errorCallbacks = new Set<() => void>();

    constructor(store: ThreadStore<UI_MESSAGE>) {
        this.store = store;

        this.store.subscribe(
            state => state.messages,
            () => this.messagesCallbacks.forEach(cb => cb())
        );

        this.store.subscribe(
            state => state.status,
            () => this.statusCallbacks.forEach(cb => cb())
        );

        this.store.subscribe(
            state => state.error,
            () => this.errorCallbacks.forEach(cb => cb())
        );
    }

    get messages(): UI_MESSAGE[] {
        return this.store.getState().messages;
    }

    set messages(newMessages: UI_MESSAGE[]) {
        this.store.getState().setMessages(newMessages);
    }

    get status(): ChatStatus {
        return this.store.getState().status;
    }

    set status(newStatus: ChatStatus) {
        this.store.getState().setStatus(newStatus);
    }

    get error(): Error | undefined {
        return this.store.getState().error;
    }

    set error(newError: Error | undefined) {
        this.store.getState().setError(newError);
    }

    pushMessage = (message: UI_MESSAGE) => {
        this.store.getState().pushMessage(message);
    };

    popMessage = () => {
        this.store.getState().popMessage();
    };

    replaceMessage = (index: number, message: UI_MESSAGE) => {
        this.store.getState().replaceMessage(index, message);
    };

    snapshot = <T>(snapshot: T) => {
        return structuredClone(snapshot);
    };

    '~registerMessagesCallback' = (onChange: () => void, throttleWaitMs?: number): (() => void) => {
        const callback = throttleWaitMs ? throttle(onChange, throttleWaitMs) : onChange;
        this.messagesCallbacks.add(callback);
        return () => {
            this.messagesCallbacks.delete(callback);
        };
    };

    '~registerStatusCallback' = (onChange: () => void): (() => void) => {
        this.statusCallbacks.add(onChange);
        return () => {
            this.statusCallbacks.delete(onChange);
        };
    };

    '~registerErrorCallback' = (onChange: () => void): (() => void) => {
        this.errorCallbacks.add(onChange);
        return () => {
            this.errorCallbacks.delete(onChange);
        };
    };
}
