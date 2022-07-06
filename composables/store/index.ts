import { defineStore } from 'pinia';
import GameInfo from '../interfaces/gameInfo';
import User from '../interfaces/user';


interface State {
    baseUrl: string | boolean;
    navOpenIndicator: boolean;
    connectWindowOpenIndicator: boolean;
    previousGameInfo: GameInfo;
    myUser: User;
}

export const useBaseStore = defineStore({
    id: 'baseStore',
    
    state: (): State => ({
        baseUrl: import.meta.env.BASE_URL,
        navOpenIndicator: false,
        connectWindowOpenIndicator: false,
        previousGameInfo: {
            id: 'kj1k4k325jk235kp141k2lk',
            winnerNickname: 'Doly Menners',
            winAmountEth: 500,
            gameDate: '12.05.2022',
        },
        myUser: {
            id: 'ioi1oi1jdsfass2nk1j',
            nickname: 'Doly Menners',
            avatar: 'default',
            rank: 'Expert',
            balanceEth: 889.89,
            cryptoAddress: '2234h2i4j2ij2n2o4hifse232',
            totalWins: 8,
            totalMoneyWon: 1200,
            gamesPlayed: [
                'jjk1jl4kj1k24j14j1lkj',
                'jjk1jl4kj1k24j14j1lkj',
                'jjk1jl4kj1k24j14j1lkj',
                'jjk1jl4kj1k24j14j1lkj',
                'jjk1jl4kj1k24j14j1lkj',
                'jjk1jl4kj1k24j14j1lkj',
            ],
            achievements: {
                medal: true,
                starMedal: true,
                cup: true,
            },
        },
    }),

    actions: {
        navOpenIndicatorToFalse() {
            this.navOpenIndicator = false;
        },
        
        navOpenIndicatorToTrue() {
            this.navOpenIndicator = true;
        },
        
        connectWindowOpenIndicatorToFalse() {
            this.connectWindowOpenIndicator = false;
        },
        
        connectWindowOpenIndicatorToTrue() {
            this.connectWindowOpenIndicator = true;
        },
    }
})

export { useCurrentGameStore } from './currentGame';
export { useFaqStore } from './faq';
export { useGamesStore } from './games';
export { useUsersStore } from './users';
export { useLeaderboardStore } from './leaderboard';