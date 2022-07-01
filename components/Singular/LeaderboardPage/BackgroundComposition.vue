<script setup lang="ts">

</script>

<template>
    <div class="background-composition">
        <img src="@/assets/img/gameHistoryLeavesBig.png" alt="Background leaves" class="leaves-big">
        <img src="@/assets/img/gameHistoryLeavesSmall.png" alt="Background leaves" class="leaves-small">
    </div>
</template>

<style lang="scss" scoped>
.background-composition {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;

    background-image: url(@/assets/img/backgroundParticles.png), $gradient-background;
    background-size: cover;
    background-repeat: no-repeat;
    background-blend-mode: screen;

    .leaves-big {
        position: absolute;
        top: 0;
        left: 0;
        width: 50rem;
        mix-blend-mode: color-dodge;
        filter: blur(2px);

        @media only screen and (max-width: 850px),
        only screen and (max-width: 1000px) and (max-height: 600px) {
            display: none;
        }
    }

    .leaves-small {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 50rem;
        mix-blend-mode: color-dodge;
        filter: blur(2px);
    }
}
</style>