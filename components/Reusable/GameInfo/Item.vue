<script setup lang="ts">
interface Props {
    isIcon: boolean,
    iconPath?: string,
    iconAlt?: string,
    textIcon?: string,
    subtitle: string,
    infoText: string
}

const props = defineProps<Props>();
</script>

<template>
    <div class="info-item">
        <div class="icon-container">
            <img v-if="isIcon" :src="'/projects/Kerma/svgs/' + iconPath" :alt="iconAlt + ' icon'" class="icon">
            <strong v-if="!isIcon" class="icon-id">{{textIcon}}</strong>
        </div>
        <div class="info">
            <span class="subtitle">{{subtitle}}:</span>
            <strong class="info-text">{{infoText}}</strong>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.info-item {
    display: flex;
    align-items: center;
    white-space: nowrap;
    padding: 2.25rem 0 1.75rem;
    
    @media only screen and (max-width: 850px) {
        padding: 0;
    }

    .icon-container {
        background: linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), rgba(182, 179, 235, 0.7);
        border-radius: 100%;
        width: 4rem;
        height: 4rem;
        @include flex-center;
        margin-right: 1rem;

        @media only screen and (max-width: 850px) {
            width: 5rem;
            height: 5rem;
        }
        
        .icon {
            width: 60%;
        }

        .icon-id {
            font-weight: 600;

            @media only screen and (max-width: 850px) {
                font-size: 2rem;
            }
        }
    }

    .info {
        display: flex;
        flex-direction: column;

        .subtitle {
            font-size: 1.5rem;
            display: inline-block;
            margin-bottom: .215rem;

            @media only screen and (max-width: 850px) {
                font-size: 1.8rem;
            }
        }

        .info-text {
            font-size: 1.8rem;
            font-weight: 600;

            @media only screen and (max-width: 850px) {
                font-size: 2.2rem;
            }
        }
    }
}
</style>