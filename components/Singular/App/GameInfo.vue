<script setup lang="ts">
import { storeToRefs } from "pinia";

// GET BASE URL
const baseUrl = useBaseStore().baseUrl;

// ROUTE INFO
const route = useRoute();

// PREV GAME INFO AND NEXT GAME DATE
const baseStore = useBaseStore();
const { previousGameInfo, nextGameDate, gameState, timeBetweenGamesMs, triggerAnimation, triggerAnimationIndicator } = storeToRefs(baseStore);

// DOM
const gameInfo = ref<HTMLElement | null>(null);
const opener = ref<HTMLElement | null>(null);

// INDICATORS FOR CLASSES
let isOpen = ref<boolean>(false);
let addTransitionClass = ref<boolean>(false);

let gameEndIndicator = ref<boolean>(false);
let correctTimeIndicator = ref<boolean>(false);

let descriptionText = ref<string>('Game ends');

let amountOfMinutesBeforeAnimation = ref<number>(1);
let secondsTimer = ref<number>(0);

// TIMER DATA
let dateInterval: ReturnType<typeof setInterval> | null = null;
const days = ref<string | number>('00');
const hours = ref<string | number>('00');
const minutes = ref<string | number>('00');
const seconds = ref<string | number>('00');

let lastDayOfMonth = ref<number>(31);

// MONTH OF NEXT GAME
const month = computed<string>(() => {
    if (nextGameDate.value.month === 1) {
        lastDayOfMonth.value = 31;
        return 'January';
    } else if (nextGameDate.value.month === 2) {
        lastDayOfMonth.value = 28;
        return 'February';
    } else if (nextGameDate.value.month === 3) {
        lastDayOfMonth.value = 31;
        return 'March';
    } else if (nextGameDate.value.month === 4) {
        lastDayOfMonth.value = 30;
        return 'April';
    } else if (nextGameDate.value.month === 5) {
        lastDayOfMonth.value = 31;
        return 'May';
    } else if (nextGameDate.value.month === 6) {
        lastDayOfMonth.value = 30;
        return 'June';
    } else if (nextGameDate.value.month === 7) {
        lastDayOfMonth.value = 31;
        return 'July';
    } else if (nextGameDate.value.month === 8) {
        lastDayOfMonth.value = 31;
        return 'August';
    } else if (nextGameDate.value.month === 9) {
        lastDayOfMonth.value = 30;
        return 'Septempber';
    } else if (nextGameDate.value.month === 10) {
        lastDayOfMonth.value = 31;
        return 'October';
    } else if (nextGameDate.value.month === 11) {
        lastDayOfMonth.value = 30;
        return 'November';
    } else if (nextGameDate.value.month === 12) {
        lastDayOfMonth.value = 31;
        return 'December';
    }
});

// DATE OF NEXT GAME
const dateToCount = computed<string>(() => {
    return `${month.value} ${nextGameDate.value.day}, ${nextGameDate.value.year} ${nextGameDate.value.hour}:${nextGameDate.value.minute}:${nextGameDate.value.second}`;
});

