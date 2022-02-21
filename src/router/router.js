import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store/store.js";

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../views/Home.vue")
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue")
    },
    {
        path: "/signup",
        name: "Signup",
        component: () => import("../views/Signup.vue")
    },
    {
        path: "/feed",
        name: "Feed",
        component: () => import("../views/Feed.vue")
    },
    {
        path: "/explore",
        name: "Explore",
        component: () => import("../views/Explore.vue")
    },
    {
        path: "/publish",
        name: "Publish",
        component: () => import("../views/Publish.vue")
    },
    {
        path: "/library",
        name: "Library",
        component: () => import("../views/Library.vue")
    },
    {
        path: "/notifications",
        name: "Notifications",
        component: () => import("../views/Notifications.vue")
    },
    {
        path: "/profile",
        name: "Profile",
        component: () => import("../views/Profile.vue")
    },
    {
        path: "/profile/following",
        name: "Following",
        component: () => import("../views/Following.vue")
    },
    {
        path: "/profile/followers",
        name: "Followers",
        component: () => import("../views/Followers.vue")
    },
    {
        path: "/profile/edit",
        name: "EditProfile",
        component: () => import("../views/EditProfile.vue")
    },
    {
        path: "/profile/settings",
        name: "Settings",
        component: () => import("../views/Settings.vue")
    },
    {
        path: "/explore/:username",
        name: "OtherProfile",
        component: () => import("../views/OtherProfile.vue")
    },
    {
        path: "/explore/posts/:postId",
        name: "PostComment",
        component: () => import("../views/PostComment.vue")
    },
    {
        path: "/explore/categories/:categoryName",
        name: "CategoryPage",
        component: () => import("../views/CategoryPage.vue")
    },
    {
        path: "/:pathMatch(.*)*",
        name: "404NotFound",
        component: () => import("../views/404NotFound.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters.isAuthenticated;
    const publicPages = ["Home", "Login", "Signup"];
    const privatePages = ["Feed", "Explore", "OtherProfile", "Publish", 
    "Library", "Profile", "EditProfile", "Settings", "Following", 
    "Followers", "PostComment", "CategoryPage"];
    if ( publicPages.includes(to.name) && isAuthenticated )
    next({name: "Feed"});
    else if ( privatePages.includes(to.name) && !isAuthenticated )
    next({name: "Home"});
    else next();
});

export default router;
