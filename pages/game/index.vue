<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { Ref } from 'vue';
import Bet from '@/composables/interfaces/bet';
import User from '@/composables/interfaces/user';

// CURRENT GAME OBJECT
const currentGameStore = useCurrentGameStore();
const { currentGame } = storeToRefs(currentGameStore);

// USERS ARRAY
const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);

// USERS ARRAY
const baseStore = useBaseStore();
const { myUser } = storeToRefs(baseStore);

// MY USER'S BALANCE
let myUserBalance = ref<number>(myUser.value.balanceEth);

// MY USER'S ID
let myUserId = ref<string>(myUser.value.id);

watch(myUser, () => {
    myUserBalance.value = myUser.value.balanceEth;
    myUserId.value = myUser.value.id;
})

// CURRENT GAME PRIZE FUND
const prizeFund = ref<number>(currentGame.value.prizeFund);

// CURRENT GAME BETS
const bets = ref<Bet[]>(currentGame.value.bets);

// CURRENT GAME HIGHEST BET
const highestBet = ref<Bet>(bets.value[0]);

// CURRENT GAME HIGHEST BET USER
const highestBetUser = computed<User>(() => {
    return users.value.find(user => {
        return user.id === highestBet.value.userId;
    })
});

// CURRENT GAME BETS USERS ARRAY
const betsUsers = computed<User[]>(() => {
    return bets.value.map(bet => {
        return users.value.find(user => {
            return user.id === bet.userId;
        })
    })
});

// PROVIDE MY USER'S BALANCE TO DONATE.VUE
provide<Ref<number>>('myUserBalance', myUserBalance);

// PROVIDE CURRENT GAME PRIZE FUND TO MAININFO.VUE
provide<Ref<number>>('prizeFund', prizeFund);

// PROVIDE CURRENT GAME BETS TO MAININFO.VUE
provide<Ref<Bet[]>>('bets', bets);

// PROVIDE CURRENT GAME BETS USERS TO MAININFO.VUE
provide<Ref<User[]>>('betsUsers', betsUsers);

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
                :highest-bet-amount="highestBet.betAmountEth"
                :highest-bet-user-avatar="highestBetUser.avatar"
            />
            <SingularGameMainContent />
        </div>
        <SingularGameChat />
        <ReusableChatButton class="mobile" />
    </div>
</template>

<style lang="scss" scoped>
.page,
.relative-container {
    min-height: calc(100vh - 12rem);
}

.relative-container {
    
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