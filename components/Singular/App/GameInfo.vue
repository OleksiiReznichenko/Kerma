<script setup lang="ts">
// DOM
const gameInfo = ref<HTMLElement | null>(null);
const opener = ref<HTMLElement | null>(null);

// INDICATORS FOR CLASSES
let isOpen = ref<boolean>(false);
let addTransitionClass = ref<boolean>(false);

// TIMER DATA
let dateInterval: ReturnType<typeof setInterval> | null = null;
let dayToCount = ref<number>(1);
const dateToCount = ref<string>(`July ${dayToCount.value}, 2022 17:00:00`);
const days = ref<string | number>('00');
const hours = ref<string | number>('00');
const minutes = ref<string | number>('00');
const seconds = ref<string | number>('00');

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

// TIMER FUNCTIONALITY
const timerInit = (): void => {
    const timeToCount: number = new Date(dateToCount.value).getTime();
    const now: number = new Date().getTime();
    const timeLeft: number = timeToCount - now;

    if (timeLeft <= 0) {
        dayToCount.value++;
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
};

onMounted(() => {
    // TIMER INTERVAL
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
        <SingularAppSocials class="mobile socials-game-info" />
        <div class="info-items">
            <ReusableGameInfoItem 
                :is-icon="true"
                icon-path="24h.svg" 
                icon-alt="Last winner" 
                subtitle="Last winner"
                info-text="Lolipopo7"
            />
            <ReusableGameInfoItem 
                :is-icon="true"
                icon-path="bank.svg" 
                icon-alt="Amount win" 
                subtitle="Amount win"
                info-text="54 ETH"
            />
            <div class="timer-container desktop">
                <strong class="subtitle">Next game in:</strong>
                <div class="timer">
                    <span class="span-time">{{days}}</span> <span class="span-dots">:</span> <span class="span-time">{{hours}}</span> <span class="span-dots">:</span> <span class="span-time">{{minutes}}</span> <span class="span-dots">:</span> <span class="span-time">{{seconds}}</span>
                </div>
            </div>
            <ReusableGameInfoItem 
                :is-icon="false"
                text-icon="ID"
                subtitle="Game ID"
                info-text="#321"
            />
            <ReusableGameInfoItem 
                :is-icon="true"
                icon-path="date.svg" 
                icon-alt="Game date" 
                subtitle="Game date"
                info-text="12.12.2022"
            />
        </div>
        <div class="opener-container mobile">
            <div class="timer-container">
                <h1 class="subtitle-big">Next game in:</h1>
                <div class="timer-opener-container">
                    <div class="timer">
                        <span class="span-time">{{days}}</span> <span class="span-dots">:</span> <span class="span-time">{{hours}}</span> <span class="span-dots">:</span> <span class="span-time">{{minutes}}</span> <span class="span-dots">:</span> <span class="span-time">{{seconds}}</span>
                    </div>
                    <button @click="toggleGameInfo" ref="opener" class="opener">
                        <img src="@/assets/svg/arrowopener.svg" alt="Arrow" class="arrow">
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
        transform: translate(-50%, -33rem) !important;
    }

    @media only screen and (max-width: 680px) and (min-width: 600px) {
        transform: translate(-50%, -34rem) !important;
    }
    
    @media only screen and (max-width: 850px) and (max-height: 600px) and (min-width: 600px) {
        transform: translate(-50%, -25rem) !important;
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
    z-index: 1000;
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
        padding: 4.5rem 5rem 2.5rem;
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

    .btn-connect-wallet {
        background-color: $color-grey;
        text-transform: uppercase;
        padding: 1rem 6.5rem;

        &:hover {
            background-color: white;
            color: $color-grey;
        }

        @media only screen and (max-width: 1100px) {
            padding: 1rem 5.5rem;
        }
    }

    .info-items {
        display: flex;
        align-items: center;
        justify-content: space-between;

        @media only screen and (max-width: 850px) {
            margin-bottom: 4rem;
            margin-top: 8rem;
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
    }
}
</style>