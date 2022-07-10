import {defineStore} from 'pinia';
import Bet from '../interfaces/bet';
import CurrentGame from '../interfaces/currentGame';

interface State {
    currentGame: CurrentGame;
}

export const useCurrentGameStore = defineStore({
    id: 'currentGameStore',

    state: (): State => ({
        currentGame: {
            id: 'kj1k4k325jk235kp141k2lk',
            prizeFund: 60.1209,
            gameDate: '12.05.2022',
            bets: [
                {
                    id: 'kfasjfll212oiopnlal',
                    userId: 'kfasjfll212oiopnlal',
                    startTime: 1657439263796,
                    endTime:   null,
                    betAmountEth: 20.3342
                },
                {
                    id: 'ewafeeeefgeyeee32r8',
                    userId: 'ioi1oi1jdsfass2nk1j',
                    startTime: 1657439263796,
                    endTime:   1657549810882,
                    betAmountEth: 15.5643
                },
                {
                    id: 'qwrns9jk3ngb136jdkw',
                    userId: 'ewafeeeefgeyeee32r8',
                    startTime: 1657439263796,
                    endTime:   1657549810882,
                    betAmountEth: 10.4221
                },
                {
                    id: 'gjebaiji324kln1oipj',
                    userId: 'qwrns9jk3ngb136jdkw',
                    startTime: 1657439263796,
                    endTime:   1657549810882,
                    betAmountEth: 9.9221
                },
                {
                    id: 'bconljskenl1jpdsk34',
                    userId: 'gjebaiji324kln1oipj',
                    startTime: 1657439263796,
                    endTime:   1657549810882,
                    betAmountEth: 9.2998
                },
                {
                    id: 'bconljskenl1jpdsk34',
                    userId: 'fasf323fa1nmin31pho',
                    startTime: 1657439263796,
                    endTime:   1657549810882,
                    betAmountEth: 2.1131
                },
            ]
        },
    }),

    actions: {
        addNewBet(newBet: Bet) {
            this.currentGame.bets.unshift(newBet);
            this.currentGame.prizeFund += newBet.betAmountEth;
        },

        addEndTimeToBet(betId: string, endTime: number) {
            const bet = this.currentGame.bets.find(bet => {
                return bet.id === betId;
            });
            bet.endTime = endTime;
        },
    }
})
