<script setup lang="ts">
interface Props {
    index: number,
    title: string,
    text: string,
    isButton: boolean,
    buttonText?: string,
    buttonLink?: string
}

const props = defineProps<Props>();
</script>

<template>
    <div class="question">
        <h3 class="title">1.{{index}} {{title}}</h3>
        <p>{{text}}</p>
        <NuxtLink v-if="isButton" :to="buttonLink" class="btn btn-primary">{{buttonText}}</NuxtLink>
    </div>
</template>

<style lang="scss" scoped>
.question {
    margin-bottom: 3rem;

    @media only screen and (max-width: 850px) {
        width: 85%;
    }

    @media only screen and (max-width: 750px) and (min-width: 600px) {
        width: 75%;
    }

    @media only screen and (max-width: 450px) {
        width: 90%;
    }

    .title {
        font-family: Panton;
        font-weight: 900;
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    p {
        font-size: 1.8rem;
        margin-bottom: 1.5rem;

        @media only screen and (max-width: 850px) {
            font-size: 2rem;
        }
    }
}
</style>