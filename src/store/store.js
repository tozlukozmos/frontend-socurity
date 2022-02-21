import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import SecureLS from "secure-ls";
var ls = new SecureLS({
    isCompression: false,
});

export default createStore({
    state: {
        User: null,
    },
    mutations: {
        setUser(state, user) {
            state.User = user;
        },
        logoutUser(state) {
            state.User = null;
        }
    },
    getters: {
        isAuthenticated: (state) =>
        state.User !== null,
    },
    plugins: [
        createPersistedState({
        storage: {
            getItem: (key) => ls.get(key),
            setItem: (key, value) =>
            ls.set(key, value),
            removeItem: (key) =>
            ls.remove(key),
        },
        }),
    ],
});
