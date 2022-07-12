<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { Ref } from 'vue';
import Bet from '@/composables/interfaces/bet';
import User from '@/composables/interfaces/user';

const { $notifySuccess } = useNuxtApp();

// CURRENT GAME OBJECT
const currentGameStore = useCurrentGameStore();
const { currentGame } = storeToRefs(currentGameStore);

// USERS ARRAY
const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);

// USERS ARRAY
const baseStore = useBaseStore();
const { myUser, nextGameDate } = storeToRefs(baseStore);

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

watch(nextGameDate.value, () => {
    if (bets.value.length > 0) {
        $notifySuccess(`${highestBetUser.value.nickname} won ${prizeFund.value.toFixed(5)} ETH`);
        usersStore.updateBalance(highestBet.value.userId, 'add', currentGame.value.prizeFund);
        if (myUserId.value === highestBet.value.userId) {
            baseStore.updateBalance('add', currentGame.value.prizeFund);
        }
        currentGame.value.bets = [];
        currentGame.value.prizeFund = 0.00000;
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
        <SingularGameChat />
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