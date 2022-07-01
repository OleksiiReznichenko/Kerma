import { defineStore } from 'pinia';

export const useFaqStore = defineStore({
    id: 'faqStore',
    
    state: () => ({
        questions: [
            {
                title: 'Lorem ipsum dolor sit',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
                isButton: true,
                buttonText: 'Play',
                buttonLink: '/game'
            },
            {
                title: 'Lorem ipsum dolor sit',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
                isButton: false,
                buttonText: null,
                buttonLink: null
            },
            {
                title: 'Lorem ipsum dolor sit',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
                isButton: true,
                buttonText: 'Game history',
                buttonLink: '/gameHistory'
            },
            {
                title: 'Lorem ipsum dolor sit',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
                isButton: true,
                buttonText: 'Play',
                buttonLink: '/game'
            },
        ]
    })
})