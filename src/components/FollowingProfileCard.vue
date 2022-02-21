<script setup>
import { useStore } from 'vuex';
import { ref, inject } from 'vue';
const store = useStore();
const axios = inject("Axios");
const CURRENT_USER = store.state.User;
const tokens = CURRENT_USER.tokens;
const props = defineProps({
    user: Object
});

const followingProfileCardButtonFollowLoading = ref(false);
const followingProfileCardButtonUnfollowLoading = ref(false);
const isCurrentUserFollowOtherUser = ref(true);

const usernameRoute = CURRENT_USER._id === props.user.userId._id ? '/profile' : `/explore/${props.user.userId.username}`;

const Follow = () => {
    followingProfileCardButtonFollowLoading.value = true;
    setTimeout(() => {
        axios.post(`/users/${props.user.userId._id}/follow`)
        .then(response_updatedCurrentUser => {
            isCurrentUserFollowOtherUser.value = true,
            store.commit("setUser", {...response_updatedCurrentUser.data, tokens});
            followingProfileCardButtonFollowLoading.value = false;
            axios.post(`/notifications/${OTHER_USER.value._id}`, {actionType: 1})
            .then((user) => {console.log(user);})
            .catch(() => {console.error})
        })
        .catch(() => {
            console.error, 
            isCurrentUserFollowOtherUser.value = false, 
            followingProfileCardButtonFollowLoading.value = false
        })
    }, 300);
};

const Unfollow = () => {
    followingProfileCardButtonUnfollowLoading.value = true;
    setTimeout(() => {
        axios.delete(`/users/${props.user.userId._id}/unfollow`)
        .then(response_updatedCurrentUser => {
            isCurrentUserFollowOtherUser.value = false,
            store.commit("setUser", {...response_updatedCurrentUser.data, tokens});
            followingProfileCardButtonUnfollowLoading.value = false;
        })
        .catch(() => {
            console.error, 
            isCurrentUserFollowOtherUser.value = true, 
            followingProfileCardButtonUnfollowLoading.value = false
        })
    }, 300);
};
</script>

<template>
    <section class="profile-card">
        <div class="action-box">
            <button @click="Follow" v-if="!isCurrentUserFollowOtherUser" class="button-follow">
                <AppLoading 
                class="loading-button-follow" 
                v-if="followingProfileCardButtonFollowLoading" 
                color="#352D2B" 
                backgroundColor="#E8AA33"/>
                Follow
            </button>
            <button @click="Unfollow" v-else class="button-unfollow">
                <AppLoading 
                class="loading-button-follow" 
                v-if="followingProfileCardButtonUnfollowLoading" 
                backgroundColor="#352D2B"/>
                Unfollow
            </button>
        </div>
        <router-link 
        :to="usernameRoute" 
        class="profile-card-username">
        @{{user.userId.username}}
        </router-link>
    </section>
</template>

<style scoped>
.profile-card {
    width: 100%;
    margin-bottom: 30px;
    padding: 16px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    background-color: #39312f;
}
.action-box {
    margin-right: 16px;
}
.profile-card-username {
    font-size: 1.2rem;
    font-weight: var(--normal);
    word-spacing: 2px;
    color: var(--light);
}
.button-follow {
    padding: 5px 15px;
    font-size: 1rem;
    font-weight: var(--bold);
    color: var(--dark);
    background-color: var(--yellow);
    border: 2px solid var(--yellow);
    border-radius: 10px;
    cursor: pointer;
    position: relative;
}
.button-follow:focus {
    outline: var(--yellow) solid 2px;
    outline-offset: 2px;
}
.button-follow:active {
    outline: var(--light) solid 2px;
}
.loading-button-follow {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 10px;
}
.button-unfollow {
    padding: 5px 15px;
    font-size: 1rem;
    font-weight: var(--bold);
    color: var(--yellow);
    background-color: transparent;
    border: 2px solid var(--yellow);
    border-radius: 10px;
    cursor: pointer;
    position: relative;
}
.button-unfollow:focus {
    outline: var(--yellow) solid 2px;
    outline-offset: 2px;
}
.button-unfollow:active {
    outline: var(--light) solid 2px;
}
</style>