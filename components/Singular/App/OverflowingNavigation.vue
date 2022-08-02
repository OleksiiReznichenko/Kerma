<script setup lang="ts">
import { storeToRefs } from 'pinia';

// NAV OPEN INDICATOR AND MY USER OBJECT
const baseStore = useBaseStore();
const { navOpenIndicator, myUser } = storeToRefs(baseStore);

// ROUTE INFO AND ROUTER
const route = useRoute();
const router = useRouter();

// PAGE NAME
const pageName = computed<string>(() => {
    if (myUser.value.id === route.params.id) {
        return 'Profile';
    }

    const routeFullPathLowerCase = route.fullPath.toString().toLowerCase();
    if (routeFullPathLowerCase.includes('users/')) {
        return 'User';
    }

    const routeNameLowerCase = route.name.toString().toLowerCase();
    if (routeNameLowerCase === 'index') {
        return 'Main';
    } else if (routeNameLowerCase === 'gamehistory') {
        return 'Game History';
    } else {
        return routeNameLowerCase;
    }
});

// IF NOT LOGGED IN - CLOSE NAVIGATION, GO TO GAME PAGE, OPEN CONNECT WINDOW
const goToConnectWindow = (): void => {
    baseStore.navOpenIndicatorToFalse();
    router.push('/game/');
    baseStore.connectWindowOpenIndicatorToTrue();
};

// REINIT VARIABLES ON WINDOW RESIZE EVENT ON DESKTOP
const onWindowResize = (): void => {
    if (window.outerWidth < 850) {
        baseStore.navOpenIndicatorToFalse();
    }
};

// CLOSE NAVIGATION ON ROUTE CHANGE
watch(route, () => {
    baseStore.navOpenIndicatorToFalse();
});

onMounted(() => {
    // ADD WINDOW EVENT LISTENER
    window.addEventListener('resize', onWindowResize);
});

onUnmounted(() => {
    // REMOVE WINDOW EVENT LISTENER
    window.removeEventListener('resize', onWindowResize);
});

</script>

<template>
    <div :class="{'opened': navOpenIndicator}" class="navigation-wrapper desktop">
        <div class="navigation">
            <div class="titles-container">
                <NuxtLink to="/" class="home-link">
                    <h1 class="title">Kerma's</h1>
                    <img src="@/assets/svg/arrow.svg" alt="Arrow" class="arrow">
                </NuxtLink>
                <strong class="current-page">{{pageName}} page</strong>
            </div>
            <div class="image-container">
                <img src="@/assets/svg/overflowingNavCircle.svg" alt="Nav circles" class="images-composition">
            </div>
            <div class="pages-links">
                <NuxtLink to="/game" class="page-link game-link">
                    <img src="@/assets/svg/activeNavItem.svg" alt="Active item background" class="active-background">
                    <img src="@/assets/svg/pauseWithTransparency.svg" alt="Game page icon" class="icon">
                </NuxtLink>
                <NuxtLink to="/gameHistory" class="page-link game-history-link">
                    <img src="@/assets/svg/activeNavItem.svg" alt="Active item background" class="active-background">
                    <img src="@/assets/svg/eyeWithTransparency.svg" alt="Game history icon" class="icon">
                </NuxtLink>
                <NuxtLink v-if="myUser.id" :to="'/users/' + myUser.id" class="page-link profile-link">
                    <img src="@/assets/svg/activeNavItem.svg" alt="Active item background" class="active-background">
                    <img src="@/assets/svg/userWithTransparency.svg" alt="Profile page icon" class="icon">
                </NuxtLink>
                <button v-else @click="goToConnectWindow" class="page-link profile-link">
                    <img src="@/assets/svg/activeNavItem.svg" alt="Active item background" class="active-background">
                    <img src="@/assets/svg/userWithTransparency.svg" alt="Profile page icon" class="icon">
                </button>
                <NuxtLink to="/leaderboard" class="page-link leaderboard-link">
                    <img src="@/assets/svg/activeNavItem.svg" alt="Active item background" class="active-background">
                    <img src="@/assets/svg/starWithTransparency.svg" alt="Leaderboard page icon" class="icon">
                </NuxtLink>
                <button @click="baseStore.navOpenIndicatorToFalse()" class="close-button">
                    <img src="@/assets/svg/activeNavItem.svg" alt="Active item background" class="active-background">
                    <img src="@/assets/svg/cross.svg" alt="Close icon" class="icon">
                </button>
            </div>
            <div class="pages-info-blocks">
                <div class="page-info-block game-info">
                    <h3 class="title">Game</h3>
                    <p>Place a bet and get a <br>chance to win</p>
                </div>
                <div class="page-info-block game-history-info">
                    <h3 class="title">Game History</h3>
                    <p>Learn more about <br> previous games</p>
                </div>
                <div class="page-info-block profile-info">
                    <h3 class="title">Profile</h3>
                    <p>Look at your game stats</p>
                </div>
                <div class="page-info-block leaderboard-info">
                    <h3 class="title">Leaderboard</h3>
                    <p>Look at the list of leaders</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.opened {
    visibility: visible !important;
    opacity: 1 !important;
    pointer-events: all !important;
}

