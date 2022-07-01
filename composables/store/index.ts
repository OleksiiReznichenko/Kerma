import { defineStore } from 'pinia';

export const useBaseStore = defineStore({
    id: 'baseStore',
    
    state: () => ({
        navOpenIndicator: false,
    }),

    actions: {
        navOpenIndicatorToFalse() {
            this.navOpenIndicator = false;
        },
        
        navOpenIndicatorToTrue() {
            this.navOpenIndicator = true;
        },
    }
})

export { useFaqStore } from './faq';