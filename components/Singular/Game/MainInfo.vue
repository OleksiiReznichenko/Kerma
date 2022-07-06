<script setup lang="ts">
import { Ref } from 'vue';
import Bet from '@/composables/interfaces/bet';
import User from '@/composables/interfaces/user';

// CURRENT GAME PRIZE FUND
const prizeFund = inject<number>('prizeFund');

// CURRENT GAME BETS
const bets = inject<Ref<Bet[]>>('bets');

// CURRENT GAME BETS
const betsUsers = inject<Ref<User[]>>('betsUsers');

// MY USER'S ID
const myUserId = inject<Ref<string>>('myUserId');
</script>

<template>
    <div class="main-info">
        <div class="header">
            <div class="line desktop"></div>
            <img src="@/assets/svg/ratesNow.svg" alt="Rates icon" class="rates-icon desktop">
            <h4 class="title">Rates Now</h4>
            <div class="line mobile"></div>
            <div class="balance-gradient-container game-balance">
                <span>{{prizeFund.toFixed(4)}} ETH</span>
            </div>
            <div class="small-navigation">
                <NuxtLink :to="'/users/' + myUserId" class="navigation-item">
                    <img src="@/assets/svg/user.svg" alt="User icon" class="icon">
                </NuxtLink>
                <button class="navigation-item no-margin">
                    <span>?</span>
                </button>
            </div>
        </div>
        <div class="bets">
            <ReusableGameBet 
                v-for="(bet, index) in bets"
                :key="bet.id"
                :index="index"
                :id="bet.id"
                :bet-amount="bet.betAmountEth"
                :bet-time="bet.betTime"
                :nickname="betsUsers[index].nickname"
                :avatar="betsUsers[index].avatar"
                :rank="betsUsers[index].rank"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main-info {
    background-color: $color-blue-light;
    border-radius: 4rem;
    box-shadow: .75rem .75rem 1.75rem rgba(#7E7CA0, 0.2);
    padding: 4.75rem 2rem 5rem 3.25rem;
    height: 45rem;
    position: relative;
        
    @media only screen and (max-width: 850px) {
        width: 90%;
        margin: 0 auto;
        height: auto;
        padding: 2.75rem 4.5rem;
    }

    .bets {
        overflow-y: scroll;
        max-height: 90%;
        padding-right: 2rem;
        
        @media only screen and (max-width: 850px) {
            max-height: auto;
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