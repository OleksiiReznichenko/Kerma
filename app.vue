<script setup lang="ts">

const baseStore = useBaseStore();

// IF TOUCHPAD DEVICE'S HEIGHT CHANGES - CHANGE BASE 100VH HEIGHT
const appHeight = (): void => {
    const doc = document.documentElement;
    if (window.outerWidth < 1000) {
        doc.style.setProperty('--app-height', `${window.innerHeight * 1.05}px`);
    } else {
        doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    }
};

// ON WINDOW RESIZE
const checkTypeOfDevice = (): void => {
  if (window.outerWidth <= 850) {
    baseStore.isMobileToTrue();
  } else {
    baseStore.isMobileToFalse();
  }
};

// ON WINDOW RESIZE
const checkChatType = (): void => {
  if (window.outerWidth <= 500) {
      baseStore.isFullscreenChatToTrue();
  } else {
      baseStore.isFullscreenChatToFalse();
  }
};

// ON WINDOW RESIZE
const onResize = (): void => {
  appHeight();
  checkTypeOfDevice();
  checkChatType();
};

onMounted(() => {
  checkTypeOfDevice();
  checkChatType();

  // ADD WINDOW EVENT LISTENER
  window.addEventListener('resize', onResize);
})

onUnmounted(() => {
  // REMOVE WINDOW EVENT LISTENER
  window.removeEventListener('resize', onResize);
})
</script>

<template>
  <div class="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <div class="iziToast-wrapper iziToast-wrapper-bottomRight">
      <div class="iziToast-capsule" style="height: 0px; transition-delay: 0.2s;">
        <div data-izitoast-ref="1657528331481" class="iziToast error iziToast-theme-dark iziToast-color-red iziToast-animateInside iziToast-opened iziToast-closing fadeOut" id="WW91ciUyMGJldCUyMG11c3QlMjBiZSUyMGJpZ2dlciUyMHRoYW4lMjBjdXJyZW50JTIwaGlnaGVzdCUyMGJldHJlZA" style="pointer-events: none;">
          <div class="iziToast-body" style="padding-left: 33px;">
            <i class="iziToast-icon ico-error revealIn"></i>
            <div class="iziToast-texts">
              <p class="iziToast-message slideIn">Your bet must be bigger than current highest bet</p>
            </div>
            <div></div>
          </div>
          <button type="button" class="iziToast-close"></button>
          <div class="iziToast-progressbar">
            <div style="transition: width 4834ms linear 0s; width: 0%;"></div>
          </div>
        </div>
      </div>
    </div>

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

.iziToast-wrapper {
  border-radius: 4rem;
  overflow: hidden;
  align-items: center !important;
  justify-content: center !important;
  text-align: center !important;
}

.iziToast-capsule {
  border-radius: 4rem;
  overflow: hidden;
}

.iziToast-icon {
  display: inline-block !important;
  margin: 0 !important;
  margin-right: 13rem !important;
  top: 50% !important;
  left: -3rem !important;
  transform: translateY(-50%) !important;

  @media only screen and (max-width: 1000px) {
    top: 52% !important;
  }
}

.iziToast-close {
  padding: 3rem 3rem 2rem !important;
  top: 0;
  right: 0;
  background-image: url(@/assets/svg/crossWithCircle.svg) !important;
  background-size: 20px !important;
  opacity: 1 !important;
}

.iziToast-texts {
  margin: 0 !important;
  margin-right: 6rem !important;
  padding: 2rem 1.5rem 2rem 2.5rem !important;
  border-top-left-radius: 100rem !important;
  border-bottom-left-radius: 100rem !important;

  @media only screen and (max-width: 1200px) {
    padding: 2.25rem 1.5rem 2.25rem 2.5rem !important;
  }

  @media only screen and (max-width: 1100px) {
    padding: 2.35rem 1.75rem 2.35rem 2.5rem !important;
  }

  @media only screen and (max-width: 900px) {
    padding: 2.5rem 1.5rem 2rem 2.5rem !important;
  }

  @media only screen and (max-width: 850px) {
    padding: 2.35rem 1.25rem 2rem 2.5rem !important;
  }

  .iziToast-message {
    margin: 0 !important;
  }
}

.iziToast {
    box-sizing: border-box;
    backdrop-filter: blur(8px);
    overflow: hidden;
    border-radius: 4rem;
    box-shadow: none !important;
    margin: .5rem 0 !important;
    max-width: 95% !important;
    width: auto !important;
    padding: 0 !important;
    padding-left: 3rem !important;

    &.success {
        background: rgba(#2EB358, 0.5) !important;

        .iziToast-texts {
          background: rgba(#2EB358, 0.5) !important;
        }

        .iziToast-close {
          background-color: rgba(#2EB358, 0.5) !important;
        }
    }

    &.warning {
        background: rgba(#eb854b, 0.5) !important;

        .iziToast-texts {
          background: #eb854b !important;
        }

        .iziToast-close {
          background-color: #eb854b !important;
        }
    }

    &.error {
        background: rgba(#c64e54, 0.5) !important;

        .iziToast-texts {
          background: #e7696d !important;
        }

        .iziToast-close {
          background-color: #e7696d !important;
        }
    }

    & > .iziToast-body .iziToast-message {
        font-family: Montserrat !important;
        font-weight: 600;
        text-transform: uppercase;
        font-size: 1.6rem;
        color: #FFFFFF !important;
    
        @media only screen and (max-width: 850px) {
          font-size: 2rem;
        }
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
      background-image: radial-gradient(64.31% 64.31% at 88.04% 10.98%, #97C1FF 0%, #F9AEFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      white-space: nowrap;
  }
}
</style>