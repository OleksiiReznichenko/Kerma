import { defineStore } from 'pinia';
import Question from '../interfaces/faqQuestion';


interface State {
    questions: Question[] | undefined[];
}

export const useFaqStore = defineStore({
    id: 'faqStore',
    
    state: (): State => ({
        questions: [
            {
                id: '1',
                title: 'Lorem ipsum dolor sit',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
                isButton: true,
                buttonText: 'Play',
                buttonLink: '/game'
            },
            {
                id: '2',
                title: 'Lorem ipsum dolor sit',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
                isButton: false,
                buttonText: null,
                buttonLink: null
            },
            {
                id: '3',
                title: 'Lorem ipsum dolor sit',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
                isButton: true,
                buttonText: 'Game history',
                buttonLink: '/gameHistory'
            },
            {
                id: '4',
                title: 'Lorem ipsum dolor sit',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
                isButton: true,
                buttonText: 'Play',
                buttonLink: '/game'
            },
        ]
    })
})