.navigation-wrapper {
    @include flex-center;
    height: 100vh;
    min-height: var(--app-height);
    width: 100%;
    backdrop-filter: blur(20px);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100000;
    transition: opacity .5s, visibility .5s;
    visibility: hidden;
    opacity: 0;
    pointer-events: none;

    .navigation {
        position: relative;
        width: 120rem;

        .titles-container {
            @include flex-center;
            flex-direction: column;
            text-align: center;
            margin-bottom: -6rem;

            .home-link {
                @include flex-center;
                margin-bottom: 5rem;

                &:hover {
                    color: $color-pink-dark-3;
                }

                &:hover .arrow {
                    transform: translateX(2rem);
                }

                .title {
                    display: inline;
                    text-transform: uppercase;
                }

                .arrow {
                    width: 1.5rem;
                    margin-left: 1rem;
                    transition: all .3s;
                }
            }

            .current-page {
                font-weight: 600;
                font-size: 1.8rem;
                text-transform: uppercase;
                padding: .5rem 1rem;
                background-color: #c9c9f4;
                border-radius: 15px;
            }
        }

        .image-container {
            width: 100%;
            height: 100%;
            @include flex-center;
        }
        .images-composition {
            width: 80rem;
        }

        .pages-links {


            .page-link,
            .close-button {
                position: absolute;
                
                &:hover .active-background {
                    opacity: 1;
                }
                
                .icon {
                    position: absolute;
                }

                .active-background {
                    width: 16.75rem;
                    opacity: 0;
                    transition: all .2s;
                }
            }

            .close-button {
                top: 58%;
                left: 41.5%;
                clip-path: polygon(58% 0, -16% 90%, 132% 90%);

                .icon {
                    top: 47%;
                    left: 48.5%;
                    width: 3rem;

                    @media only screen and (max-width: 950px) and (min-height: 600px) {
                        left: 46%;
                    }
                }

                .active-background {
                    transform: rotate(-288deg);
                }
            }

            .game-link {
                top: 45.65%;
                left: 34.65%;
                clip-path: polygon(105% 41%, -23% 5%, 34% 125%);

                @media only screen and (max-width: 950px) and (min-height: 600px) {
                    left: 33.8%;
                }

                @media only screen and (max-width: 870px) and (min-height: 600px) {
                    left: 33.5%;
                }
                
                .icon {
                    top: 48%;
                    left: 47%;
                    width: 2rem;
                }

                .active-background {
                    transform: rotate(-216deg);
                }
            }

            .game-history-link {
                top: 29.65%;
                left: 38.85%;
                clip-path: polygon(76% -12%, -91% 45%, 76.25% 92%);

                @media only screen and (max-width: 950px) and (min-height: 600px) {
                    left: 38.25%;
                    top: 29%;
                }

                @media only screen and (max-width: 870px) and (min-height: 600px) {
                    left: 38.15%;
                }
                
                .icon {
                    top: 43%;
                    left: 29%;
                    width: 3.25rem;
                }

                .active-background {
                    transform: rotate(-144deg);
                }
            }

            .profile-link {
                top: 32.25%;
                right: 37.75%;
                clip-path: polygon(130% 50%, 10% -35%, 11% 83%);

                @media only screen and (max-width: 950px) and (min-height: 600px) {
                    right: 37%;
                    top: 31.5%;
                }

                @media only screen and (max-width: 870px) and (min-height: 600px) {
                    right: 36.75%;
                }
                
                .icon {
                    top: 32%;
                    right: 45%;
                    width: 2.5rem;
                }

                .active-background {
                    transform: rotate(-72deg);
                }
            }

            .leaderboard-link {
                top: 49.825%;
                right: 36.1%;
                top: 49.65%;
                right: 36.1%;
                clip-path: polygon(125% -8%, 0% 28%, 75% 118%);

                @media only screen and (max-width: 950px) and (min-height: 600px) {
                    right: 35.5%;
                    top: 49.5%;
                }

                @media only screen and (max-width: 870px) and (min-height: 600px) {
                    right: 35.2%;
                }
                
                .icon {
                    top: 32%;
                    right: 33%;
                    width: 3.25rem;
                }
            }
        }

        .pages-info-blocks {


            .page-info-block {
                position: absolute;
                background-color: rgba(#c9c9f4, .8);
                text-shadow: 1rem 1.5rem 2.25rem rgba(0, 0, 0, 0.05);
                border-radius: 15px;
                padding: 2rem 3rem;


                .title {
                    font-family: Inter;
                    font-weight: 900;
                    text-transform: uppercase;
                    margin-bottom: .85rem;
                }
            }

            .game-info {
                top: 65%;
                left: -2%;
                left: 0%;
                text-align: right;
                box-shadow: 2rem 1.25rem 2.25rem rgba(0, 0, 0, 0.05);

                @media only screen and (max-width: 1400px) {
                    left: 2%;
                }

                @media only screen and (max-width: 1100px) {
                    left: 5%;
                }

                @media only screen and (max-width: 1000px) {
                    left: 8%;
                }
            }

            .game-history-info {
                top: 20%;
                left: -3%;
                left: -1%;
                text-align: right;
                box-shadow: 2rem 1.25rem 2.25rem rgba(0, 0, 0, 0.05);

                @media only screen and (max-width: 1400px) {
                    left: 1%;
                }

                @media only screen and (max-width: 1100px) {
                    left: 4%;
                }

                @media only screen and (max-width: 1000px) {
                    left: 7%;
                }
            }

            .profile-info {
                top: 20%;
                right: -7%;
                right: -5%;
                text-align: left;
                box-shadow: -2rem 1.25rem 2.25rem rgba(0, 0, 0, 0.05);

                @media only screen and (max-width: 1400px) {
                    right: -3%;
                }

                @media only screen and (max-width: 1100px) {
                    right: 0;
                }

                @media only screen and (max-width: 1000px) {
                    right: 3%;
                }
            }

            .leaderboard-info {
                top: 65.5%;
                right: -3%;
                right: -1%;
                text-align: left;
                box-shadow: -2rem 1.25rem 2.25rem rgba(0, 0, 0, 0.05);

                @media only screen and (max-width: 1400px) {
                    right: 1%;
                }

                @media only screen and (max-width: 1100px) {
                    right: 4%;
                }

                @media only screen and (max-width: 1000px) {
                    right: 7%;
                }
            }
        }
    }
}
</style>