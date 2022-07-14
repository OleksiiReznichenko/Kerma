<script setup lang="ts">
import { storeToRefs } from "pinia";
import User from "@/composables/interfaces/user";

// PLAYED GAMES
const gamesStore = useGamesStore();
const { games } = storeToRefs(gamesStore);

// USERS STORE
const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);

// FIND LEADERBOARD USERS AND SORT IT BY 
const winners: User[] = games.value.map(game => {
    return users.value.find(user => {
        return user.id === game.winnerId;
    })
});

// OPEN DETAILS WINDOW FUNCTION AND UPDATE ACTIVE GAME ID FOR DETAILS WINDOW FUNCTION
const baseStore = useBaseStore();
const openWindow = baseStore.gameDetailsWindowOpenIndicatorToTrue;
const updateActiveGameId = baseStore.updateActiveGameDetailsWindowId;

// OPEN DETAILS WINDOW ON BUTTON CLICK
const openWindowOnClick = (event: Event): void => {
    const target = event.target as HTMLElement;
    if (!target.classList.contains('button-open-window')) return;
    openWindow();
    updateActiveGameId(target.dataset.gameId);
};

</script>

<template>
    <div class="info">
        <h1 class="title">Game History</h1>
        <div @click="openWindowOnClick" class="games">
            <ReusableGame
                v-for="(game, i) in games"
                :key="game.id"
                :id="game.id"
                :winner-nickname="winners[i].nickname"
                :winner-avatar="winners[i].avatar"
                :winner-bet-id="game.winnerBetId"
                :win-amount-eth="game.winAmountEth"
                :game-date="game.gameDate"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.info {
    position: relative;
    z-index: 100;
    text-align: center;
    width: 100%;

    .title {
        color: $color-pink-light-4;
        text-transform: uppercase;
        font-size: 3.5rem;
        margin-bottom: 4rem;

        @media only screen and (max-width: 850px) {
           color: white;
           font-size: 4.5rem;
        }
    }

    .games {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-auto-columns: 1fr;
        grid-row-gap: 6rem;
        grid-column-gap: 4rem;

        @media only screen and (max-width: 850px) {
            justify-content: center;
            grid-template-columns: repeat(2, 1fr);
        }

        @media only screen and (max-width: 500px) {
            grid-template-columns: 32rem;
        }
    }
}
</style>