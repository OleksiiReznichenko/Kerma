<script setup lang="ts">
import UserAchievements from '@/composables/interfaces/userAchievements';
import UserAchievement from '@/composables/interfaces/userAchievement';

interface Props {
    nickname:  string;
    avatar: string;
    balanceEth: number;
    achievements: UserAchievements;
    isMyProfile: boolean;
}

const props = defineProps<Props>();

// GET BASE URL
const baseUrl = useBaseStore().baseUrl;

// ACHIEVEMENTS ARRAY
const achievements = ref<UserAchievement[]>([]);

// ADD ACHIEVEMENTS TO ACHIEVEMENTS ARRAY
if (props.achievements.medal) {
    achievements.value.push({
        icon: 'circleMedal.svg',
        title: 'Super star',
        description: 'Received more than 100 positive reviews'
    });
}

if (props.achievements.starMedal) {
    achievements.value.push({
        icon: 'starMedal.svg',
        title: 'VIP',
        description: 'Good player'
    });
}

if (props.achievements.cup) {
    achievements.value.push({
        icon: 'cup.svg',
        title: 'Premium',
        description: 'Really experienced played'
    });
}


// IS DEFAULT AVTAR INDICATOR
const isDefaultAvatar = computed<boolean>(() => {
    if (props.avatar === 'default') {
        return true;
    } else {
        return false;
    }
});

// CLICKED ACHIEVEMENT BUTTON
let prevButton = ref<HTMLElement | null>(null);

// TOGGLE ACHIEVEMENT DROPDOWN
const toggleAchievementDropdown = (event: Event): void => {
    const target = event.target as HTMLElement;
    console.log(target);

    if (!target.classList.contains('achievement-button') &&
    !target.classList.contains('achievement-icon')) return;
    let achievementButton: HTMLElement;

    if (target.classList.contains('achievement-button')) {
        achievementButton = target;
    } else {
        achievementButton = target.parentElement;
    }

    achievementButton.classList.toggle('opened');

    if (prevButton.value !== achievementButton) {
        prevButton.value?.classList.remove('opened');
        prevButton.value = achievementButton;
    }
}

// CLOSE ACHIEVEMENT DROPDOWN ON WINDOW RESIZE
const onWindowClick = (event: Event): void => {
    const target = event.target as HTMLElement;

    if (target.classList.contains('achievement-button') ||
    target.classList.contains('achievement-icon') || !prevButton.value?.classList.contains('opened')) return;
    prevButton.value?.classList.remove('opened');
}

onMounted(() => {
    // ADD WINDOW EVENT LISTENER
    window.addEventListener('click', onWindowClick);
});

onUnmounted(() => {
    // REMOVE WINDOW EVENT LISTENER
    window.removeEventListener('click', onWindowClick);
});
</script>

<template>
    <div class="header">
        <img src="@/assets/img/profileCharacter.png" alt="Character" class="character desktop">
        <div class="background-images mobile">
            <img src="@/assets/img/mobileProfileCharacterLeft.png" alt="Character" class="character character-left">
            <img src="@/assets/img/mobileProfileCharacterRight.png" alt="Character" class="character character-right">
        </div>
        <div class="info-container">
            <img v-if="isDefaultAvatar" :src="baseUrl + 'imgs/defaultAvatar.png'" alt="Avatar" class="avatar">
            <img v-else :src="avatar" alt="Avatar" class="avatar">
            <div class="info">
                <h1 class="nickname mobile">{{nickname}}</h1>
                <div @click="toggleAchievementDropdown" class="achievements">
                    <ReusableUserPageAchievement 
                        v-for="(achievement, i) in achievements"
                        :key="i"
                        :icon="achievement.icon"
                        :title="achievement.title"
                        :description="achievement.description"
                    />
                </div>
                <h1 class="nickname desktop">{{nickname}}</h1>

                <strong class="balance-gradient-container for-desktop" v-if="isMyProfile">
                    <span class="for-desktop">{{balanceEth.toFixed(4)}} ETH / {{(balanceEth * 10).toFixed(2)}} $</span>
                </strong>

                <strong class="balance-gradient-container for-mobile" v-if="isMyProfile">
                    <span class="for-mobile">{{balanceEth.toFixed(4)}} ETH</span>
                </strong>
                <strong class="balance-gradient-container for-mobile" v-if="isMyProfile">
                    <span class="for-mobile">{{(balanceEth * 10).toFixed(2)}} $</span>
                </strong>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header {
    background: radial-gradient(124.5% 142.12% at -43.52% -39.92%, #FDF7FF 0%, #e0d2ff 100%), #FFFFFF;
    border-radius: 4rem;
    width: 100%;
    position: relative;
    z-index: 100;
    @include flex-center;
    align-items: flex-start;
    text-align: center;
    padding-bottom: 5rem;
    margin-top: 16rem;
    margin-bottom: 9.5rem;
    
    @media only screen and (max-width: 850px) {
        margin-top: 0 !important;
        text-align: left;
        padding: 15rem 3rem 5rem;
        background: linear-gradient(45deg, #E9DFF8, #e8ddff);
        // overflow: hidden;
        margin-bottom: 4rem;
        box-shadow: 1.5rem 1.75rem 2.5rem rgba(0, 0, 0, 0.1);
    }

    .character {
        position: absolute;
        bottom: 0;
        left: .5rem;
        width: 40rem;
    
        @media only screen and (max-width: 850px) {
            left: auto;
            width: auto;
        }
    }

    .background-images {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 4rem;
        overflow: hidden;
    }

    .character-left {
        left: .5rem;
        width: 20rem;
    }

    .character-right {
        left: auto;
        right: 0;
        width: 20rem;
    }

    .info-container {
        position: relative;
        z-index: 100;
    
        @media only screen and (max-width: 850px) {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .avatar {
            border: 1rem solid white;
            border-radius: 100%;
            width: 15rem;
            height: 15rem;
            box-shadow: 1rem 1.75rem 2.5rem rgba(147, 105, 160, 0.3);
            margin-top: -7rem;
            margin-bottom: 2rem;

            @media only screen and (max-width: 850px) {
                width: 16rem;
                height: 16rem;
                margin-bottom: 0;
                margin-top: 0;
                margin-right: 3rem;
            }
        }

        .nickname {
            color: $color-pink-dark-3;
            font-size: 5rem;

            @media only screen and (max-width: 850px) {
                line-height: 1;
                color: white;
                font-size: 4.5rem;
                margin-bottom: 1.75rem;
            }
        }

        .balance-gradient-container {
            margin-top: 1.5rem;
            

            @media only screen and (max-width: 850px) {
                margin-top: 2rem;
                padding: .5rem 2.25rem;
            }

            @media only screen and (max-width: 500px) {
                margin-right: 1rem;

                &:last-of-type {
                    margin-top: 1rem;
                }
            }
        }

        .for-desktop {
            @media only screen and (max-width: 500px) {
                display: none;
            }
        }

        .for-mobile {
            @media only screen and (min-width: 500px) {
                display: none;
            }
        }

        .achievements {
            display: flex;
            justify-content: center;

            @media only screen and (max-width: 850px) {
                justify-content: flex-start;
            }

            .opened {
                ::v-deep .achievement-dropdown {
                    opacity: 1 !important;
                    visibility: visible !important;
                }
            }
        }
    }
}
</style>