import { defineStore } from 'pinia';
import GameInfo from '../interfaces/gameInfo';
import User from '../interfaces/user';

interface NextGameDate {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
}

interface State {
    baseUrl: string | boolean;
    navOpenIndicator: boolean;
    connectWindowOpenIndicator: boolean;
    isStepsOpenIndicator: boolean;
    isChatOpenIndicator: boolean;
    gameDetailsWindowOpenIndicator: boolean;
    activeGameDetailsWindowId: string;
    isMobile: boolean;
    isFullscreenChat: boolean;
    isNewBetPlaced: boolean;
    gameState: 'started' | 'progress' | 'ended';
    timeBetweenGamesMs: number;
    triggerAnimation: null | 'rotation' | 'position';
    triggerAnimationIndicator: boolean;
    nextGameDate: NextGameDate;
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

        gameDetailsWindowOpenIndicator: false,
        
        activeGameDetailsWindowId: '',

        isMobile: false,

        isFullscreenChat: false,

        isNewBetPlaced: false,

        gameState: 'progress',

        timeBetweenGamesMs: 10000,

        triggerAnimation: 'position',

        triggerAnimationIndicator: false,

        nextGameDate: {
            year: 2022,
            month: 8,
            day: 15,
            hour: 17,
            minute: 35,
            second: 0,
        },

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

        updateBalance(action: 'add' | 'subtract', amount: number) {
            if (action === 'add') {
                this.myUser.balanceEth += amount;
            } else if (action === 'subtract') {
                this.myUser.balanceEth -= amount;
            }
        },

        updateWins() {
            this.myUser.totalWins += 1;
        },

        updateGamesPlayed(gameId: string) {
            this.myUser.gamesPlayed.push(gameId);
        },

        updateMoneyWon(amount: number) {
            this.myUser.totalMoneyWon += amount;
        },

        updateActiveGameDetailsWindowId(gameId: string) {
            this.activeGameDetailsWindowId = gameId;
        },

        updatePrevGameInfo(previousGameInfo: GameInfo) {
            this.previousGameInfo = previousGameInfo;
        },

        isMobileToFalse() {
            this.isMobile = false;
        },
        
        isMobileToTrue() {
            this.isMobile = true;
        },

        isFullscreenChatToFalse() {
            this.isFullscreenChat = false;
        },
        
        isFullscreenChatToTrue() {
            this.isFullscreenChat = true;
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
        
        gameDetailsWindowOpenIndicatorToFalse() {
            this.gameDetailsWindowOpenIndicator = false;
        },
        
        gameDetailsWindowOpenIndicatorToTrue() {
            this.gameDetailsWindowOpenIndicator = true;
        },
        
        isNewBetPlacedToFalse() {
            this.isNewBetPlaced = false;
        },
        
        isNewBetPlacedToTrue() {
            this.isNewBetPlaced = true;
        },
    }
})

export { useCurrentGameStore } from './currentGame';
export { useFaqStore } from './faq';
export { useGamesStore } from './games';
export { useUsersStore } from './users';
export { useLeaderboardStore } from './leaderboard';
export { useChatStore } from './chat';