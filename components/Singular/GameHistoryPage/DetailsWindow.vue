<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Game from '~~/composables/interfaces/game';

// OPEN WINDOW INDICATOR
const baseStore = useBaseStore();
const { gameDetailsWindowOpenIndicator, activeGameDetailsWindowId } = storeToRefs(baseStore);

// CLOSE WINDOW
const closeWindow = baseStore.gameDetailsWindowOpenIndicatorToFalse;

// GAMES
const gamesStore = useGamesStore();
const { games } = storeToRefs(gamesStore);

// GAMES
let activeGame = ref<Game | null>(null);

// CLOSE WINDOW ON WRAPPER CLICK
const closeWindowOnWrapper = (event: Event): void => {
    const target = event.target as HTMLElement;
    if (!target.classList.contains('wrapper')) return;
    closeWindow();
};

watch(activeGameDetailsWindowId, () => {
    if (!activeGameDetailsWindowId.value || games.value.length < 1 ) return;
        activeGame.value = games.value.find(game => {
            return game.id === activeGameDetailsWindowId.value;
        })
});

</script>

<template>
    <div @click="closeWindowOnWrapper" :class="{'opened': gameDetailsWindowOpenIndicator}" class="wrapper details-window-wrapper">
        <div class="details-window">
            <div class="flex-container">
                <div class="info-item">
                    <div class="subtitle">Date</div>
                    <strong class="info-line">{{activeGame && activeGame.gameDate}}</strong>
                </div>
                <div class="info-item">
                    <div class="subtitle">Winning</div>
                    <strong class="info-line">{{activeGame && activeGame.winAmountEth.toFixed(5)}} ETH</strong>
                </div>
            </div>
            <div class="info-item">
                <div class="subtitle">Hash Seed</div>
                <strong class="info-line">5fa88f1c52f44</strong>
            </div>
            <div class="info-item">
                <div class="subtitle">Hash Salt</div>
                <strong class="info-line">09e16364e69509b7</strong>
            </div>
            <div class="info-item">
                <div class="subtitle">Hash</div>
                <strong class="info-line">21059efabbfcc83aadfb703235d7a5c2fd0f8ee80504e8f22b2de</strong>
            </div>
            <button @click="closeWindow" class="button-back">Back</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.opened {
    opacity: 1 !important;
    visibility: visible !important;
}

.details-window-wrapper {
    @include flex-center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 40000;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(4px);
    opacity: 0;
    visibility: hidden;
    transition: all .3s;

    .details-window {
        background: linear-gradient(0deg, rgba(244, 175, 255, 0.2), rgba(244, 175, 255, 0.2)), linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), #D1C1F2;
        box-shadow: .5rem 1rem 4.5rem rgba(0, 0, 0, 0.15);
        border-radius: 4rem;
        width: 55rem;
        color: $color-pink-dark-2;
        padding: 4rem 6rem 6rem;

        @media only screen and (max-width: 500px) {
            width: 90%;
        }
        
        .flex-container {
            display: flex;

            .info-item:not(:last-of-type) {
                margin-right: 4rem;
            }
        }

        .info-item {
            margin-bottom: 2.25rem;

            .subtitle {
                padding-bottom: .25rem;
                font-weight: 700;
                opacity: .3;
            }

            .info-line {
                font-family: Panton;
                font-weight: 700;
                font-size: 2rem;
                word-break: break-all;
            }
        }

        .button-back {
            background-color: darken($color-primary, 2%);
            box-shadow: .75rem .75rem 1.35rem rgba(76, 26, 92, 0.1);
            border-radius: 2rem;
            padding: .85rem 5.5rem;
            margin-top: .5rem;

            &:hover {
                background-color: white;
            }
        }
    }
}
</style>