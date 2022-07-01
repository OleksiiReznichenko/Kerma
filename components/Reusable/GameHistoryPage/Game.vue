<script setup lang="ts">

</script>

<template>
    <div class="game">
        <div class="header">
            <div class="id-container container">
                <h6 class="subtitle">Game ID:</h6>
                <span class="id">#321</span>
            </div>
            <img src="/projects/Kerma/imgs/defaultAvatar.png" alt="Avatar" class="avatar">
        </div>
        <div class="info">
            <div class="container">
                <h6 class="subtitle">Winner:</h6>
                <strong class="info-line winner">Jozzy</strong>
            </div>
            <div class="container">
                <h6 class="subtitle">Winner's bet:</h6>
                <strong class="info-line winner-bet">#2415</strong>
            </div>
            <div class="container">
                <h6 class="subtitle">Amount win:</h6>
                <strong class="info-line amount-win">531 ETH</strong>
            </div>
        </div>
        <NuxtLink to="/" class="btn">More details</NuxtLink>
    </div>
</template>

<style lang="scss" scoped>
.game {
    background-image: radial-gradient(124.5% 142.12% at -43.52% -39.92%, #FDF7FF 0%, #e2d5ff 100%);
    border-radius: 30px;
    padding: .75rem 2.25rem 2.25rem;
    text-align: center;
    // width: 24rem;
    font-size: 1.2rem;

    @media only screen and (max-width: 850px) {
        padding: 1.5rem 2.75rem 2.75rem;
    }

    .container {
        @include flex-center;
        align-items: flex-end;
        color: $color-pink-dark-3;

        .subtitle {
            font-weight: 400;
            font-size: 1.2rem;
            margin-right: .5rem;

            @media only screen and (max-width: 850px) {
                font-size: 1.4rem;
            }
        }

        .info-line {
            font-size: 1.4rem;

            @media only screen and (max-width: 850px) {
                font-size: 1.6rem;
            }
        }
        
        .id {
            font-size: 1.2rem;

            @media only screen and (max-width: 850px) {
                font-size: 1.4rem;
            }
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
            margin-bottom: .5rem;
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