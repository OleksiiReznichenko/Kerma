<script setup lang="ts">
import { Ref } from 'vue';
import Bet from '@/composables/interfaces/bet';
import User from '@/composables/interfaces/user';

const baseStore = useBaseStore();

// OPEN CONNECT WALLET WINDOW
const openConnectWindow = baseStore.connectWindowOpenIndicatorToTrue;

// OPEN STEPS WINDOW
const openStepsWindow = baseStore.isStepsOpenIndicatorToTrue;

// CURRENT GAME PRIZE FUND
const prizeFund = inject<number>('prizeFund');

// CURRENT GAME BETS
const bets = inject<Ref<Bet[] | undefined[]>>('bets');

// CURRENT GAME BETS
const betsUsers = inject<Ref<User[] | undefined[]>>('betsUsers');

// MY USER'S ID
const myUserId = inject<Ref<string>>('myUserId');
</script>

<template>
    <div class="main-info">
        <SingularGameConnectSteps class="desktop" />
        <ReusableGameChatButton class="desktop" />
        <!-- <div class="inner-container"> -->
            <div class="header">
                <div class="line desktop"></div>
                <img src="@/assets/svg/ratesNow.svg" alt="Rates icon" class="rates-icon desktop">
                <h4 class="title">Rates Now</h4>
                <div class="line mobile"></div>
                <div class="balance-gradient-container game-balance">
                    <span>{{prizeFund.toFixed(5)}} ETH</span>
                </div>
                <div class="small-navigation">
                    <NuxtLink v-if="myUserId" :to="'/users/' + myUserId" class="navigation-item">
                        <img src="@/assets/svg/user.svg" alt="User icon" class="icon">
                    </NuxtLink>
                    <button v-else @click="openConnectWindow" class="navigation-item">
                        <img src="@/assets/svg/user.svg" alt="User icon" class="icon">
                    </button>
                    <button @click="openStepsWindow" class="navigation-item no-margin">
                        <span>?</span>
                    </button>
                </div>
            </div>
            <div v-if="bets.length > 0" ref="betsContainer" class="bets">
                <ReusableGameBet 
                    v-for="(bet, index) in bets"
                    :key="bet.id"
                    :index="index"
                    :id="bet.id"
                    :bet-amount="bet.betAmountEth"
                    :start-time="bet.startTime"
                    :end-time="bet.endTime"
                    :nickname="betsUsers[index].nickname"
                    :avatar="betsUsers[index].avatar"
                    :rank="betsUsers[index].rank"
                    :achievements="betsUsers[index].achievements"
                />
            </div>
        <!-- </div> -->
    </div>
</template>

<style lang="scss" scoped>
.main-info {
    background-color: $color-blue-light;
    border-radius: 4rem;
    box-shadow: .75rem .75rem 1.75rem rgba(#7E7CA0, 0.2);
    padding: 4.75rem 2rem 5rem 3.25rem;
    // padding: 0 2rem 0 3.25rem;
    height: 45rem;
    position: relative;

    @media only screen and (max-width: 850px) {
        width: 90%;
        margin: 0 auto;
        height: auto;
        padding: 2.75rem 5rem;
    }

    .inner-container {
        height: 100%;
    }

    // .inner-container {
    //     overflow-y: scroll;
    //     height: 100%;
    //     position: relative;
        // padding: 4.75rem 0 5rem;

        // &::-webkit-scrollbar {
        //     height: 6px;
        //     width: 6px;
        // }

        // &::-webkit-scrollbar-thumb {
        //     border-radius: 17px;
        //     background-color: white;
        // }

        // &::-webkit-scrollbar-track {
        //     background-image: linear-gradient(to right, transparent 0%, transparent 30%, rgba(white, .7) 30%, rgba(white, .7) 70%, transparent 70%, transparent 100%);
        //     width: 2px;
        //     margin: 4rem 0;
        // }
        
    //     @media only screen and (max-width: 850px) {
    //         height: auto;
    //         overflow: visible;
    //     }
    // }

    .bets {
        position: relative;
        z-index: 1000;
        overflow-y: scroll;
        height: 90%;
        padding-right: 2rem;
        padding-bottom: 3rem;
        
        @media only screen and (max-width: 850px) {
            height: auto;
            overflow: visible;
            padding-right: 0;
        }

        &::-webkit-scrollbar {
            height: 6px;
            width: 6px;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 17px;
            background-color: white;
        }

        &::-webkit-scrollbar-track {
            background-image: linear-gradient(to right, transparent 0%, transparent 30%, rgba(white, .7) 30%, rgba(white, .7) 70%, transparent 70%, transparent 100%);
            width: 2px;
            margin-bottom: 2rem;
            // margin: 4rem 0;
        }
    }

    .header {
        display: flex;
        align-items: center;
        margin-bottom: 2rem;
        
        @media only screen and (max-width: 850px) {
            flex-direction: column;
            margin-bottom: 8rem;
        }

        .line {
            background-color: $color-pink-light-12;
            height: 2px;
            // width: 13.5rem;
            width: 20%;
            margin-right: 1.5rem;
        
            @media only screen and (max-width: 850px) {
                width: 16rem;
                margin-right: 0;
                margin-bottom: 2rem;
            }
        }

        .rates-icon {
            width: 2rem;
            margin-right: .75rem;
        }

        .title {
            font-weight: 600;
            color: $color-grey-2;
            text-transform: uppercase;
            font-size: 2.1rem;
            margin-right: 1.75rem;
            white-space: nowrap;
        
            @media only screen and (max-width: 850px) {
                margin-right: 0;
                margin-bottom: 1.5rem;
                font-size: 2.6rem;
            }
        }

        .game-balance {
            margin-right: 1.75rem;
        
            @media only screen and (max-width: 850px) {
                margin-right: 0;
                margin-bottom: 2rem;
                font-size: 2rem;
            }
        }

        .small-navigation {
            display: flex;
            align-items: center;

            .navigation-item {
                @include flex-center;
                width: 3.5rem;
                height: 3.5rem;
                border-radius: 100%;
                box-shadow: .75rem .75rem 1.35rem rgba(0, 0, 0, 0.08);
                margin-right: 1.5rem;
                background-color: lighten($color-pink-light-13, 2%);
        
                @media only screen and (max-width: 850px) {
                    width: 4.5rem;
                    height: 4.5rem;
                    margin-right: 2.25rem;
                }

                &:hover {
                    background-color: darken($color-pink-light-13, 6%);
                }

                .icon {
                    width: 2rem;
                    height: 2rem;
        
                    @media only screen and (max-width: 850px) {
                        width: 2.5rem;
                        height: 2.5rem;
                    }
                }

                span {
                    font-size: 2rem;
        
                    @media only screen and (max-width: 850px) {
                        font-size: 2.4rem;
                    }
                }
            }

            .no-margin {
                margin-right: 0;
            }
        }
    }
}
</style>