// TIMER FUNCTIONALITY
const timerInit = (): void => {
    // const timeToCount: number = new Date().getTime() + 300000;
    const timeToCount: number = new Date(dateToCount.value).getTime();
    const now: number = new Date().getTime();
    const timeLeft: number = timeToCount - now;

    if (timeLeft <= 0) {
        if (nextGameDate.value.second + timeBetweenGamesMs.value / 1000 >= 60)  {
            nextGameDate.value.second = 0;
        } else {
            nextGameDate.value.second += timeBetweenGamesMs.value / 1000;
        }

        if (nextGameDate.value.minute + 3 >= 60) {
            nextGameDate.value.minute = nextGameDate.value.minute + 3 - 60;

            if (nextGameDate.value.hour + 1 >= 24) {
                nextGameDate.value.hour = 0;

                if (nextGameDate.value.day + 1 > 31) {
                    nextGameDate.value.day = 1;

                    if (nextGameDate.value.month + 1 > 12) {
                        nextGameDate.value.month = 1;
                        nextGameDate.value.year += 1;
                    } else {
                        nextGameDate.value.month += 1;
                    }
                } else {
                    nextGameDate.value.day += 1;
                }
            } else {
                nextGameDate.value.hour += 1;
            }

        } else {
            nextGameDate.value.minute += 3;
            // nextGameDate.value.minute += 1;
        }
        // gameState.value = 'ended';

        requestAnimationFrame(timerInit);

        if (correctTimeIndicator.value) {
            gameState.value = 'ended';
            gameEndIndicator.value = true;
            descriptionText.value = 'Next game';

            const timeToCount: number = new Date(dateToCount.value).getTime();
            const now: number = new Date().getTime();
            const timeLeft: number = timeToCount - now;
            minutes.value = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

            if (minutes.value > 10) {
                amountOfMinutesBeforeAnimation.value = 2;
            } else {
                amountOfMinutesBeforeAnimation.value = 1;
            }

            const dueTo = new Date(+new Date()+timeBetweenGamesMs.value);

            const timeout = () => {
                if (new Date() < dueTo) {
                    window.setTimeout(timeout, 30);
                } else {
                    gameState.value = 'started';
                    gameEndIndicator.value = false;
                    descriptionText.value = 'Game ends';
                }
            };
            timeout();

            // setTimeout(() => {
            //     gameState.value = 'started';
            //     gameEndIndicator.value = false;
            //     descriptionText.value = 'Game ends';
            // }, timeBetweenGamesMs.value);
        }
    }

    if (timeLeft > 0 && !correctTimeIndicator.value) {
        correctTimeIndicator.value = true;
    }

    if (correctTimeIndicator.value && !gameEndIndicator.value) {
        if ((secondsTimer.value + 1) / 60 < amountOfMinutesBeforeAnimation.value) {
            secondsTimer.value += 1;
        } else {
            // if (triggerAnimation.value === 'position' || triggerAnimation.value === null) {
            //     triggerAnimation.value = 'rotation';
            // } else if (triggerAnimation.value === 'rotation') {
            //     triggerAnimation.value = 'position';
            // }

            secondsTimer.value = 0;
            triggerAnimationIndicator.value = true;
        }
    }

    days.value = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    hours.value = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes.value = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    seconds.value = Math.floor((timeLeft % (1000 * 60)) / 1000);

    if (+days.value < 10) {
        days.value = '0' + days.value;
    }

    if (+hours.value < 10) {
        hours.value = '0' + hours.value;
    }

    if (+minutes.value < 10) {
        minutes.value = '0' + minutes.value;
    }

    if (+seconds.value < 10) {
        seconds.value = '0' + seconds.value;
    }

    if (gameEndIndicator.value) {
        days.value = '00';
        hours.value = '00';
        minutes.value = '00';
    }
};

// TOGGLE GAME INFO DROPDOWN ON MOBILE
const toggleGameInfo = (): void => {
    if (window.outerWidth > 850 || addTransitionClass.value) return;
    if (!isOpen.value) {
        isOpen.value = true;
    } else {
        isOpen.value = false;
    }

    addTransitionClass.value = true;

    setTimeout(() => {
        addTransitionClass.value = false;
    }, 500);
};

// REINIT VARIABLES ON WINDOW RESIZE EVENT ON DESKTOP
const onWindowResize = (): void => {
    if (window.outerWidth > 850 && (isOpen.value || addTransitionClass.value)) {
        isOpen.value = false;
        addTransitionClass.value = false;
    }
};

// CLOSE GAME INFO DROPDOWN ON MOBILE ON UNFOCUS FROM IT
const onWindowClick = (event: Event): void => {
    if (window.outerWidth > 850 || !gameInfo.value || !opener.value) return;
    const target = event.target as HTMLElement;
    const isClickInsideElement: boolean = gameInfo.value.contains(target);
    const isClickInsideElement2: boolean = opener.value.contains(target);

    if (isClickInsideElement || isClickInsideElement2 || !isOpen.value) return;
    toggleGameInfo();
};

watch(route, () => {
    if (!isOpen.value) return;
    toggleGameInfo();
})

onMounted(() => {
    // TIMER INTERVAL
    baseStore.updateNextGameDate();
    timerInit();
    dateInterval = setInterval(timerInit, 1000);


    // ADD WINDOW EVENT LISTENERS
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('click', onWindowClick);
});

