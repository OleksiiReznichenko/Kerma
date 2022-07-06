<script setup lang="ts">
import { storeToRefs } from 'pinia';

// IS STEPS WINDOW OPEN INDICATOR
const baseStore = useBaseStore();
const { isStepsOpenIndicator } = storeToRefs(baseStore);

// CURRENT PAGE
let totalPages = ref<number>(3);
let currentPage = ref<number>(1);

// STEPS CONTENT
const steps = [
    {
        title: 'Step 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        title: 'Step 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        title: 'Step 3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
]

// CURRENT PAGE TITLE
const currentTitle = computed(() => {
    return steps[currentPage.value - 1].title;
});

// CURRENT PAGE DESCRIPTION
const currentDescription = computed(() => {
    return steps[currentPage.value - 1].description;
});

// GO TO NEXT PAGE
const nextPage = ():void => {
    if (currentPage.value === totalPages.value) return;
    currentPage.value++;
};

// GO TO PREV PAGE
const prevPage = ():void => {
    if (currentPage.value <= 1) return;
    currentPage.value--;
};

// CLOSE STEPS WINDOW
const closeStepsWindow = (): void => {
    baseStore.isStepsOpenIndicatorToFalse();
    setTimeout(() => {
        currentPage.value = 1;
    }, 200);
};

// CLOSE WINDOW ON WRAPPER CLICK
const closeWindowOnWrapper = (event: Event): void => {
    if (window.outerWidth > 850) return;
    const target = event.target as HTMLElement;
    if (!target.classList.contains('wrapper')) return;
    closeStepsWindow();
};

</script>

<template>
    <div @click="closeWindowOnWrapper" :class="{'opened': isStepsOpenIndicator}" class="wrapper steps-wrapper">
        <div class="steps">
            <div class="step">
                <h2 class="title">{{currentTitle}}</h2>
                <p class="description">{{currentDescription}}</p>
            </div>
            <div class="buttons">
                <button v-if="currentPage > 1" @click="prevPage" class="button button-prev">Prev</button>
                <button @click="closeStepsWindow" class="button button-transparent button-exit">Exit</button>
                <button v-if="currentPage !== totalPages" @click="nextPage" class="button button-next">Next</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.opened {
    opacity: 1 !important;
    visibility: visible !important;
}

.steps-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    transition: all .3s;
    opacity: 0;
    visibility: hidden;
        
    @media only screen and (max-width: 850px) {
        @include flex-center;
        position: fixed;
        backdrop-filter: blur(6px);
    }
}

.steps {
    @include flex-center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: rgba($color-pink-light-3, .7);
    backdrop-filter: blur(6px);
    text-align: center;
    border-radius: 4rem;
        
    @media only screen and (max-width: 850px) {
        height: auto;
        width: 53rem;
        backdrop-filter: none;
        background-color: rgba($color-pink-light-3, .9);
        padding: 4.5rem 3rem;
    }
        
    @media only screen and (max-width: 450px) {
        width: 90%;
    }

    .buttons {
        display: flex;
        align-items: center;

        .button {
            padding: .75rem 3.5rem;
            background-color: $color-blue-2;
            border: 2px solid $color-blue-2;
            border-radius: 1.25rem;
            font-weight: 600;

            &:hover {
                transform: scale(1.1);
            }

            &:not(:last-of-type) {
                margin-right: 1.35rem;
            }
        }

        .button-transparent {
            background-color: transparent;
            color: $color-blue-2;
        }
    }

    .step {
        color: $color-grey-2;
        width: 70%;
        
        @media only screen and (max-width: 450px) {
            width: 80%;
        }

        .title {
            font-family: Panton;
            font-weight: 700;
            font-size: 3.75rem;
            margin-bottom: 1.5rem;
        }

        .description {
            line-height: 1.25;
            font-size: 1.8rem;
            margin-bottom: 2.5rem;
        }
    }
}
</style>