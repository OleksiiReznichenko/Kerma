<script setup lang="ts">
import { storeToRefs } from 'pinia';
import User from '@/composables/interfaces/user';

// ROUTE
const route = useRoute();

// MY USER OBJECT
const baseStore = useBaseStore();
const { myUser } = storeToRefs(baseStore);

// USER
let user = ref<User | null>(null);
let isMyProfile = ref<boolean>(false);

if (myUser.value.id !== route.params.id) {
    // USERS STORE
    const usersStore = useUsersStore();
    const { users } = storeToRefs(usersStore);

    // FIND USER
    user.value = users.value.find(user => {
        return user.id === route.params.id;
    })
} else {
    isMyProfile.value = true;
    user.value = myUser.value;
}

// ERROR TITLE
const title: string = 'This user was not found';

// ERROR PARAGRAPH
const paragraph: string = "This user doesn't exist";

</script>

<template>
    <div :class="{'page': user}" class="game-history">
        <main v-if="user">
            <SingularProfilePageHeader
                :nickname="user.nickname"
                :avatar="user.avatar"
                :balance-eth="user.balanceEth"
                :achievements="user.achievements"
                :is-my-profile="isMyProfile"
            />
            <SingularProfilePageStats
                :games-played="user.gamesPlayed.length"
                :total-wins="user.totalWins"
                :total-money-won="user.totalMoneyWon"
                :is-my-profile="isMyProfile"
            />
        </main>
        <main v-else>
            <ReusableErrorPage 
                :title="title"
                :paragraph="paragraph"
            />
        </main>
    </div>
</template>

<style lang="scss" scoped>
.page {
    @media only screen and (max-width: 850px) {
        margin-top: 0 !important;
    }
    
    @media only screen and (max-width: 600px) {
        width: 100%;
    }
}
</style>