<script setup lang="ts">
// MY USER'S BALANCE
const myUserBalance = inject<number>('myUserBalance');

// OPEN WINDOW
const baseStore = useBaseStore();
const openWindow = baseStore.connectWindowOpenIndicatorToTrue;
</script>

<template>
    <div class="donate">
        <div class="corner-light"></div>
        <div class="info">
            <div class="balance-container">
                <h4 class="title">Balance</h4>
                <strong class="balance">{{myUserBalance.toFixed(5)}} <span>ETH</span></strong>
            </div>
            <button @click="openWindow" class="button">Donate</button>
        </div>
        <img src="@/assets/img/balanceCharacter.png" alt="Character" class="character">
    </div>
</template>

<style lang="scss" scoped>
.donate {
    @include flex-center;
    background-color: $color-pink-light-9;
    border-radius: 4rem;
    box-shadow: .75rem .75rem 1.75rem rgba(#7E7CA0, 0.2);
    position: relative;
    overflow: hidden;
    
    @media only screen and (max-width: 850px) {
        width: 27rem;
        margin: 0 auto;
        box-shadow: 1.35rem 1.35rem 1.75rem rgba(black, 0.1);
    }
    
    .info {
        text-transform: uppercase;
        text-align: center;
        position: relative;
        z-index: 100;
    
        @media only screen and (max-width: 850px) {
            padding: 4.25rem 3.75rem;
        }

        .balance-container {
            margin-bottom: 1.5rem;

            .title {
                font-weight: 600;
                color: $color-grey-3;
                font-size: 1.7rem;
                margin-bottom: .3rem;
    
                @media only screen and (max-width: 850px) {
                    font-size: 2.1rem;
                }
            }

            .balance {
                font-weight: 600;
                font-size: 2.1rem;
                color: $color-pink-dark-3;
    
                @media only screen and (max-width: 850px) {
                    font-size: 2.5rem;
                }

                span {
                    font-size: 1.4rem;
    
                    @media only screen and (max-width: 850px) {
                        font-size: 1.8rem;
                    }
                }
            }
        }

        .button {
            font-weight: 600;
            text-transform: uppercase;
            font-size: 2rem;
            padding: .75rem 3.5rem;
            border-radius: 4rem;
            background-color: $color-pink-light-7;
            // background-image: linear-gradient(to right, #DBC6EF, #DCC2E1);
            // background-image: linear-gradient(135deg, #DBC6EF, #DCC2E1);
            background-color: #DCC2E1;
            box-shadow: .75rem .75rem 1.35rem rgba(0, 0, 0, 0.2);
    
            @media only screen and (max-width: 850px) {
                padding: .9rem 4.5rem;
            }

            &:hover {
                background-color: white;
                color: $color-pink-dark-2;
                transform: scale(1.01);
            }
        }
    }

    .character {
        position: absolute;
        bottom: -2rem;
        left: 50%;
        transform: translateX(-50%);
    }

    .corner-light {
        position: absolute;
        top: -1.5rem;
        right: -2rem;
        background-color: $color-pink-light-11;
        width: 11rem;
        height: 8rem;
        border-radius: 100%;
        filter: blur(25px);
    }
}
</style>