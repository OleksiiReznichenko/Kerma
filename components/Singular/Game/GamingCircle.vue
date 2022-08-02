<script setup lang="ts">
import { storeToRefs } from 'pinia';

interface Props {
    prizeFund: number;
    highestBetAmount: number | undefined;
    highestBetUserAvatar: string | undefined;
}

const props = defineProps<Props>();

// NAV OPEN INDICATOR
const baseStore = useBaseStore();
const { navOpenIndicator } = storeToRefs(baseStore);

// GET BASE URL
const baseUrl = useBaseStore().baseUrl;

// ANIMATION CLASS INDICATOR
let addAnimationClass = ref<boolean>(true);

// AVATAR PATH
const avatarPath = computed<string>(() => {
    if (!props.highestBetUserAvatar) return baseUrl + 'imgs/defaultAvatar.png';
    if (props.highestBetUserAvatar === 'default') {
        return baseUrl + 'imgs/defaultAvatar.png';
    } else {
        return props.highestBetUserAvatar;
    }
});

const highestBetAmount = computed(() => {
    if (props.highestBetAmount) {
        return props.highestBetAmount;
    }
    return 0;
})

// STOP GAMING CIRCLE ANIMATION ON NAVIGATION OPEN
watch(navOpenIndicator, (newValue) => {
    if (newValue) {
        setTimeout(() => {
            addAnimationClass.value = !newValue;
        }, 100);
    } else {
        addAnimationClass.value = !newValue;
    }
})
</script>

<template>
    <div :class="{'animation': addAnimationClass}" class="gaming-circle">
        <div class="circles-container">
            <div class="circle-container circle-container-1">
                <img src="@/assets/svg/circle1.svg" alt="Circle 1" class="circle circle-1">
            </div>
            <div class="circle-container circle-container-2">
                <img src="@/assets/svg/circle2.svg" alt="Circle 2" class="circle circle-2">
            </div>
            <div class="circle-container circle-container-3">
                <img src="@/assets/svg/circle3.svg" alt="Circle 3" class="circle circle-3">
            </div>
            <div class="circle-container circle-container-4">
                <img src="@/assets/svg/circle5.svg" alt="Circle 4" class="circle circle-4">
            </div>
            <div class="circle-container circle-container-5">
                <img src="@/assets/svg/circle4.svg" alt="Circle 5" class="circle circle-5">
            </div>
        </div>
        <div class="main-circle">
            <div class="circle-white-lines-cotnainer">
                <img src="@/assets/svg/circleWhiteLines.svg" alt="White lines" class="circle-white-lines">
            </div>
            <div class="circle-filling-container">
                <div class="inner-container">
                    <img src="@/assets/svg/semicircle.svg" alt="Semicircle" class="circle-filling circle-filling-shadow">
                    <img src="@/assets/svg/semicircle.svg" alt="Semicircle" class="circle-filling circle-filling-grey">
                    <img src="@/assets/svg/semicircleGradient.svg" alt="Semicircle gradient" class="circle-filling circle-filling-gradient">
                </div>
            </div>
            <div class="info">
                <strong class="normal">PRIZE FUND:</strong>
                <strong class="big">{{prizeFund.toFixed(4)}} ETH</strong>
                <strong class="normal">({{(prizeFund * 10).toFixed(2)}} USD)</strong>
                <div class="line"></div>
                <div class="bet-container">
                    <strong class="normal">Highest Current Bet:</strong>
                    <div class="flex-container">
                        <img :src="avatarPath" alt="Avatar" class="avatar">
                        <strong class="normal">{{highestBetAmount.toFixed(4)}} ETH</strong>
                    </div>
                </div>
                <strong class="small">({{(highestBetAmount * 10).toFixed(2)}} USD)</strong>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.animation {

    .circles-container {

        .circle-container-1 {

            .circle {
                animation: rotateClockwise 5s infinite alternate;
            }
        }

        .circle-container-2 {

            .circle {
                animation: rotateCounterClockwise 5s 2s infinite alternate;
            }
        }

        .circle-container-3 {

            .circle {
                animation: rotateClockwise 10s infinite alternate;
            }
        }

        .circle-container-4 {

            .circle {
                animation: rotateCounterClockwise 12s infinite alternate;
            }
        }

        .circle-container-5 {

            .circle {
                animation: rotateClockwise 12s 3s infinite alternate;
            }
        }
    }

    .circle-white-lines {
        animation: rotateClockwise 12s linear infinite backwards;
    }

    .circle-filling-gradient {
        animation: fillingAnimation 5s linear infinite alternate;
    }
}

