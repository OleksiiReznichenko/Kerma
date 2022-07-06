<script setup lang="ts">
import { storeToRefs } from 'pinia';

interface Props {
    id: string;
    winnerId: string;
    winnerNickname: string;
    winnerAvatar: string;
    winnerBetId: string;
    winAmountEth: number;
    gameDate: string;
}

const props = defineProps<Props>();

// GET BASE URL
const baseStore = useBaseStore();
const { baseUrl } = storeToRefs(baseStore);

// AVATAR PATH
const avatarPath = computed<string>(() => {
    if (props.winnerAvatar === 'default') {
        return baseUrl.value + 'imgs/defaultAvatar.png';
    } else {
        return props.winnerAvatar;
    }
});
</script>

<template>
    <div class="game">
        <div class="header">
            <div class="id-container container">
                <h6 class="subtitle">Game ID:</h6>
                <span class="id">#{{id}}</span>
            </div>
            <img :src="avatarPath" alt="Avatar" class="avatar">
        </div>
        <div class="info">
            <div class="container">
                <h6 class="subtitle">Winner:</h6>
                <strong class="info-line winner">{{winnerNickname}}</strong>
            </div>
            <div class="container">
                <h6 class="subtitle">Winner's bet:</h6>
                <strong class="info-line winner-bet">#{{winnerBetId}}</strong>
            </div>
            <div class="container amount-win-container">
                <h6 class="subtitle">Amount win:</h6>
                <strong class="info-line amount-win-line">
                    <span class="amount-win">{{winAmountEth.toFixed(2)}}</span>
                    <span>ETH</span>
                </strong>
            </div>
        </div>
        <NuxtLink :to="'/users/' + winnerId" class="btn">More details</NuxtLink>
    </div>
</template>

<style lang="scss" scoped>
.game {
    background-image: radial-gradient(124.5% 142.12% at -43.52% -39.92%, #FDF7FF 0%, #e2d5ff 100%);
    border-radius: 30px;
    padding: 1rem 2.25rem 2.25rem;
    text-align: center;
    // width: 24rem;
    font-size: 1.2rem;

    @media only screen and (max-width: 1350px) and (min-width: 1300px),
    only screen and (max-width: 1100px) and (min-width: 850px) {
        padding: 1rem 1.75rem 2.25rem;
    }

    @media only screen and (max-width: 850px) {
        padding: 1.5rem 2.75rem 2.75rem;
    }

    .container {
        @include flex-center;
        align-items: flex-end;
        color: $color-pink-dark-3;
        white-space: nowrap;
        flex-grow: 1;

        .subtitle {
            font-weight: 400;
            font-size: 1.3rem;
            margin-right: .5rem;

            @media only screen and (max-width: 1350px) and (min-width: 1300px),
            only screen and (max-width: 1100px) and (min-width: 850px) {
                font-size: 1.2rem;
            }

            @media only screen and (max-width: 850px) {
                font-size: 1.4rem;
            }
        }

        .info-line {
            font-size: 1.4rem;
            display: inline-block;
            text-overflow: ellipsis;
            overflow: hidden;
            max-width: 10rem;

            @media only screen and (max-width: 1350px) and (min-width: 1300px),
            only screen and (max-width: 1100px) and (min-width: 850px) {
                max-width: 8rem;
            }

            @media only screen and (max-width: 850px) {
                font-size: 1.6rem;
            }
        }
        
        .id {
            font-size: 1.2rem;
            text-overflow: ellipsis;
            overflow: hidden;
            max-width: 9rem;

            @media only screen and (max-width: 1350px) and (min-width: 1300px) {
                max-width: 8rem;
            }

            @media only screen and (max-width: 850px) {
                font-size: 1.4rem;
            }
        }
    }

    .amount-win-container {

        .info-line {
            max-width: 12rem;
            overflow: visible;
        }

        .amount-win-line {
            display: flex;
            align-items: flex-end;
        }

        .amount-win {
            display: inline-block;
            text-overflow: ellipsis;
            overflow: hidden;
            max-width: 20rem;
            margin-right: .4rem;
        }
    }

    .header {
        margin-bottom: 2rem;

        .avatar {
            border: 1rem solid white;
            border-radius: 100%;
            width: 15rem;
            height: 15rem;
            box-shadow: 1rem 1.75rem 2.5rem rgba(147, 105, 160, 0.3);

            @media only screen and (max-width: 850px) {
                width: 17rem;
                height: 17rem;
            }
        }

        .id-container {
            font-size: 1.1rem;
            margin-bottom: 1rem;
        }
    }

    .info {
        margin-bottom: 2rem;

        .container {
            &:not(:last-of-type) {
                margin-bottom: 1rem;
            }

            .subtitle {
                font-weight: 500;
            } 
        }
    }

    .btn {
        padding: 1.25rem 4.5rem 1.1rem;
        border-radius: 30px;
        background-color: $color-pink-dark;
        font-size: 1.2rem;
        text-transform: uppercase;
        white-space: nowrap;

        &:hover {
            background-color: white;
            color: $color-pink-dark;
        }

        @media only screen and (max-width: 850px) {
            font-size: 1.4rem;
        }
    }
}
</style>