<template>
    <div class="logo">
        <NuxtLink to="/" class="home-link">Kerma</NuxtLink>
    </div>
</template>

<style lang="scss" scoped>
.logo {
    position: fixed;
    top: 2.75rem;
    left: 10%;
    z-index: 1000;

    @media only screen and (max-width: 1000px) {
        left: 5%;
    }

    @media only screen and (max-width: 850px) {
        position: static;
        left: auto;
        text-align: center;
    }

    .home-link {
        font-family: Panton;
        font-weight: 900;
        text-transform: uppercase;
        font-size: 2.25rem;

        &:hover {
            color: $color-pink-dark-3;
        }

        @media only screen and (max-width: 850px) {
            font-size: 3.75rem;
            margin-bottom: 2rem;
        }
    }
}
</style>