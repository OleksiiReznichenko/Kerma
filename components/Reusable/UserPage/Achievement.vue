<script setup lang="ts">
interface Props {
    icon: string;
    title: string;
    description: string;
}

const props = defineProps<Props>();

// GET BASE URL
const baseUrl = useBaseStore().baseUrl;
</script>

<template>
    <button class="achievement-button">
        <img :src="baseUrl + 'svgs/' + icon" alt="Icon" class="achievement-icon">
        <div class="achievement-dropdown">
            <h4 class="title">{{title}}</h4>
            <p class="description">{{description}}</p>
        </div>
    </button>
</template>

<style scoped lang="scss">
.achievement-button {
    background: linear-gradient(0deg, rgba(206, 194, 242, 0.9), rgba(206, 194, 242, 0.9));
    width: 3.25rem;
    height: 3.25rem;
    border-radius: .75rem;
    position: relative;
    box-shadow: .75rem .75rem 1.25rem rgba(76, 26, 92, 0.08);

    &:not(:last-of-type) {
        margin-right: 1rem;
    }

    @media only screen and (max-width: 850px) {
        width: 4rem;
        height: 4rem;

        &:not(:last-of-type) {
            margin-right: 1.5rem;
        }
    }

    .achievement-icon {
        width: 2.1rem;
        height: 2.1rem;
        @include abs-center;

        @media only screen and (max-width: 850px) {
            width: 2.75rem;
            height: 2.75rem;
        }
    }

    .achievement-dropdown {
        position: absolute;
        top: 140%;
        left: 0%;
        transform: translateX(-9.5rem);
        background-color: $color-pink-light;
        box-shadow: 0 .25rem 4rem rgba(0, 0, 0, 0.2);
        color: $color-grey-2;
        width: 22rem;
        border-radius: 2rem;
        padding: .75rem 2rem 1.5rem;
        cursor: default;
        transition: all .3s;

        opacity: 0;
        visibility: hidden;
    
        @media only screen and (max-width: 850px) {
            transform: translateX(-9rem);
        }

        &::before {
            content: '';
            background-color: $color-pink-light;
            display: block;
            position: absolute;
            top: -.7rem;
            left: 50%;
            transform: translateX(-50%) rotate(45deg);
            width: 1.5rem;
            height: 1.5rem;
        }

        .title {
            font-family: Panton;
            font-weight: 700;
            text-transform: uppercase;
            font-size: 3rem;
        }

        .description {
    
            @media only screen and (max-width: 850px) {
                font-size: 1.8rem !important;
            }
        }
    }
}
</style>