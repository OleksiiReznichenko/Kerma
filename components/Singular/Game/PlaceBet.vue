<script setup lang="ts">
let inputValue = ref<number>(0.00004);

</script>

<template>
    <div class="place-bet">
        <div class="inner-container">
            <h4 class="title">Place a bet</h4>
            <input v-model="inputValue" class="input" type="number" step="0.0001" placeholder="0.0004">
            <div class="x-buttons">
                <button class="x-button">MIN</button>
                <button class="x-button">X1.5</button>
                <button class="x-button">X2</button>
                <button class="x-button">All in</button>
            </div>
        </div>
        <button class="bet-button">
            <div class="circles-container">
                <div class="circle-container circle-container-1">
                    <img src="@/assets/svg/betButtonCircle2.svg" alt="Circle 1" class="circle">
                </div>
                <div class="circle-container circle-container-2">
                    <img src="@/assets/svg/betButtonCircle1.svg" alt="Circle 2" class="circle">
                </div>
                <div class="circle-container circle-container-3">
                    <img src="@/assets/svg/betButtonCircle3.svg" alt="Circle 3" class="circle">
                </div>
                <div class="circle-container circle-container-4">
                    <img src="@/assets/svg/betButtonCircle4.svg" alt="Circle 4" class="circle">
                </div>
            </div>
            <div class="main-circle">
                <span>Bet</span>
            </div>
        </button>
    </div>
</template>

<style lang="scss" scoped>
.place-bet {
    background-color: $color-blue-light;
    border-radius: 4rem;
    padding: 2.25rem 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: .75rem .75rem 1.75rem rgba(#7E7CA0, 0.2);
        
    @media only screen and (max-width: 1200px) {
        padding-left: 2rem;
    }
    
    @media only screen and (max-width: 850px) {
        flex-direction: column;
        justify-content: center;
        box-shadow: none;
        background-color: transparent;
        border-radius: none;
        padding: 0;
        margin-bottom: 5.75rem;
    }

    .inner-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-right: 3.5rem;
    
        @media only screen and (max-width: 850px) {
            box-shadow: 1.35rem 1.35rem 1.75rem rgba(black, 0.1);
            background-color: $color-blue-light;
            border-radius: 2.5rem;
            padding: 3rem 3rem;
            margin-right: 0;
            margin-bottom: 5.75rem;
        }

        .title {
            font-weight: 600;
            color: $color-grey-2;
            text-transform: uppercase;
            font-size: 2.2rem;
            text-align: center;
            margin-bottom: 1.25rem;
    
            @media only screen and (max-width: 850px) {
                font-size: 2.4rem;
            }
        }

        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none; 
        }

        .input {
            font-weight: 600;
            color: $color-pink-dark-2;
            background-color: $color-pink-light-5;
            padding: .75rem 3.5rem;
            border-radius: 2.5rem;
            box-shadow: .75rem .75rem 1.35rem rgba(76, 26, 92, 0.08);
            margin-bottom: 1.5rem;
            width: 90%;
    
            @media only screen and (max-width: 850px) {
                padding: 1rem 5rem;
                border-radius: 1.5rem;
                margin-bottom: 1.8rem;
                font-size: 2rem;
            }
        }

        .x-buttons {
            display: flex;
            align-items: center;

            .x-button {
                font-weight: 600;
                color: $color-pink-dark-2;
                font-size: 1.4rem;
                background-color: $color-primary;
                border-radius: .8rem;
                box-shadow: .75rem .75rem 1.35rem rgba(76, 26, 92, 0.08);
                padding: 1.1rem;
                white-space: nowrap;
    
                @media only screen and (max-width: 850px) {
                    font-size: 1.6rem;
                    padding: 1.35rem;
                }

                &:not(:last-of-type) {
                    margin-right: .65rem;
                }

                &:hover {
                    background-color: lighten($color-primary, 4%);
                }
            }
        }
    }

    .bet-button {
        position: relative;
        width: 8rem;
        height: 8rem;
        border-radius: 100%;
    
        @media only screen and (max-width: 850px) {
            transform: scale(1.3);
        }

        &:hover {
            transform: scale(1.1);
        }

        &:hover .circles-container {
            filter: saturate(2) brightness(95%) drop-shadow(.75rem .75rem 1.35rem rgba(0, 0, 0, 0.3));
        }

        .circles-container {
            @include abs-center;
            width: 100%;
            height: 100%;
            filter: drop-shadow(.75rem .75rem 1.35rem rgba(0, 0, 0, 0.2));
            transition: all .3s;

            .circle-container {
                @include abs-center;

                .circle {
                    width: 100%;
                    height: 100%;
                    filter: saturate(1.5);
                }
            }

            .circle-container-1 {
                width: 7.75rem;
                z-index: 210;
    
                @media only screen and (max-width: 850px) {
                    width: 9.15rem;
                }
            }

            .circle-container-2 {
                top: 48%;
                width: 7.05rem;
                height: 9.5rem;
                z-index: 170;
    
                @media only screen and (max-width: 850px) {
                    width: 8.75rem;
                    height: 11.5rem;
                }
            }

            .circle-container-3 {
                width: 9rem;
                z-index: 130;
    
                @media only screen and (max-width: 850px) {
                    width: 10rem;
                }
            }

            .circle-container-4 {
                width: 9.5rem;
                z-index: 90;
    
                @media only screen and (max-width: 850px) {
                    width: 10.5rem;
                }
            }
        }

        .main-circle {
            @include abs-center;
            @include flex-center;
            z-index: 400;
            width: 6.05rem;
            height: 6.05rem;
            border-radius: 100%;
            background-color: $color-pink-light-5;
            font-weight: 600;
            color: $color-pink-dark-2;
            text-transform: uppercase;
    
            @media only screen and (max-width: 850px) {
                width: 8rem;
                height: 8rem;
            }
        }
    }
}
</style>