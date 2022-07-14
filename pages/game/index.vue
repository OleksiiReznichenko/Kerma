<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { Ref } from 'vue';
import Bet from '@/composables/interfaces/bet';
import User from '@/composables/interfaces/user';
import Game from '~~/composables/interfaces/game';
import GameInfo from '~~/composables/interfaces/gameInfo';

const { $notifySuccess } = useNuxtApp();

// CURRENT GAME OBJECT
const currentGameStore = useCurrentGameStore();
const { currentGame } = storeToRefs(currentGameStore);

// USERS ARRAY
const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);

const gamesStore = useGamesStore();

// USERS ARRAY
const baseStore = useBaseStore();
const { myUser, nextGameDate, isFullscreenChat } = storeToRefs(baseStore);

// MY USER'S BALANCE
let myUserBalance = computed<number>(() => {
    return myUser.value.balanceEth;
});

// MY USER'S ID
let myUserId = computed<string>(() => {
    return myUser.value.id;
});

// CURRENT GAME BETS
let bets = computed<Bet[] | undefined[]>(() => {
    return currentGame.value.bets;
});

// CURRENT GAME PRIZE FUND
let prizeFund = computed<number>(() => {
    return currentGame.value.prizeFund;
});

// CURRENT GAME HIGHEST BET
let highestBet = computed<Bet | undefined>(() => {
    if (!bets.value[0]) return;
    return bets.value[0];
});

// CURRENT GAME HIGHEST BET USER
let highestBetAmount = computed<number | undefined>(() => {
    if (!highestBet.value) return;
    return highestBet.value.betAmountEth;
});

// CURRENT GAME HIGHEST BET USER
let highestBetUser = computed<User | undefined>(() => {
    if (!highestBet.value) return;
    return users.value.find(user => {
        return user.id === highestBet.value.userId;
    })
});

// CURRENT GAME HIGHEST BET USER
let highestBetUserAvatar = computed<string | undefined>(() => {
    if (!highestBet.value) return;
    return highestBetUser.value.avatar;
});

// CURRENT GAME BETS USERS ARRAY
let betsUsers = computed<User[] | undefined[]>(() => {
    if (!highestBet.value) return;
    return bets.value.map(bet => {
        return users.value.find(user => {
            return user.id === bet.userId;
        })
    })
});

// GET DATE FOR THE END OF EVERY GAME
const getDate = (dateType: 'short' | 'full'): string => {
    const date = new Date();
    const year = date.getFullYear();
    let month: number | string = date.getMonth() + 1;
    let day: number | string = date.getDate();
    let hours: number | string = date.getHours();
    let minutes: number | string = date.getMinutes();

    if (+month < 10) {
        month = '0' + month;
    }

    if (+day < 10) {
        day = '0' + day;
    }

    if (+hours < 10) {
        hours = '0' + hours;
    }

    if (+minutes < 10) {
        minutes = '0' + minutes;
    }

    if (dateType === 'short') {
        return `${day}.${month}, ${hours}:${minutes}`;
    } else if (dateType === 'full') {
        return `${day}.${month}.${year} || ${hours}:${minutes}`;
    }
};

// END PREVIOUS GAME AND BEGIN NEW GAME ON NEXT GAME DATE CHANGE
watch(nextGameDate.value, () => {
    if (bets.value.length > 0) {
        $notifySuccess(`${highestBetUser.value.nickname} won ${prizeFund.value.toFixed(5)} ETH`);
        
        usersStore.updateBalance(highestBet.value.userId, 'add', currentGame.value.prizeFund);
        usersStore.updateWins(highestBet.value.userId);
        usersStore.updateGamesPlayed(highestBet.value.userId, currentGame.value.id);
        usersStore.updateMoneyWon(highestBet.value.userId, currentGame.value.prizeFund * 10);

        if (myUserId.value === highestBet.value.userId) {
            baseStore.updateBalance('add', currentGame.value.prizeFund);
            baseStore.updateWins();
            baseStore.updateGamesPlayed(currentGame.value.id);
            baseStore.updateMoneyWon(currentGame.value.prizeFund * 10);
        }

        const gameObject: Game = {
            id: currentGame.value.id,
            winnerId: highestBet.value.userId,
            winnerBetId: highestBet.value.id,
            winAmountEth: currentGame.value.prizeFund,
            gameDate: getDate('full'),
            bets: currentGame.value.bets,
        };
        gamesStore.addGameToHistory(gameObject);

        const gameInfoObject: GameInfo = {
            id: currentGame.value.id,
            winnerNickname: highestBetUser.value.nickname,
            winAmountEth: currentGame.value.prizeFund,
            gameDate: getDate('short'),
        };
        baseStore.updatePrevGameInfo(gameInfoObject);

        currentGame.value.id = (Math.random() * Date.now()).toString();
        currentGame.value.prizeFund = 0.00000;
        currentGame.value.gameDate = '';
        currentGame.value.bets = [];
    }
})


// PROVIDE MY USER'S BALANCE TO DONATE.VUE AND PLACEBET.VUE
provide<Ref<number>>('myUserBalance', myUserBalance);

// PROVIDE CURRENT GAME PRIZE FUND TO MAININFO.VUE
provide<Ref<number>>('prizeFund', prizeFund);

// PROVIDE CURRENT GAME HIGHEST BET TO PLACEBET.VUE
provide<Ref<Bet | undefined>>('highestBet', highestBet);

// PROVIDE CURRENT GAME BETS TO MAININFO.VUE
provide<Ref<Bet[] | undefined[]>>('bets', bets);

// PROVIDE CURRENT GAME BETS USERS TO MAININFO.VUE
provide<Ref<User[] | undefined[]>>('betsUsers', betsUsers);

// PROVIDE CURRENT GAME BETS USERS TO MAININFO.VUE AND PLACEBET.VUE
provide<Ref<string>>('myUserId', myUserId);

</script>

<template>
    <div class="page game">
        <SingularGameConnectWalletWindow />
        <SingularGameConnectSteps class="mobile" />
        <div class="relative-container">
            <SingularGameGamingCircle
                :prize-fund="currentGame.prizeFund"
                :highest-bet-amount="highestBetAmount"
                :highest-bet-user-avatar="highestBetUserAvatar"
            />
            <SingularGameMainContent />
            <Reusable3DModel page="game" />
        </div>
        <SingularGameChat v-if="!isFullscreenChat" />
        <ReusableGameChatButton class="mobile" />
    </div>
</template>

<style lang="scss" scoped>
.page,
.relative-container {
    min-height: calc(100vh - 12rem);
}

.relative-container {
    z-index: 500 !important;
    
    @media only screen and (max-width: 1200px) and (min-height: 750px) and (min-width: 850px) {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
}
.relative-container {
    position: relative;
    z-index: 100;
}
</style>