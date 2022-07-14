<script setup lang="ts">
import { storeToRefs } from "pinia";

// FAQ QUESTIONS
const faqStore = useFaqStore();
const { questions } = storeToRefs(faqStore);
</script>

<template>
    <div class="info">
        <h1 class="title">F.A.Q.</h1>
        <div class="questions">
            <ReusableFaqPageQuestion
                v-for="(question, i) in questions"
                :key="question.id"
                :id="question.id"
                :index="i + 1"
                :title="question.title"
                :text="question.text"
                :isButton="question.isButton"
                :buttonText="question.buttonText"
                :buttonLink="question.buttonLink"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.info {
    position: relative;
    width: 60rem;
    min-height: 100vh;
    z-index: 200;
    margin-left: auto;
    
    @media only screen and (max-width: 1300px) and (min-height: 1000px) and (min-width: 850px) {
        margin-top: 12vh;
    }

    @media only screen and (max-width: 1000px) and (min-width: 850px),
    only screen and (max-width: 850px) and (max-height: 600px),
    only screen and (max-width: 600px) {
        text-align: left;
    }

    @media only screen and (max-width: 850px) and (min-height: 600px),
    only screen and (max-width: 600px) {
        width: 100%;
        padding-top: 60vh;
    }

    @media only screen and (max-width: 850px) and (min-height: 1000px) {
        padding-top: 80rem;
    }

    .title {
        font-size: 9rem;
        text-transform: uppercase;
        white-space: nowrap;
        margin-bottom: 1rem;

        @media only screen and (max-width: 750px) {
            font-size: 7.5rem;
        }
    }

    .subtitle {
        font-family: Panton;
        font-weight: 900;
        font-size: 3.5rem;
        margin-bottom: 2.25rem;
    }

    p {
        width: 65%;
        margin: 0 auto;
        margin-bottom: 4.5rem;

        @media only screen and (max-width: 1000px) and (min-width: 850px),
        only screen and (max-width: 850px) and (max-height: 600px),
        only screen and (max-width: 600px) {
            margin: 0 0 4.5rem;
        }

        @media only screen and (max-width: 850px) {
            width: 50rem;
            font-size: 2rem;
        }

        @media only screen and (max-width: 600px) {
            font-size: 2.2rem;
            line-height: 1.3;
        }

        @media only screen and (max-width: 500px) {
            width: 90%;
        }
    }

    .btn {
        text-transform: uppercase;
    }
}
</style>