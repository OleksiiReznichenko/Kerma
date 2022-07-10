<script setup lang="ts">
import { storeToRefs } from 'pinia';

interface Props {
    isMe: boolean;
    text: string;
    userId: string;
    nickname: string;
    avatar: string;
}

const props = defineProps<Props>();

// GET BASE URL
const baseStore = useBaseStore();
const { baseUrl } = storeToRefs(baseStore);

// NICKNAME
const nickname = computed(() => {
    if (!props.isMe) {
        return props.nickname;
    } else {
        return 'Me';
    }
});

// AVATAR PATH
const avatarPath = computed<string>(() => {
    if (props.avatar === 'default') {
        return baseUrl.value + 'imgs/defaultAvatar.png';
    } else {
        return props.avatar;
    }
});
</script>

<template>
    <div :class="{'message-right': isMe}" class="message">
        <nuxt-link :to="'/users/' + userId" class="avatar-container">
            <img :src="avatarPath" alt="Avatar" class="avatar">
        </nuxt-link>
        <div class="message-content">
            <div class="name-date-container">
                <nuxt-link :to="'/users/' + userId" class="name">{{nickname}}</nuxt-link>
            </div>
            <p class="message-text">
                {{text}}
            </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.message {
    display: flex;
    align-items: flex-end;
    width: 90%;
    margin-bottom: 2rem;
    user-select: text !important;

    @media only screen and (max-width: 400px) {
        width: 92%;
    }

    .avatar-container {
        width: 4rem;
        height: 4rem;
        margin-right: 1.25rem;
        margin-bottom: -1rem;
        display: block;

        .avatar {
            width: 4rem;
            height: 4rem;
            border-radius: 100%;
            object-fit: cover;
        }
    }

    .message-content {
        color: $color-pink-dark-2;
        background-color: $color-pink-light-15;
        border-radius: 10px;
        border-bottom-left-radius: 0;
        padding: 1.5rem;
        width: 100%;
        overflow: hidden;
        box-shadow: .75rem .75rem 1.35rem rgba(76, 26, 92, 0.08);
        cursor: default !important;

        .name-date-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;

            .name {
                color: $color-pink-dark-3;
                font-weight: 500 !important;
                cursor: pointer !important;
            }
        }

        .message-text {
            cursor: text !important;
        }
    }
}

.message-right {
    align-self: flex-end;

    .avatar-container {
        order: 1;
        margin-right: 0;
        margin-left: 1.25rem;
    }

    .message-content {
        background-color: $color-pink-light-16;
        order: 0;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 0;
    }
}
</style>