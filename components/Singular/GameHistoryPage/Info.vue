<script setup lang="ts">

</script>

<template>
    <div class="info">
        <h1 class="title">Game History</h1>
        <div class="games">
            <ReusableGame v-for="i in 12" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.info {
    position: relative;
    z-index: 100;
    text-align: center;
    width: 100%;

    .title {
        color: $color-pink-light-4;
        text-transform: uppercase;
        font-size: 3.5rem;
        margin-bottom: 4rem;

        @media only screen and (max-width: 850px) {
           color: white;
           font-size: 4.5rem;
        }
    }

    .games {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-auto-columns: 1fr;
        grid-row-gap: 6rem;
        grid-column-gap: 4rem;

        @media only screen and (max-width: 850px) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media only screen and (max-width: 500px) {
            grid-template-columns: 32rem;
            justify-content: center;
        }
    }
}
</style>