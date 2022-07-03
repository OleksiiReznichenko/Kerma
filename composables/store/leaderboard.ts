import { defineStore } from "pinia";

interface State {
    leaderboard: string[]
}

export const useLeaderboardStore = defineStore({
    id: 'leaderboardStore',

    state: (): State => ({
        leaderboard: [
            'kfasjfll212oiopnlal',
            'ioi1oi1jdsfass2nk1j',
            'ewafeeeefgeyeee32r8',
            'qwrns9jk3ngb136jdkw',
            'gjebaiji324kln1oipj',
            'bconljskenl1jpdsk34',
            'fasf323fa1nmin31pho',
            'njjroiwajr030291920',
            'nmxoawjeqow21io3np1'
        ]
    })
})