import {defineStore} from 'pinia';
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
                    betTime: '09:32',
                    betAmountEth: 20.3342
                },
                {
                    id: 'ewafeeeefgeyeee32r8',
                    userId: 'ioi1oi1jdsfass2nk1j',
                    betTime: '12:55',
                    betAmountEth: 15.5643
                },
                {
                    id: 'qwrns9jk3ngb136jdkw',
                    userId: 'ewafeeeefgeyeee32r8',
                    betTime: '05:00',
                    betAmountEth: 10.4221
                },
                {
                    id: 'gjebaiji324kln1oipj',
                    userId: 'qwrns9jk3ngb136jdkw',
                    betTime: '80:44',
                    betAmountEth: 9.9221
                },
                {
                    id: 'bconljskenl1jpdsk34',
                    userId: 'gjebaiji324kln1oipj',
                    betTime: '1:10',
                    betAmountEth: 9.2998
                },
                {
                    id: 'bconljskenl1jpdsk34',
                    userId: 'fasf323fa1nmin31pho',
                    betTime: '10:22',
                    betAmountEth: 2.1131
                },
            ]
        },
    })
})
