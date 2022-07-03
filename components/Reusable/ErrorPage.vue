<script setup lang="ts">
interface Props {
    title: string;
    paragraph: string;
}

const props = defineProps<Props>();
</script>

<template>
    <div class="layout">
        <div class="error-page">
            <div class="info-wrapper">
                <div class="info">
                    <h1 class="title">{{title}}</h1>
                    <p>{{paragraph}}</p>
                    <NuxtLink to="/game" class="btn btn-primary">Back to game</NuxtLink>
                </div>
            </div>
            <img src="@/assets/img/profileCharacter.png" alt="Character" class="character-image">
        </div>
    </div>
</template>

<style lang="scss" scoped>
.error-page {
    position: relative;
    min-height: 100vh;

    .info-wrapper {
        @include flex-center;
        height: 100vh;
        width: 65rem;
        border-radius: 0 5rem 5rem 0;
        border-right: 1px solid #eee;
        box-shadow: 1.75rem 2.25rem 5.5rem rgba(0, 0, 0, 0.1);
        background: radial-gradient(103.61% 103.61% at 17.68% -3.61%, rgba(0, 0, 0, 0.022) 0%, rgba(0, 0, 0, 0.05) 100%),
        radial-gradient(123.14% 123.14% at 13.09% -3.08%, rgba(236, 227, 255, 0.75) 0%, rgba(215, 197, 255, 0.75) 100%);

        @media only screen and (max-width: 850px) {
            border-radius: 0 0 5rem 5rem;
            height: auto;
            width: 100%;
            display: block !important;
            // padding: 6rem 6rem 7rem;
            padding: 11rem 6rem 7rem;
        }

        @media only screen and (max-width: 850px) and (max-height: 600px) {
            height: 100vh;
            display: flex !important;
        }

        .info {
            width: 60%;

            @media only screen and (max-width: 850px) {
                width: 80%;
            }

            @media only screen and (max-width: 600px) {
                width: 95%;
            }

            @media only screen and (max-width: 400px) {
                width: 100%;
            }
            
            .title {
                font-size: 8rem;

                @media only screen and (max-width: 500px) {
                    font-size: 6rem;
                }
            }

            p {
                font-size: 1.8rem;
                margin-top: 1rem;
                width: 35rem;

                @media only screen and (max-width: 850px) {
                    font-size: 2rem;
                }
            }

            .btn {
                margin-top: 3.25rem;
            }
        }
    }

    .character-image {
        position: absolute;
        bottom: 0;
        right: 3rem;
        width: 65rem;

        @media only screen and (max-width: 1100px) {
            right: -7rem;
            width: 75rem;
        }

        @media only screen and (max-width: 500px) {
            right: -10rem;
        }

        @media only screen and (max-width: 450px) {
            right: -20rem;
            width: 80rem;
        }

        @media only screen and (max-width: 850px) and (max-height: 600px) {
            display: none;
        }
    }
}
</style>