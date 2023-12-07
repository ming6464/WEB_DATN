// stores/counter.js
import { defineStore } from 'pinia'

export const useToken = defineStore('tokenStoreID', {
    state: () => ({
        token: '',
    }),

    actions: {
        onSetToken(tokenNew) {
            this.token = tokenNew;
        }
    }
})