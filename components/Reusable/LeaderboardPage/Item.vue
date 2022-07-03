<script setup lang="ts">
interface Props {
    index: number;
    id: string;
    nickname: string;
    avatar: string;
    rank: string;
    balanceEth: number;
    cryptoAddress: string;
}

const props = defineProps<Props>();

// GET BASE URL
const baseUrl = useBaseStore().baseUrl;

// IS DEFAULT AVTAR INDICATOR
const isDefaultAvatar = computed<boolean>(() => {
    if (props.avatar === 'default') {
        return true;
    } else {
        return false;
    }
});
</script>

<template>
    <div class="item">
        <div :class="{'place-visible': index < 3}" class="place desktop">
            <img v-if="index === 0" src="@/assets/img/medalFirstPlace.png" alt="First place" class="place-image">
            <img v-if="index === 1" src="@/assets/img/medalSecondPlace.png" alt="Second place" class="place-image">
            <img v-if="index === 2" src="@/assets/img/medalThirdPlace.png" alt="Third place" class="place-image">
        </div>
        <NuxtLink :to="'/users/' + id" class="info">
            <div class="first-column column">
                <div class="avatar-container">
                    <img v-if="isDefaultAvatar" :src="baseUrl + 'imgs/defaultAvatar.png'" alt="Avatar" class="avatar">
                    <img v-else :src="avatar" alt="Avatar" class="avatar">
                    <img v-if="index === 0" src="@/assets/svg/leaderboardWinnerAvatarMobile.svg" alt="Avatar background" class="avatar-background mobile">
                </div>
                <div class="container">
                    <strong class="info-line name-line">{{nickname}}</strong>
                    <span class="subtitle">{{rank}}</span>
                </div>
            </div>
            <div class="second-column column">
                <strong class="info-line">
                    <span>{{cryptoAddress}}</span>
                    <span>{{cryptoAddress}}</span>
                </strong>
                <span class="subtitle">Address:</span>
            </div>
            <div class="third-column column">
                <strong class="info-line">{{(balanceEth * 10).toFixed(2)}} <span class="mobile">USD</span></strong>
                <span class="subtitle">Total winning<span class="desktop">(USD)</span>:</span>
            </div>
            <div class="fourth-column column">
                <strong class="info-line">{{balanceEth.toFixed(4)}} <span class="mobile">ETH</span></strong>
                <span class="subtitle">Total winning<span class="desktop">(ETH)</span>:</span>
            </div>
        </NuxtLink>
    </div>
</template>

<style lang="scss" scoped>
.item {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 3.5rem;
        
    @media only screen and (max-width: 850px) {
        margin-bottom: 6.5rem;
        
        &:first-of-type {
            margin-top: 7.5rem;

            .info {
                background-image: radial-gradient(64.31% 64.31% at 88.04% 10.98%, #97C1FF 0%, #F9AEFF 100%) !important;

                .avatar-container {
                    margin-bottom: 3rem !important;
                }
            }
        }
    }

    .place {
        width: 8rem;
        height: 8rem;
        border-radius: 100%;
        margin-right: 2rem;
    }

    .place-visible {
        @include flex-center;
        background-color: $color-primary;
        box-shadow: .75rem 1rem 1.5rem rgba(76, 26, 92, 0.15);
        
        .place-image {
            width: 5.5rem;
            height: 5.5rem;
            border-radius: 100%;
            background-color: white;
            padding: .75rem;
        }
    }

    .info {
        background-color: $color-pink-light-2;
        border-radius: 1.5rem;
        box-shadow: .75rem 1rem 1.5rem rgba(76, 26, 92, 0.08);
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-grow: 1;
        padding: 1rem;
        padding-right: 6rem;
        color: $color-pink-dark-2;
        transition: all .3s;

        &:hover {
            background-color: darken($color-pink-light-2, 5%);
        }
        
        @media only screen and (max-width: 850px) {
            flex-direction: column;
            justify-content: center;
            color: white;
            padding-right: 1rem;
            padding-bottom: 3.5rem;
            border-radius: 15px;
        }

        .column {
            display: flex;
            align-items: center;
            flex-direction: column;
        
            @media only screen and (max-width: 850px) {
                &:not(:last-of-type) {
                    margin-bottom: 2.5rem;
                }
            }

            .info-line {
                font-weight: 700;
                font-size: 2.3rem;
        
                @media only screen and (max-width: 850px) {
                    font-weight: 600;
                    margin-bottom: .65rem;
                    font-size: 2.6rem;
                }
            }

            .subtitle {
                font-size: 1.2rem;
                // padding-top: .125rem;
        
                @media only screen and (max-width: 850px) {
                    font-size: 1.6rem;
                }
            }

            .avatar-container {
                margin-right: 2rem;
                position: relative;
        
                @media only screen and (max-width: 850px) {
                    margin-right: 0;
                    margin-bottom: 1rem;
                    margin-top: -5rem;
                }
            }
            .avatar {
                width: 5.75rem;
                height: 5.75rem;
                border: 4px solid $color-blue;
                border-radius: 100%;
        
                @media only screen and (max-width: 850px) {
                    width: 7.5rem;
                    height: 7.5rem;
                    border: 4px solid white;
                }
            }

            .avatar-background {
                @include abs-center;
                top: 55%;
                width: 14rem;
                height: 14rem;
            }

            .container {
                display: flex;
                align-items: center;
                flex-direction: column;
            }
        }

        .first-column {
            flex-direction: row;
        
            @media only screen and (max-width: 850px) {
                flex-direction: column;
            }

            .name-line {
                white-space: nowrap;
                display: inline-block;
                text-overflow: ellipsis;
                overflow: hidden;
                max-width: 25rem;
        
                @media only screen and (max-width: 850px) {
                    max-width: 30rem;
                }
            }
        }

        .second-column {

            .info-line {
                line-height: .9;
        
                @media only screen and (max-width: 850px) {
                    margin-bottom: 1rem;
                }

                span {
                    white-space: nowrap;
                    overflow: hidden;
                    display: inline-block;

                    &:first-of-type {
                        width: 8rem;
                        text-overflow: ellipsis;
        
                        @media only screen and (max-width: 850px) {
                            // width: 15rem;
                            width: 13rem;
                        }
                    }

                    &:last-of-type {
                        width: 6.7rem;
                        direction: rtl;
                        text-align: right;
                        margin-left: -.35rem;
        
                        @media only screen and (max-width: 850px) {
                            // width: 11.2rem;
                            width: 9.2rem;
                        }
                    }
                }
            }
        }
    }
}
</style>