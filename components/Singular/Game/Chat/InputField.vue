<script setup lang="ts">
import { storeToRefs } from 'pinia';
import ChatMessage from '@/composables/interfaces/message';

// MY USER ID
const baseStore = useBaseStore();
const { myUser } = storeToRefs(baseStore);

// MESSAGES CONTAINER DOM
const scrollToBottom = inject<Function>('scrollToBottom');

// USERS ARRAY
const chatStore = useChatStore();

// MESSAGE RELATED
const maxMessageLength = ref<number>(400);
let newMessage = ref<string>('');
let newMessageNoWhiteSpace = ref<string>('');

// GROW TEXTAREA ON TEXT WRAP
const autoGrow = (event: Event): void => {
    const target = event.target as HTMLElement;
    target.style.height = "5px";
    target.style.height = (target.scrollHeight) + "px";
};

// REMOVE EXCESSIVE WHITE SPACES IN VALUE
const removeWhiteSpaces = (): void => {
    newMessageNoWhiteSpace.value = '';
    if (newMessage.value.includes(' ')) {
    const messageInputArr = newMessage.value.split(' ');

    const messageInputArr2 = messageInputArr.filter(el => {
        if (el.replace(/\s/g, '')) {
        return el.replace(/\s/g, '');
        }
    })

    const validatedMessage = messageInputArr2.join(' ');
    newMessageNoWhiteSpace.value = validatedMessage;
    } else {
        newMessageNoWhiteSpace.value = newMessage.value;
    }
};

// SEND MESSAGE
const sendMessage = (event: Event): void => {
    event.preventDefault();

    removeWhiteSpaces();

    if (!newMessageNoWhiteSpace.value || !myUser.value.id) return;

    const newMessageObject: ChatMessage = {
        id: (Math.random() * Date.now()).toString(),
        userId: myUser.value.id,
        text: newMessage.value
    };

    chatStore.addNewMessage(newMessageObject);
    newMessage.value = '';
    setTimeout(() => {
        scrollToBottom();
    }, 15);
};
</script>

<template>
    <div :class="{'inactive': !myUser.id}" class="input-container">
        <!-- <SingularGameChatEmojiPicker /> -->
        <textarea @keypress.enter="sendMessage" @input="autoGrow" v-model="newMessage" :maxlength="maxMessageLength" name="message" id="messageInput" cols="30" rows="1" wrap="soft" placeholder="Message"></textarea>
        <button @click="sendMessage" class="send-button">
            <img src="@/assets/svg/arrow.svg" alt="Arrow" class="arrow">
        </button>
    </div>
</template>

<style lang="scss" scoped>
.inactive {
    pointer-events: none;
    opacity: .5;
}

.input-container {
    position: absolute;
    bottom: 3.5rem;
    left: 2.5rem;
    right: 2.5rem;
    background-image: linear-gradient(to right, #EEDFF9, #EBDAF7);
    border-radius: 1.25rem;
    margin-top: 3rem;
    box-shadow: 0 .25rem 2rem rgba(0, 0, 0, 0.1);

    #messageInput {
        color: $color-pink-dark-3;
        font-size: 1.6rem;
        width: 82%;
        margin-top: 2px;
        padding: 2rem;
        padding-left: 5rem;
    }

    .send-button {
        @include flex-center;
        position: absolute;
        top: 50%;
        right: 2rem;
        transform: translateY(-50%);
        width: 3.5rem;
        height: 3.5rem;
        background-color: $color-blue-2;
        padding: .35rem 1rem;
        border-radius: 1.25rem;
        transition: all .3s;

        &:hover {
            background-color: darken($color-blue-2, 5%);
        }

        .arrow {
            width: 1.5rem;
        }
    }
}
</style>