import { AbstractChat, ChatInit, UIMessage } from 'ai';
import { ThreadState } from '$thread/state';
import { createThreadStore, ThreadStore } from '$thread/store';
import { useChat } from '@ai-sdk/react';

export class Thread<UI_MESSAGE extends UIMessage> extends AbstractChat<UI_MESSAGE> {
    protected state: ThreadState<UI_MESSAGE>;
    public store: ThreadStore<UI_MESSAGE>;

    constructor(init: ChatInit<UI_MESSAGE>) {
        const store = createThreadStore<UI_MESSAGE>({
            id: init.id,
            messages: init.messages ?? [],
        });
        const state = new ThreadState<UI_MESSAGE>(store);

        super({ ...init, state });

        this.state = state;
        this.store = store;
    }

    '~registerMessagesCallback' = (onChange: () => void, throttleWaitMs?: number): (() => void) =>
        this.state['~registerMessagesCallback'](onChange, throttleWaitMs);

    '~registerStatusCallback' = (onChange: () => void): (() => void) =>
        this.state['~registerStatusCallback'](onChange);

    '~registerErrorCallback' = (onChange: () => void): (() => void) =>
        this.state['~registerErrorCallback'](onChange);
}