.gaming-circle {
    width: 47rem;
    height: 47rem;
    position: fixed;
    top: 42%;
    transform: translateY(-50%) translateX(-10%);
    
    @media only screen and (max-width: 1200px) and (min-height: 750px) {
        left: 8%;
        transform: translateY(-50%);
    }
    
    @media only screen and (max-width: 1000px) and (min-height: 750px) {
        left: 2%;
        transform: translateY(-50%);
    }
    
        @media only screen and (max-width: 850px) {
        position: relative;
        transform: none;
        left: auto;
        top: auto;
        margin: 0 auto;
        margin-top: -4rem;
    }


    .circle-container {
        @include abs-center;
    }

    .circle {
        width: 100%;
        height: 100%;
    }

    .circles-container {
        width: 100%;
        height: 100%;

        .circle-container-1 {
            width: 40.5rem;
            height: 35rem;
            z-index: 250;
        }

        .circle-container-2 {
            width: 36rem;
            z-index: 210;
        }

        .circle-container-3 {
            width: 37,5rem;
            z-index: 170;
        }

        .circle-container-4 {
            width: 42rem;
            z-index: 130;
            top: 51%;
        }

        .circle-container-5 {
            width: 43rem;
            z-index: 90;
            left: 48%;
            top: 49%;
        }
    }

    .main-circle {
        @include abs-center;
        width: 29rem;
        height: 29rem;
        background-color: $color-grey;
        border-radius: 100%;
        z-index: 400;
        box-shadow: 2rem 2rem 3rem rgba($color-grey, 0.7);

        .circle-white-lines-cotnainer {
            @include abs-center;
            width: 25rem;
            height: 25rem;

            .circle-white-lines {
                width: 100%;
                height: 100%;
            }
        }

        .circle-filling-container {
            @include abs-center;
            width: 22rem;
            height: 22rem;

            .inner-container {
                width: 100%;
                height: 100%;
                transform: rotate(4deg);
            }

            .circle-filling {
                @include abs-center;
                width: 100%;
                height: 100%;
            }

            .circle-filling-shadow {
                filter: blur(10px);
            }

            .circle-filling-grey {
                transform: rotate(-6deg) translate(-44.65%, -54%);
            }

            .circle-filling-gradient {
                top: 49%;
                width: 145%;
                height: 110%;
                transform: scale(1.02) translate(-49%, -49%);
            }
        }

        .info {
            @include abs-center;
            @include flex-center;
            flex-direction: column;
            width: 20rem;
            height: 20rem;
            font-weight: 700;
            text-align: center;

            strong {
                display: block;
            }

            .small {
                font-size: .85rem;
                margin-top: .35rem;
            }

            .normal {
                font-size: 1.25rem;
            }

            .big {
                font-size: 2rem;
                margin-bottom: .25rem;
            }

            .line {
                height: 2px;
                background-color: white;
                width: 12rem;
                margin: .5rem auto;
            }

            .bet-container {
                color: $color-pink-light-6;
            }

            .flex-container {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .avatar {
                width: 2rem;
                height: 2rem;
                border-radius: 100%;
                margin-right: .5rem;
            }
        }
    }
}

@keyframes rotateClockwise {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}

@keyframes fillingAnimation {
    0% {
        clip-path: polygon(50% 0%, 100% 0, 100% 100%, 100% 100%, 100% 100%, 50% 100%, 0 100%, 0 100%, 0 100%, 0 0);
    }
    100% {
        clip-path: polygon(50% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 50% 100%, 0 100%, 0 100%, 0 100%, 0 100%);
    }
}

@keyframes rotateCounterClockwise {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(-360deg);
    }
}
</style>