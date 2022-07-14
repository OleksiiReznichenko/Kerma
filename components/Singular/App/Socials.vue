<template>
    <div class="socials">
        <NuxtLink href="#" target="_blank" class="social-link">
            <div class="icon-container">
                <img src="@/assets/svg/discord.svg" alt="Discord" class="icon">
            </div>
            <span>join us</span>
        </NuxtLink>
        <NuxtLink to="/faq" class="faq-link">
            <div class="icon-container">
                <strong class="icon-title">?</strong>
            </div>
        </NuxtLink>
        <NuxtLink href="#" target="_blank" class="social-link">
            <div class="icon-container">
                <img src="@/assets/svg/telegram.svg" alt="Telegram" class="icon">
            </div>
            <span>follow us</span>
        </NuxtLink>
    </div>
</template>

<style lang="scss" scoped>
.socials {
    position: fixed;
    top: 40vh;
    left: -12rem;
    transform: rotate(-90deg);
    display: flex;
    align-items: center;
    z-index: 1000;

    @media only screen and (max-width: 1000px) {
        top: 2rem;
        left: auto;
        right: 5%;
        transform: rotate(0);
    }

    @media only screen and (max-width: 850px) {
        position: static;
        justify-content: center;
        margin-bottom: 3rem;
    }

    .social-link,
    .faq-link {
        font-weight: 600;
        display: flex;
        align-items: center;
        transition: none;
        position: relative;
        z-index: 3000;

        span {
            display: inline-block;
            display: flex;
            align-items: center;
            transition: all .3s;

            @media only screen and (max-width: 1000px) {
                display: none;
            }

            &:hover {
                color: $color-pink-dark-3;
            }
        }

        .icon-container {
            background: #c9c9f4;
            border-radius: 100%;
            width: 5rem;
            height: 5rem;
            @include flex-center;
            box-shadow: 1rem 1.5rem 2.25rem rgba(0, 0, 0, 0.05);
            transition: all .3s;
            position: relative;
            z-index: 3000;

            &:hover {
                background: lighten(#c9c9f4, 1%);
                transform: scale(1.05);
            }

            @media only screen and (max-width: 1000px) {
                box-shadow: 1rem 1.5rem 2.25rem rgba(0, 0, 0, 0.1);
            }

            @media only screen and (max-width: 850px) {
                border: 1px solid #eee;
            }

            .icon {
                @include abs-center;
                width: 50%;
                transform: translate(-50%, -50%) rotate(90deg);
                z-index: 4000;

                @media only screen and (max-width: 1000px) {
                    transform: translate(-50%, -50%) rotate(0);
                }
            }
        }
    }

    .faq-link {
        transform: rotate(90deg);
        margin-right: 1.5rem;

        @media only screen and (max-width: 1000px) {
            transform: rotate(0);
        }

        .icon-title {
            font-weight: 900;
            font-size: 2.75rem;
        }
    }

    .social-link:first-of-type {
        transform: rotate(180deg);
        margin-right: 1.5rem;

        @media only screen and (max-width: 1000px) {
            transform: rotate(0);
        }

        .icon {
            transform: translate(-50%, -50%) rotate(-90deg);

            @media only screen and (max-width: 1000px) {
                transform: translate(-50%, -50%) rotate(0);
            }
        }

        span {
            transform: rotate(180deg);

            &:after {
                content: '';
                display: block;
                width: 2.25rem;
                height: 2px;
                background-color: white;
                border-radius: 10px;
                margin: 0 1.25rem;
            }
        }
    }

    .social-link:last-of-type {

        .icon {
            transform: translate(-50%, -50%) rotate(90deg);

            @media only screen and (max-width: 1000px) {
                transform: translate(-50%, -50%) rotate(0);
            }
        }

        span {

            &:before {
                content: '';
                display: block;
                width: 2.25rem;
                height: 2px;
                background-color: white;
                border-radius: 10px;
                margin: 0 1.25rem;
            }
        }
    }
}
</style>