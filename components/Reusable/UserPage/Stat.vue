<script setup lang="ts">
interface Props {
    icon: string;
    subtitle: string;
    stat: string | number;
}

const props = defineProps<Props>();

// GET BASE URL
const baseUrl = useBaseStore().baseUrl;
</script>

<template>
    <div class="stat">
        <img :src="baseUrl + 'imgs/' + icon" alt="Icon" class="icon">
        <div class="inner-container">
            <img src="@/assets/svg/profileStatCircle.svg" alt="Circle" class="pink-circle">
            <div class="info">
                <strong class="stat-line">{{stat}}</strong>
                <span class="subtitle">{{subtitle}}</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.stat {
    width: 23rem;
    height: 19rem;
    position: relative;
    border-radius: 4rem;

    &:not(:last-of-type) {
        margin-right: 2.5rem;
    }
    
    @media only screen and (max-width: 850px) {
        box-shadow: 1.5rem 1.75rem 2.5rem rgba(0, 0, 0, 0.1);

        &:not(:last-of-type) {
            margin-right: 0;
        }
    }
    
    @media only screen and (max-width: 450px) {
        width: 20.5rem;
        height: 17.5rem;
    }


    .icon {
        position: absolute;
        top: -4rem;
        right: -3rem;
        z-index: 100;
        width: 12rem;
    
        @media only screen and (max-width: 850px) {
            top: -2rem;
        }
    
        @media only screen and (max-width: 450px) {
            width: 11rem;
            right: -2rem;
        }
    }

    .inner-container {
        background: radial-gradient(124.5% 142.12% at -43.52% -39.92%, #FDF7FF 0%, #e0d2ff 100%), #FFFFFF;
        border-radius: 4rem;
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
    
        @media only screen and (max-width: 850px) {
            background: #eee;
        }

        .pink-circle {
            position: absolute;
            top: 0;
            right: 0;
    
            @media only screen and (max-width: 850px) {
                width: 10rem;
            }
    
            @media only screen and (max-width: 450px) {
                top: -.5rem;
            }
        }

        .info {
            position: absolute;
            left: 3rem;
            bottom: 4rem;
            display: flex;
            flex-direction: column;
            z-index: 100;
            line-height: 1;
            padding-right: 2rem;
    
            @media only screen and (max-width: 450px) {
                bottom: 3rem;
            }


            .stat-line {
                font-weight: 700;
                font-size: 3.5rem;
                color: $color-pink-dark-3;
                word-break: break-all;
                margin-bottom: .5rem;
            }

            .subtitle {
                color: $color-pink-dark-2;
            }
        }
    }
}
</style>