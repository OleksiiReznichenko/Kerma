<script setup lang="ts">
let percent = ref<number>(0);
let hideIndicator = ref<boolean>(false);
let html = ref<HTMLElement | null>(null);
const preloaderWrapper = ref<HTMLElement | null>(null);

// ADD PRELOADER PERCENT
const addToPercent = (): void => {
    if (html.value === null || preloaderWrapper.value === null) return;

    // IF PERCENT IS 100% - VANISH PRELOADER AND REMOVE OVERFLOW Y FROM HTML
    if (percent.value >= 100) {
        html.value.style.overflowY = 'visible';
        hideIndicator.value = true;

        return;
    }
    percent.value += 1;

    requestAnimationFrame(addToPercent);
};

onMounted(() => {
    html.value = document.querySelector('html')!;
    addToPercent();
})
</script>

<template>
    <div class="preloader-root">
        <Transition name="fade">
            <div v-if="!hideIndicator" ref="preloaderWrapper" class="preloader-wrapper">
                <div class="preloader">
                    <img src="@/assets/img/preloaderImage.png" alt="Preloader image" class="preloader-image">
                    <h2 class="preloader-percent">{{percent}}%</h2>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.preloader-wrapper {
    background: $gradient-background;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000000;
    width: 100%;
    height: 100vh;
    text-align: center;
    @include flex-center;
    transition: all .5s;

    .preloader {
        .preloader-image {
            animation: loweringRaising 1s linear 10 alternate;
            margin-right: -5rem;
        }

        .preloader-percent {
            font-family: Panton;
            font-weight: 900;
            font-size: 3.5rem;
        }

        @keyframes loweringRaising {
            from {
                transform: translateY(0) scale(1);
            }
            to {
                transform: translateY(10px) scale(1.03);
            }
        }
    }
}
</style>