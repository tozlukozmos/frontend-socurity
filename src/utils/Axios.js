import axios from "axios";
import store from '../store/store.js';

export const Axios = axios.create({
    baseURL: "https://api-socurity.herokuapp.com",
    // baseURL: "http://localhost:2021",
    withCredentials: false,
    headers: {
        "Authorization": `Bearer ${store.state?.User?.tokens?.access_token}`,
        "Content-Type": "application/json",
    },
});