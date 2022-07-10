<script setup lang="ts">
import { storeToRefs } from 'pinia';

const baseStore = useBaseStore();
const { isChatOpenIndicator } = storeToRefs(baseStore);

// OPEN CHAT
const openChat = baseStore.isChatOpenIndicatorToTrue;

// CLOSE CHAT
const closeChat = baseStore.isChatOpenIndicatorToFalse;

// TOGGLE CHAT
const toggleChat = (): void => {
    if (isChatOpenIndicator.value) {
        closeChat();
    } else {
        openChat();
    }
};
</script>

<template>
    <button @click="toggleChat" class="chat-button">
        <img src="@/assets/img/cloudForChat.png" alt="Cloud" class="cloud">
        <img src="@/assets/svg/chat.svg" alt="Chat icon" class="icon">
    </button>
</template>

<style lang="scss" scoped>
.chat-button {
    position: absolute;
    top: -3.5rem;
    right: -8.5rem;
    z-index: 1500;
    width: 12rem;

    &:hover {
        transform: scale(1.1);
    }
    
    @media only screen and (max-width: 1000px) {
        top: -5.5rem;
        right: -2.5rem;
    }
    
    @media only screen and (max-width: 850px) {
        position: fixed;
        top: auto;
        bottom: 8rem;
        right: 0;
    }

    .cloud {
        width: 100%;
        transition: all .3s;
    }

    .icon {
        position: absolute;
        bottom: 0rem;
        right: .5rem;
        padding: 2rem;
        width: 8rem;
    }
}
</style>