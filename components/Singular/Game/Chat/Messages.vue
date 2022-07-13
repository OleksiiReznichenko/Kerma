<script setup lang="ts">
import { Ref } from 'vue';
import ChatMessage from '@/composables/interfaces/message';
import User from '@/composables/interfaces/user';

// MY USER'S ID
const myUserId = inject<Ref<string>>('myUserId');

// CURRENT CHAT MESSAGES
const messages = inject<Ref<ChatMessage[] | undefined[]>>('messages');

// CURRENT CHAT MESSAGES USERS
const messagesUsers = inject<Ref<User[] | undefined[]>>('messagesUsers');
</script>

<template>
    <div class="messages">
        <ReusableChatMessage 
            v-for="(message, i) in messages"
            :key="message.id"
            :isMe='message.userId === myUserId'
            :text='message.text'
            :user-id='message.userId'
            :nickname="messagesUsers[i].nickname"
            :avatar="messagesUsers[i].avatar"
        />
    </div>
</template>

<style lang="scss" scoped>
.messages {
    display: flex;
    flex-direction: column;
    max-height: 80%;
    overflow-y: scroll;
    padding-bottom: 4rem;
    padding-right: 1.5rem;

    &::-webkit-scrollbar {
        height: 5px;
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 17px;
        background-color: white;
    }

    &::-webkit-scrollbar-track {
        background-image: linear-gradient(to right, transparent 0%, transparent 30%, rgba(white, .7) 30%, rgba(white, .7) 70%, transparent 70%, transparent 100%);
        margin-bottom: 8rem;
    }
}
</style>