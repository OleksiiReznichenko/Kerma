import { defineStore } from 'pinia';
import GameInfo from '../interfaces/gameInfo';
import User from '../interfaces/user';


interface State {
    baseUrl: string | boolean;
    navOpenIndicator: boolean;
    connectWindowOpenIndicator: boolean;
    isStepsOpenIndicator: boolean;
    isChatOpenIndicator: boolean;
    previousGameInfo: GameInfo;
    myUser: User;
}

export const useBaseStore = defineStore({
    id: 'baseStore',
    
    state: (): State => ({
        baseUrl: import.meta.env.BASE_URL,
        navOpenIndicator: false,
        connectWindowOpenIndicator: false,
        isStepsOpenIndicator: false,
        isChatOpenIndicator: false,
        previousGameInfo: {
            id: 'kj1k4k325jk235kp141k2lk',
            winnerNickname: 'Doly Menners',
            winAmountEth: 500,
            gameDate: '12.05.2022',
        },
        myUser: {
            id: '',
            nickname: '',
            avatar: '',
            rank: '',
            balanceEth: 0,
            cryptoAddress: '',
            totalWins: 0,
            totalMoneyWon: 0,
            gamesPlayed: [],
            achievements: {
                medal: false,
                starMedal: false,
                cup: false,
            },
        },
    }),

    actions: {
        addMyUser(myUser: User) {
            this.myUser = myUser;
        },

        updateBalance(withdrawnAmount: number) {
            this.myUser.balanceEth -= withdrawnAmount;
        },

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
        
        isStepsOpenIndicatorToFalse() {
            this.isStepsOpenIndicator = false;
        },
        
        isStepsOpenIndicatorToTrue() {
            this.isStepsOpenIndicator = true;
        },
        
        isChatOpenIndicatorToFalse() {
            this.isChatOpenIndicator = false;
        },
        
        isChatOpenIndicatorToTrue() {
            this.isChatOpenIndicator = true;
        },
    }
})

export { useCurrentGameStore } from './currentGame';
export { useFaqStore } from './faq';
export { useGamesStore } from './games';
export { useUsersStore } from './users';
export { useLeaderboardStore } from './leaderboard';
export { useChatStore } from './chat';