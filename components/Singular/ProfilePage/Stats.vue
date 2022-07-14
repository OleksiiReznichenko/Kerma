<script setup lang="ts">
import UserStat from '@/composables/interfaces/userStat';

interface Props {
    gamesPlayed: number;
    totalWins: number;
    totalMoneyWon: number;
    isMyProfile: boolean;
}

const props = defineProps<Props>();

// STATS ARRAY
const stats: UserStat[] = [
    {
        icon: 'playedMatches.png',
        subtitle: 'Matches Played',
        stat: props.gamesPlayed,
    },
    {
        icon: 'cup.png',
        subtitle: 'Total Wins',
        stat: props.totalWins,
    },
    {
        icon: 'coins.png',
        subtitle: 'Winning',
        stat: props.totalMoneyWon.toFixed(0) + '$',
    },
];

// TITLE TEXT
const title = computed(() => {
    if (!props.isMyProfile) {
        return 'User\'s Stats';
    } else {
        return 'Your Stats';
    }
});

</script>

<template>
    <div class="stats-container">
        <div class="stats-header mobile">
            <div class="small-title-container">
                <img src="@/assets/svg/star.svg" alt="Star" class="star">
                <h4 class="small-title">Stats</h4>
            </div>
            <div class="dot">-</div>
        </div>
        <div class="stats">
            <h1 class="title">{{title}}</h1>
                <ReusableUserPageStat 
                    v-for="(stat, i) in stats"
                    :key="i"
                    :icon="stat.icon"
                    :subtitle="stat.subtitle"
                    :stat="stat.stat"
                />
        </div>
    </div>
</template>

<style lang="scss" scoped>

.stats-container {
    position: relative;
    z-index: 100;
        
    @media only screen and (max-width: 850px) {
        background: linear-gradient(45deg, #E9DFF8, #e8ddff);
        border-radius: 4rem;
        padding: 4rem 4rem 7rem;
        box-shadow: 1.5rem 1.75rem 2.5rem rgba(0, 0, 0, 0.1);
    }

    .stats-header {
        font-family: Panton;
        font-weight: 900;
        font-size: 2.8rem;
        line-height: 1;

        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 4rem;

        .small-title-container {
            display: flex;
            align-items: flex-end;

            .star {
                width: 3.5rem;
                margin-right: 2.5rem;
            }

            .small-title {
                text-transform: uppercase;
            }
        }
    }
    
    .stats {
        @include flex-center;
        
        @media only screen and (max-width: 850px) {
            display: grid;
            grid-template-columns: repeat(2, 25rem);
            grid-auto-columns: 25rem;
            justify-items: center;
            grid-row-gap: 5rem;
            grid-column-gap: 3rem;
        }
        
        @media only screen and (max-width: 450px) {
            grid-template-columns: repeat(2, 22rem);
            grid-auto-columns: 22rem;
            grid-row-gap: 4.25rem;
            grid-column-gap: 2rem;
        }

        .title {
            font-size: 7.5rem;
            line-height: 1.05;
            width: 20rem;
            margin-right: 4rem;
        
            @media only screen and (max-width: 850px) {
                margin-right: 0;
            }
        
            @media only screen and (max-width: 450px) {
                font-size: 6.5rem;
            }
        }
    }
}
</style>