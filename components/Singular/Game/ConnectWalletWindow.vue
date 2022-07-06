<script setup lang="ts">
import { storeToRefs } from 'pinia';

// OPEN WINDOW INDICATOR
const baseStore = useBaseStore();
const { connectWindowOpenIndicator } = storeToRefs(baseStore);

// CLOSE WINDOW
const closeWindow = baseStore.connectWindowOpenIndicatorToFalse;

// CLOSE WINDOW
const openStepsWindow = baseStore.isStepsOpenIndicatorToTrue;

// CLOSE WINDOW ON WRAPPER CLICK
const closeWindowOnWrapper = (event: Event): void => {
    const target = event.target as HTMLElement;
    if (!target.classList.contains('wrapper')) return;
    closeWindow();
};

// CLOSE WINDOW AND  OPEN STEPS WINDOW
const toggleWindows = () => {
    closeWindow();
    openStepsWindow()
}

</script>

<template>
    <div @click="closeWindowOnWrapper" :class="{'opened': connectWindowOpenIndicator}" class="wrapper connect-wallet-window-wrapper">
        <div class="connect-wallet-window">
            <button @click="closeWindow" class="close-button">
                <img src="@/assets/svg/cross.svg" alt="Close icon" class="close-icon">
            </button>
            <h1 class="title">Connect Wallet</h1>
            <div class="methods">
                <button class="method method-1">
                    <div class="container-center">
                        <img src="@/assets/img/metamaskFox.png" alt="Metamask fox" class="fox">
                        <strong class="method-name">Metamask</strong>
                    </div>
                </button>
                <div class="method method-closed method-2">
                    <img src="@/assets/img/socialsComp1.png" alt="Socials 1" class="composition composition-1">
                    <h4 class="subtitle">Coming soon</h4>
                    <img src="@/assets/img/socialsComp2.png" alt="Socials 2" class="composition composition-2">
                </div>
                <div class="method method-closed method-3">
                    <img src="@/assets/img/socialsComp3.png" alt="Socials 3" class="composition composition-3">
                    <h4 class="subtitle">Coming soon</h4>
                    <img src="@/assets/img/socialsComp4.png" alt="Socials 4" class="composition composition-4">
                </div>
            </div>
            <div class="button-container">
                <span class="question">Haven't got a crypto wallet yet?</span>
                <button @click="toggleWindows" class="btn-wide learn-button">Learn how to connect</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.opened {
    opacity: 1 !important;
    visibility: visible !important;
}

.connect-wallet-window-wrapper {
    @include flex-center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    text-align: center;
    backdrop-filter: blur(4px);
    opacity: 0;
    visibility: hidden;
    transition: all .3s;
    
    .connect-wallet-window {
        width: 55rem;
        // height: 55rem;
        border-radius: 4rem;
        // background-image: linear-gradient(45deg, #D1CEF3, rgba(#CEBAED, .75));
        background: radial-gradient(103.61% 103.61% at 17.68% -3.61%, rgba(0, 0, 0, 0.022) 0%, rgba(0, 0, 0, 0.05) 100%), radial-gradient(123.14% 123.14% at 13.09% -3.08%, rgba(230, 219, 255, 0.95) 0%, rgba(215, 197, 255, 0.9) 100%);
        box-shadow: 1.5rem 2rem 4.5rem rgba(0, 0, 0, 0.1);
        padding: 7.25rem 6.75rem 5.5rem;
        position: relative;
        border: 2px solid #eee;
        border-right: none;
        border-bottom: none;

        @media only screen and (max-width: 1000px) and (max-height: 600px) and (min-width: 600px) {
            padding: 5.25rem 6.75rem 4.5rem;
        }

        @media only screen and (max-width: 500px) {
            width: 90%;
            padding: 7.25rem 4.75rem 5.5rem;
        }

        .close-button {
            @include flex-center;
            position: absolute;
            top: 3rem;
            right: 3rem;
            width: 3.25rem;
            height: 3.25rem;

            .close-icon {
                width: 2.25rem;
                height: 2.25rem;
            }
        }

        .title {
            font-size: 3.5rem;
            text-transform: uppercase;
            margin-bottom: 5rem;
        }

        .methods {

            .method {
                display: block;
                border-radius: 1.25rem;
                width: 100%;
                height: 10rem;
                text-align: center;
                margin-bottom: 1.25rem;
                border: 2px solid #eee;
                border-right: none;
                border-bottom: none;

                @media only screen and (max-width: 850px) and (min-height: 600px),
                only screen and (max-width: 600px) {
                    margin-bottom: 1.5rem;
                }
            }

            .method-closed {
                @include flex-center;
                filter: drop-shadow(10px 11px 18px rgba(0, 0, 0, 0.08));

                .subtitle {
                    font-weight: 600;
                    color: $color-grey-2;
                    font-size: 2.1rem;
                    text-transform: uppercase;
                }

                .composition {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }

            .method-1 {
                backface-visibility: hidden;
                background: rgba(236, 227, 255, 0.3);
                box-shadow: .75rem .75rem 1.35rem rgba(0, 0, 0, 0.08);
                transition: all .3s;

                &:hover {
                    transform: scale(1.02);
                }

                .container-center {
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    margin-top: -4.75rem;

                    .fox {
                        backface-visibility: hidden;
                        width: 20rem;
                        margin-bottom: .5rem;
                    }

                    .method-name {
                        font-weight: 600;
                    }
                }
            }

            .method-2 {
                .composition-1 {
                    left: 0;
                    width: 12rem;
                }
                .composition-2 {
                    right: 0;
                    width: 12rem;
                }
            }

            .method-3 {
                opacity: .5;

                @media only screen and (max-width: 1000px) and (max-height: 600px) and (min-width: 600px) {
                    display: none;
                }

                .composition-3 {
                    left: 1.25rem;
                    width: 8rem;
                }
                .composition-4 {
                    right: 1.25rem;
                    width: 8rem;
                }
            }
        }

        .button-container {
            

            .question {
                display: inline-block;
                margin-bottom: .75rem;
                font-size: 1.8rem;
            }

            .learn-button {
                background-color: $color-grey;

                &:hover {
                    color: darken($color-grey, 10%);
                    background-color: white;
                }
            }
        }
    }
}
</style>