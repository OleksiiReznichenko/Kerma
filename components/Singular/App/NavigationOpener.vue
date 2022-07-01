<script setup lang="ts">
import { storeToRefs } from 'pinia';

// NAV OPEN INDICATOR
const baseStore = useBaseStore();
const { navOpenIndicator } = storeToRefs(baseStore);

// TOGGLE OVERFLOWING NAVIGATION
const toggleNavigation = (): void => {
    if (!navOpenIndicator.value) {
        baseStore.navOpenIndicatorToTrue();
    } else {
        baseStore.navOpenIndicatorToFalse();
    }
};
</script>

<template>
    <button @click="toggleNavigation" class="navigation-opener">
        <img src="@/assets/svg/navigationOpener.svg" alt="Nav opener" class="navigation-opener-image">
    </button>
</template>

<style lang="scss" scoped>
.navigation-opener {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    clip-path: circle(50% at 50% -45%);

    &-image {
        width: 40rem;
    }
}
</style>