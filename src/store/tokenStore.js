// stores/counter.js
import { defineStore } from 'pinia'

export const useToken = defineStore('tokenStoreID', {
    state: () => ({
        token: '',
        role: -1,
        id: -1,
        isGoToLogin: false,
        currentPage: { index: -1, child: -1 },
        fullName: 'Admin',
        avatar: '',
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

        onSetGoToLogin(check) {
            this.isGoToLogin = check;
        },
        onSetCurrentPage(page) {
            this.currentPage = page;
        },
        onSetFullName(name) {
            this.fullName = name;
        },
        onSetAvatar(avatar) {
            this.avatar = avatar;
        },
        onSetFullPro(user) {
            console.log('--------------', user.admin.id, user.admin.role, user.admin.fullname, user.admin.avatar);
            this.token = user.token;
            this.id = user.admin.id;
            this.role = user.admin.role;
            this.fullName = user.admin.fullname;
            this.avatar = user.admin.avatar;
        },
        onResetStore() {
            this.token = '';
            this.role = -1;
            this.id = -1;
            this.isGoToLogin = false;
            this.currentPage = { index: -1, child: -1 };
            this.avatar = '';
            this.fullName = '';
        },

    }
})