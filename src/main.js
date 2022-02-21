import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router.js';
import store from './store/store.js';
import { Axios } from "./utils/Axios";

/* components */
import AppNavbar from './components/AppNavbar.vue';
import AppPost from './components/AppPost.vue';
import AppNotificationCard from './components/AppNotificationCard.vue';
import AppComment from './components/AppComment.vue';
import AppLoading from './components/AppLoading.vue';
import AppButtonBack from './components/AppButtonBack.vue';
import ExploreProfileCard from './components/ExploreProfileCard.vue';
import FollowingProfileCard from './components/FollowingProfileCard.vue';
import FollowersProfileCard from './components/FollowersProfileCard.vue';
import ExploreCategoryCard from './components/ExploreCategoryCard.vue';

/* alerts */
import InfoAlert from './components/alerts/Info.vue';

const app = createApp(App);
app.use(router);
app.use(store);
app.provide("Axios", Axios);
app.component('AppNavbar', AppNavbar);
app.component('AppPost', AppPost);
app.component('AppNotificationCard', AppNotificationCard);
app.component('AppComment', AppComment);
app.component('AppLoading', AppLoading);
app.component('AppButtonBack', AppButtonBack);
app.component('ExploreProfileCard', ExploreProfileCard);
app.component('FollowingProfileCard', FollowingProfileCard);
app.component('FollowersProfileCard', FollowersProfileCard);
app.component('ExploreCategoryCard', ExploreCategoryCard);
app.component('InfoAlert', InfoAlert);
app.mount('#app');