onUnmounted(() => {
    // CLEAR TIMER INTERVAL
    clearInterval(dateInterval);

    // REMOVE WINDOW EVENT LISTENERS
    window.removeEventListener('resize', onWindowResize);
    window.removeEventListener('click', onWindowClick);
});

</script>

<template>
    <div ref="gameInfo" :class="{'open': isOpen, 'close': !isOpen, 'transition-class': addTransitionClass}" class="logged-in game-info">
        <SingularAppLogo class="mobile logo" />
        <SingularAppSocials class="mobile socials-game-info" />
        <div class="info-items">
            <div class="info-item">
                <div class="icon-container">
                    <img :src="baseUrl + 'svgs/24h.svg'" alt="Last winner icon" class="icon">
                </div>
                <div class="info">
                    <span class="subtitle">Last winner:</span>
                    <strong class="info-line">{{previousGameInfo.winnerNickname}}</strong>
                </div>
            </div>
            <div class="info-item">
                <div class="icon-container">
                    <img :src="baseUrl + 'svgs/bank.svg'" alt="Amount win icon" class="icon">
                </div>
                <div class="info">
                    <span class="subtitle">Amount win:</span>
                    <strong class="info-line amount-win-line">
                        <span>{{previousGameInfo.winAmountEth.toFixed(2)}}</span>
                        <span>ETH</span>
                    </strong>
                </div>
            </div>

            <div class="timer-container desktop">
                <strong class="subtitle">{{descriptionText}} in:</strong>
                <div class="timer">
                    <span class="span-time">{{days}}</span> <span class="span-dots">:</span> <span class="span-time">{{hours}}</span> <span class="span-dots">:</span> <span class="span-time">{{minutes}}</span> <span class="span-dots">:</span> <span class="span-time">{{seconds}}</span>
                </div>
            </div>

            <div class="info-item">
                <div class="icon-container">
                    <strong class="icon-id">ID</strong>
                </div>
                <div class="info">
                    <span class="subtitle">Game ID:</span>
                    <strong class="info-line">#{{previousGameInfo.id}}</strong>
                </div>
            </div>
            <div class="info-item">
                <div class="icon-container">
                    <img :src="baseUrl + 'svgs/date.svg'" alt="Game date icon" class="icon">
                </div>
                <div class="info">
                    <span class="subtitle">Game date:</span>
                    <strong class="info-line date-info-line">{{previousGameInfo.gameDate}}</strong>
                </div>
            </div>
        </div>
        <div class="opener-container mobile">
            <div class="timer-container">
                <h1 class="subtitle-big">{{descriptionText}} in:</h1>
                <div class="timer-opener-container">
                    <div class="timer">
                        <span class="span-time">{{days}}</span> <span class="span-dots">:</span> <span class="span-time">{{hours}}</span> <span class="span-dots">:</span> <span class="span-time">{{minutes}}</span> <span class="span-dots">:</span> <span class="span-time">{{seconds}}</span>
                    </div>
                    <button @click="toggleGameInfo" ref="opener" class="opener">
                        <img src="@/assets/svg/arrowOpener.svg" alt="Arrow" class="arrow">
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.transition-class {
    transition: all .5s ease-in;
    .arrow {
        transition: all .5s ease-in;
    }
}

.open {
    @media only screen and (max-width: 850px) {
        transform: translate(-50%, 0) !important;

        .arrow {
            transform: rotate(-90deg) !important;
        }
    }
}

.close {
    @media only screen and (max-width: 850px) and (min-height: 600px),
    only screen and (max-width: 600px) {
        transform: translate(-50%, -39rem) !important;
    }
    
    @media only screen and (max-width: 850px) and (max-height: 600px) and (min-width: 600px) {
        transform: translate(-50%, -31rem) !important;
    }
}

