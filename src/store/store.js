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
            getItem: (key) => {
                const now = new Date();
                if (now.getTime() > ls.get(key).expiry) {
					ls.remove(key);
					return null;
				}
                return ls.get(key).value;
            },
            setItem: (key, value) => {
                const now = new Date();
                const item = {
					value: value,
					expiry: now.getTime() + 345600000, // 4 days
				}
				return ls.set(key, item);
            },
            removeItem: (key) => ls.remove(key),
        },
        }),
    ],
});
