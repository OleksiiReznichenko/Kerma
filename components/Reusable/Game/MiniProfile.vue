<script setup lang="ts">
import UserAchievements from '~~/composables/interfaces/userAchievements';

interface Props {
    id: string;
    nickname: string;
    avatar: string;
    rank: string;
    achievements: UserAchievements;
}

const props = defineProps<Props>();
</script>

<template>
    <div class="mini-profile">
        <div class="info">
            <img :src="avatar" alt="Avatar" class="avatar">
            <strong class="name">{{nickname}}</strong>
            <span class="rank">{{rank}}</span>
            <ReusableAchievements :achievements="achievements" />
            <NuxtLink class="button" :to="'/users/' + id">Check profile</NuxtLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.mini-profile {
    position: absolute;
    // top: 90%;
    top: 0%;
    left: 10%;
    z-index: 1000;
    border-radius: 4rem;
    box-shadow: 0 .25rem 8rem rgba(0, 0, 0, 0.15);
    background-color: $color-pink-light-4;
    padding: 2rem 2.85rem 2.35rem;
    transition: all .3s;

    opacity: 0;
    visibility: hidden;
        
    @media only screen and (max-width: 850px) {
        left: 50%;
        transform: translateX(-50%);
        width: 25rem;
    }

    .info {
        @include flex-center;
        flex-direction: column;
        color: $color-pink-dark-3;
        text-align: center;

        .avatar {
            width: 8.25rem;
            height: 8.25rem;
            border-radius: 100%;
            filter: drop-shadow(.75rem .25rem 1.25rem rgba(0, 0, 0, 0.1));
            margin-bottom: 1rem;
        }

        .name {
            font-weight: 700;
            font-size: 2.3rem;
            max-width: 15rem;
            margin-bottom: 1rem;
        }

        .rank {
            font-weight: 500;
            margin-bottom: .85rem;
        }

        .button {
            font-weight: 600;
            color: $color-pink-dark-2;
            padding: .85rem 1.5rem;
            background-color: $color-primary;
            box-shadow: .75rem .75rem 2rem rgba(0, 0, 0, 0.03);
            border-radius: 2.25rem;
            margin-top: 2.25rem;

            &:hover {
                background-color: lighten($color-primary, 2%);
                transform: scale(1.05);
            }
        }
    }
}
</style>