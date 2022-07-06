import { defineStore } from 'pinia';
import ChatMessage from '../interfaces/message';

interface State {
    messages: ChatMessage[];
}

export const useChatStore = defineStore({
    id: 'chatStore',

    state: (): State => ({
        messages: [
            {
                id: 'alfjfwoiqj2j1jflkfj90',
                userId: 'kfasjfll212oiopnlal',
                text: 'Ya tvoi rot naoborot, chepushila kitayskaya'
            },
            
            {
                id: 'jijo[fasjfoijo1jo2k9j',
                userId: 'kfasjfll212oiopnlal',
                text: 'Ya tvoi rot naoborot, chepushila kitayskaya'
            },
            
            {
                id: 'kjafjieojeajfeopj02j3',
                userId: 'qwrns9jk3ngb136jdkw',
                text: 'Ya tvoi rot naoborot, chepushila kitayskaya'
            },
            
            {
                id: 'ghndnsklgjs39jfsafa00',
                userId: 'ewafeeeefgeyeee32r8',
                text: 'Ya tvoi rot naoborot, chepushila kitayskaya'
            },
            
            {
                id: 'noceafojoi3o2infajls3',
                userId: 'ioi1oi1jdsfass2nk1j',
                text: 'Ya tvoi rot naoborot, chepushila kitayskaya'
            },
            
            {
                id: 'iwoijbasdjkanfnaskeaf',
                userId: 'ioi1oi1jdsfass2nk1j',
                text: 'Ya tvoi rot naoborot, chepushila kitayskaya'
            },
            
        ]
    }),

    actions: {
        addNewMessage(newMessage: ChatMessage) {
            this.messages.push(newMessage);
        }
    }
})