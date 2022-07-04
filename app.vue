<script setup lang="ts">
// IF TOUCHPAD DEVICE'S HEIGHT CHANGES - CHANGE BASE 100VH HEIGHT
const appHeight = (): void => {
    const doc = document.documentElement;
    if (window.outerWidth < 1000) {
        doc.style.setProperty('--app-height', `${window.innerHeight * 1.05}px`);
    } else {
        doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    }
};

onMounted(() => {
  // ADD WINDOW EVENT LISTENER
  window.addEventListener('resize', appHeight);
})

onUnmounted(() => {
  // REMOVE WINDOW EVENT LISTENER
  window.removeEventListener('resize', appHeight);
})
</script>

<template>
  <div class="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
.page {
  min-height: 100vh;
  @include width-restriction;
  margin-top: 10rem;
  padding-bottom: 12rem;
  
  @media only screen and (max-width: 850px) {
    margin-top: 14rem;
  }
}

.relative-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
}

.desktop {
  @media only screen and (max-width: 850px) {
    display: none !important;
  }
}

.mobile {
  @media only screen and (min-width: 850px) {
    display: none !important;
  }
}

h1 {
  font-family: Panton;
  font-weight: 900;
}

.btn-primary {
  background-color: $color-primary;
  box-shadow: 1rem 1.5rem 2.25rem rgba(0, 0, 0, 0.03);
  border-radius: 1.25rem;
  padding: 1rem 5.5rem;
  border: 1px solid #eee;

  &:hover {
    color: darken($color-primary, 10%);
    background-color: white;
  }
}

.btn-wide {
  padding: .85rem 6rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 1.5rem;
}
</style>