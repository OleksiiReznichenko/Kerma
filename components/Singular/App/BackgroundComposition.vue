<template>
    <div class="background-composition">
        <img src="@/assets/img/cloud.png" alt="Top background image" class="top-image">
        <img src="@/assets/img/cloud.png" alt="Bottom background image" class="bottom-image">
    </div>
</template>

<style lang="scss" scoped>
.background-composition {
    width: 100vw;
    height: 100vh;
    min-height: var(--app-height);
    position: fixed;
    top: 0;
    left: 0;
    background-image: url(@/assets/img/backgroundClouds.png), $gradient-background;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: .35;

    .top-image {
        position: absolute;
        top: -22rem;
        left: -21rem;
        width: 53rem;
        mix-blend-mode: hard-light;
        filter: blur(5px);
        transform: rotate(25deg);
    }

    .bottom-image {
        position: absolute;
        bottom: -22rem;
        right: -22rem;
        width: 70rem;
        transform: rotate(25deg);
        mix-blend-mode: hard-light;
        filter: blur(5px) brightness(120%);
    }
}
</style>