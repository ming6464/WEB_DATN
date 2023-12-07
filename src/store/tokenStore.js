// stores/counter.js
import { defineStore } from 'pinia'

export const useToken = defineStore('tokenStoreID', {
    state: () => ({
        token: '',
        role: -1,
        id: -1,
        isGoToLogin: false,
        currentPage: { index: -1, child: -1 },
    }),

    actions: {
        onSetToken(tokenNew) {
            this.token = tokenNew;
        },
        onSetRole(roleNew) {
            this.role = roleNew;
        }
        ,
        onSetID(idNew) {
            this.id = idNew;
        },
        onResetStore() {
            this.token = '';
            this.role = -1;
            this.id = -1;
            this.isGoToLogin = false;
            this.currentPage = { index: -1, child: -1 };
        },
        onSetGoToLogin(check) {
            this.isGoToLogin = check;
        },
        onSetCurrentPage(page) {
            this.currentPage = page;
        }

    }
})