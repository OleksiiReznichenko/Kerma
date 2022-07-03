<script setup lang="ts">
import { storeToRefs } from "pinia";
import User from "@/composables/interfaces/user";

// PLAYED GAMES
const leaderboardStore = useLeaderboardStore();
const { leaderboard } = storeToRefs(leaderboardStore);

// USERS STORE
const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);

// FIND LEADERBOARD USERS AND SORT IT BY 
const leaderboardUsers: User[] = leaderboard.value.map(leaderId => {
    return users.value.find(user => {
        return user.id === leaderId;
    })
}).sort((a, b) => {
    return b.balanceEth - a.balanceEth;
});


console.log(leaderboardUsers);
</script>

<template>
    <div class="info">
        <h1 class="title">Leaderboard</h1>
        <div class="leaderboard">
            <ReusableLeaderboardPageItem
                v-for="(user, i) in leaderboardUsers"
                :key="user.id"
                :index="i"
                :id="user.id"
                :nickname="user.nickname"
                :avatar="user.avatar"
                :rank="user.rank"
                :balance-eth="user.balanceEth"
                :crypto-address="user.cryptoAddress"
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