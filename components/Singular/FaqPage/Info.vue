<template>
    <div class="info">
        <h1 class="title">F.A.Q.</h1>
        <div class="questions">
            <ReusableFaqPageQuestion />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.info {
    @include abs-center;
    left: 0;
    transform: translate(0, -50%);
    text-align: center;
    width: 70rem;
    z-index: 100;

    @media only screen and (max-width: 1000px) and (min-width: 850px),
    only screen and (max-width: 850px) and (max-height: 600px),
    only screen and (max-width: 600px) {
        text-align: left;
    }

    @media only screen and (max-width: 850px) {
        width: 100%;
        transform: translate(0);
    }

    @media only screen and (max-width: 850px) and (min-height: 600px),
    only screen and (max-width: 600px) and (min-height: 750px) {
        top: 11%;
    }

    @media only screen and (max-width: 850px) and (max-height: 600px) and (min-width: 600px) {
        top: 20%;
    }

    @media only screen and (max-width: 600px) and (max-height: 750px) {
        top: 12rem;
        transform: translate(0);
    }

    .title {
        font-size: 9rem;
        text-transform: uppercase;
        white-space: nowrap;

        @media only screen and (max-width: 750px) {
            font-size: 7.5rem;
        }

        @media only screen and (max-width: 500px) {
            font-size: 6.5rem;
        }

        @media only screen and (max-width: 400px) {
            font-size: 6rem;
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