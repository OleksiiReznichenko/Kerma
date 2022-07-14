<script setup lang="ts">
import { storeToRefs } from 'pinia';
import UserAchievements from '@/composables/interfaces/userAchievements';

interface Props {
    index: number;
    id: string;
    betAmount: number;
    startTime: number;
    endTime: number | null;
    nickname: string;
    avatar: string;
    rank: string;
    achievements: UserAchievements;
}

const props = defineProps<Props>();

// GET BASE URL
const baseStore = useBaseStore();
const { baseUrl } = storeToRefs(baseStore);

// AVATAR PATH
const avatarPath = computed<string>(() => {
    if (props.avatar === 'default') {
        return baseUrl.value + 'imgs/defaultAvatar.png';
    } else {
        return props.avatar;
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GAME DURATION RELATED CODE
let stopwatchInterval: ReturnType<typeof setInterval> | null = null;
let hours = ref<string | number>('00');
let minutes = ref<string | number>('00');
let seconds = ref<string | number>('00');

// BET DURATION
const betDuration = computed(() => {
    if (props.index === 0) return;
    const gameDuration = props.endTime - props.startTime;
    calcInitialTime(gameDuration);

    return `${hours.value}:${minutes.value}:${seconds.value}`;
});

// GET INITIAL TIME
const calcInitialTime = (gameDuration: number): void => {
    seconds.value = Math.floor((gameDuration / 1000) % 60);
    minutes.value = Math.floor((gameDuration / (1000 * 60)) % 60);
    hours.value = Math.floor((gameDuration / (1000 * 60 * 60)) % 60);

    formatSeconds();
    formatMinutes();
    formatHours();
};

// FORMAT SECONDS IF SECOND IS LESS THAN 10
const formatSeconds = (): void => {
     if (+seconds.value < 10) {
        seconds.value = '0' + seconds.value;
    }
};

// FORMAT MINUTES IF MINUTE IS LESS THAN 10
const formatMinutes = (): void => {
     if (+minutes.value < 10) {
        minutes.value = '0' + minutes.value;
    }
};

// FORMAT HOURS IF HOUR IS LESS THAN 10
const formatHours = (): void => {
     if (+hours.value < 10) {
        hours.value = '0' + hours.value;
    }
};

// HIGHEST BET STOPWATCH
const stopwatchInit = (): void => {
    seconds.value = +seconds.value + 1;

    if (+seconds.value >= 60) {
        seconds.value = '00';
        minutes.value = +minutes.value + 1;

        formatMinutes();
    }

    if (+minutes.value >= 60) {
        minutes.value = '00';
        hours.value = +hours.value + 1;

        formatHours();
    }

    if (+seconds.value > 0) {
        formatSeconds();
    }
};

onMounted(() => {
    // INIT STOPWATCH ON HIGHEST BET
    if (props.index === 0) {
        const gameDuration = new Date().getTime() - props.startTime;
        calcInitialTime(gameDuration);

        // STOPWATCH INTERVAL
        stopwatchInit();
        stopwatchInterval = setInterval(stopwatchInit, 1000);
    }
});

onUnmounted(() => {
    if (props.index === 0) {
        // CLEAR STOPWATCH INTERVAL
        clearInterval(stopwatchInterval);
    }
});
</script>

<template>
    <div :class="{'first': index === 0}" class="bet">
        <div class="place desktop">
            <div class="inner-container">
                <span>{{index + 1}}</span>
            </div>
        </div>
        <div class="info">
            <ReusableGameMiniProfile
                :id="id"
                :nickname="nickname"
                :avatar="avatarPath"
                :rank="rank"
                :achievements="achievements"
            />
            <div class="column first-column">
                <div class="avatar-container">
                    <img :src="avatarPath" alt="Avatar" class="avatar">
                    <img v-if="index === 0" src="@/assets/svg/leaderboardWinnerAvatarMobile.svg" alt="Avatar background" class="avatar-background mobile">
                </div>
                <div class="container">
                    <strong class="info-line name-line">{{nickname}}</strong>
                    <span class="subtitle">{{rank}}</span>
                </div>
            </div>
            <div class="column second-column">
                <strong v-if="index === 0" class="info-line bet-info-line">
                    <span>{{hours}}</span> : 
                    <span>{{minutes}}</span> : 
                    <span>{{seconds}}</span>
                </strong>
                <strong v-else class="info-line">{{betDuration}}</strong>
                <span class="subtitle">Bet duration</span>
            </div>
            <div class="column third-column">
                <strong class="info-line">{{betAmount.toFixed(5)}}</strong>
                <span class="subtitle">Bet amount (ETH)</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.first {

    .info {
        background-color: $color-pink-light-2 !important;
    }
        
    @media only screen and (max-width: 850px) {
         .info {
            background-image: radial-gradient(64.31% 64.31% at 88.04% 10.98%, #97C1FF 0%, #F9AEFF 100%) !important;

            .avatar-container {
                margin-bottom: 3.5rem !important;
            }
        }
    }
}
.bet {
    margin-bottom: 1.25rem;
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
        
    @media only screen and (max-width: 850px) {
        &:not(:last-of-type) {
            margin-bottom: 7rem;
        }
    }

    .place {
        background-color: $color-primary;
        background: linear-gradient(0deg, rgba(255, 255, 255, 0.81), rgba(255, 255, 255, 0.81)), rgba(233, 208, 241, 0.8);
        width: 4.25rem;
        height: 4.25rem;
        border: .65rem solid $color-pink-light-14;
        border-radius: 100%;
        margin-right: 1rem;        

        .inner-container {
            @include flex-center;
            width: 100%;
            height: 100%;
            box-shadow: .75rem .75rem 1.35rem rgba(76, 26, 92, 0.08), 
            inset 3px 3px 2px rgba(0, 0, 0, 0.25);
            border-radius: 100%;

            span {
                font-weight: 900;
                font-size: 1.2rem;
                color: lighten($color-pink-dark-2, 10%);
            }
        }
    }

    .info {
        background-color: $color-pink-light;
        border-radius: 1.5rem;
        box-shadow: .75rem .75rem 1.35rem rgba(76, 26, 92, 0.08);
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-grow: 1;
        padding: 1rem;
        padding-right: 3rem;
        color: $color-pink-dark-2;
        transition: all .3s;

        &:hover :deep(.mini-profile) {
            opacity: 1 !important;
            visibility: visible !important;
        }

        &:focus :deep(.mini-profile) {
            opacity: 1 !important;
            visibility: visible !important;
        }

        &:active :deep(.mini-profile) {
            opacity: 1 !important;
            visibility: visible !important;
        }

        &:hover {
            background-color: darken($color-pink-light-2, 3%) !important;
        }
        
        @media only screen and (max-width: 850px) {
            flex-direction: column;
            justify-content: center;
            color: white;
            padding-right: 1rem;
            padding-bottom: 3.5rem;
            border-radius: 15px;
            background-color: $color-pink-light-2;
        }

        .column {
            display: flex;
            align-items: center;
            flex-direction: column;
        
            @media only screen and (max-width: 850px) {
                &:not(:last-of-type) {
                    margin-bottom: 2rem;
                }
            }

            .info-line {
                font-weight: 700;
        
                @media only screen and (max-width: 850px) {
                    font-weight: 600;
                    margin-bottom: .45rem;
                    font-size: 2.6rem;
                }
            }

            .bet-info-line {
                text-align: center;

                span {
                    display: inline-block;
                    width: 2rem;
                    white-space: nowrap;
                }

                .dots {
                    width: 1rem;
                }
            }

            .subtitle {
                font-size: 1.2rem;
        
                @media only screen and (max-width: 850px) {
                    font-size: 1.6rem;
                }
            }

            .avatar-container {
                margin-right: 1.5rem;
                position: relative;
        
                @media only screen and (max-width: 850px) {
                    margin-right: 0;
                    margin-bottom: 1rem;
                    margin-top: -5rem;
                }
            }
            .avatar {
                width: 4.25rem;
                height: 4.25rem;
                border: 4px solid $color-pink-light-5;
                border-radius: 100%;
        
                @media only screen and (max-width: 850px) {
                    width: 7.75rem;
                    height: 7.75rem;
                    border: 5px solid white;
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
            width: 50%;
            flex-direction: row;
        
            @media only screen and (max-width: 850px) {
                flex-direction: column;
            }

            .name-line {
                white-space: nowrap;
                display: inline-block;
                text-overflow: ellipsis;
                overflow: hidden;
                max-width: 15rem;
        
                @media only screen and (max-width: 850px) {
                    max-width: 30rem;
                }
            }
        }
    }
}
</style>