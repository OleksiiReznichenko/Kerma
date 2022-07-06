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
  box-shadow: .75rem .75rem 2rem rgba(0, 0, 0, 0.03);
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

.balance-gradient-container {
  display: inline-block;
  font-weight: 600;
  font-size: 1.8rem;
  background-color: $color-pink-light-5;
  border-radius: 1.8rem;
  padding: .65rem 3.5rem;
  color: $color-pink-dark-3;
  box-shadow: .85rem 1rem 1.5rem rgba(76, 26, 92, 0.08);
            
  span {
      background-image: radial-gradient(64.31% 64.31% at 88.04% 10.98%, #97C1FF 0%, #F9AEFF 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      white-space: nowrap;
  }
}
</style>