.game-info {
    @include width-restriction;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background: radial-gradient(103.61% 103.61% at 17.68% -3.61%, rgba(0, 0, 0, 0.022) 0%, rgba(0, 0, 0, 0.05) 100%),
    radial-gradient(123.14% 123.14% at 13.09% -3.08%, rgba(236, 227, 255, 0.75) 0%, rgba(215, 197, 255, 0.75) 100%);
    box-shadow: 1.75rem 2.25rem 5rem rgba(0, 0, 0, 0.1);
    border-radius: 4rem 4rem 0 0;
    border: 1px solid #eee;
    z-index: 20000;
    backdrop-filter: blur(5px);
    padding: .5rem 5.5rem;

    @media only screen and (max-width: 1450px) {
        padding: .5rem 4rem;
    }

    @media only screen and (max-width: 1100px) {
        padding: .5rem 3.25rem;
    }

    @media only screen and (max-width: 850px) {
        bottom: auto;
        top: 0;
        border-radius: 0 0 4rem 4rem;
        padding: 3.5rem 5rem 2.5rem;
    }
  
    @media only screen and (max-width: 850px) and (min-height: 600px) {
        width: 66%;
    }
  
    @media only screen and (max-width: 750px) and (min-height: 600px) {
        width: 75%;
    }

    @media only screen and (max-width: 600px),
    only screen and (max-width: 850px) and (max-height: 600px) {
        width: 100%;
    }

    .opener-container {
        display: flex;
        align-items: flex-end;

        .timer-opener-container {
            display: flex;
            align-items: center;
            width: 100%;
        }
        .opener {
            @include flex-center;
            width: 4rem;
            height: 4rem;
            border-radius: 8px;
            background: linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), rgba(182, 179, 235, 0.7);
            padding-left: 1px;

            .arrow {
                transform: rotate(90deg);
            }
        }
    }

    .timer-container {
        text-align: center;

            @media only screen and (max-width: 850px) {
                width: 80%;
                margin: 0 auto;
            }

            @media only screen and (max-width: 500px) {
                width: 85%;
            }

            @media only screen and (max-width: 400px) {
                width: 95%;
            }

        .subtitle {
            display: inline-block;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-size: 1.4rem;
            margin-bottom: .5rem;
        }

        .subtitle-big {
            font-size: 3.5rem;
            text-transform: uppercase;
            margin-bottom: 2rem;
        }

        .timer {
            font-weight: 600;
            font-size: 3.25rem;
            white-space: nowrap;
            padding: .5rem 1.5rem;
            background: linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), rgba(182, 179, 235, 0.7);
            border-radius: 1.5rem;
            flex-grow: 1;

            @media only screen and (max-width: 1450px) {
                font-size: 2.9rem;
            }

            @media only screen and (max-width: 1350px) {
                font-size: 2.75rem;
            }

            @media only screen and (max-width: 850px) {
                margin-right: 1.5rem;
                border-radius: 8px;
            }

            .span-time {
                display: inline-block;
                width: 4.25rem;
            }

            .span-dots {
                padding: 0 1.5rem;

                @media only screen and (max-width: 1350px) {
                    padding: 0 1rem;
                }

                @media only screen and (max-width: 1100px) {
                    padding: 0 .85rem;
                }
            }
        }
    }

    .info-items {
        display: flex;
        align-items: center;
        justify-content: space-between;

        @media only screen and (max-width: 850px) {
            margin-bottom: 4rem;
        }
  
        @media only screen and (max-width: 850px) and (min-height: 600px),
        only screen and (max-width: 600px) {
            display: grid;
            grid-template-columns: repeat(2, 18.5rem);
            grid-auto-columns: 18.5rem;
            grid-column-gap: 4rem;
            grid-row-gap: 3rem;
            justify-content: center;
            align-items: stretch;
        }

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
                    width: 50%;
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

                .info-line {
                    font-size: 1.8rem;
                    font-weight: 600;
                    display: inline-block;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    max-width: 10rem;

                    @media only screen and (max-width: 850px) {
                        font-size: 2.2rem;
                        max-width: 13rem;
                    }
                }

                .date-info-line {
                    overflow: visible;
                }

                .amount-win-line {
                    max-width: 12rem;
                    overflow: visible;
                    display: flex;
                    align-items: flex-end;

                    span:first-of-type {
                        display: inline-block;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        max-width: 14rem;
                        margin-right: .4rem;
                    }
                }
            }
        }
    }
}
</style>