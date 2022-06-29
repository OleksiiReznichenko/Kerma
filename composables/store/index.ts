import { defineStore } from 'pinia';

export const useBaseStore = defineStore({
    id: 'base',

    state: () => ({
        navOpenIndicator: false
    }),

//   getters: {
//     valueWithName: state => `Value is ${state.numberValue}`
//   },

    actions: {
        navOpenIndicatorToFalse() {
            this.navOpenIndicator = false;
        },
        
        navOpenIndicatorToTrue() {
            this.navOpenIndicator = true;
        },
    }
})