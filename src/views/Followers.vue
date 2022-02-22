<script setup>
import { ref, onMounted, inject } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const axios = inject("Axios");
const CURRENT_USER = store.state.User;
const CURRENT_USER_FOLLOWERS = ref();

const followersPageUsers = ref([]);
const followersPageLoading = ref(true);
const followersPageInfoAlert = ref(false);
const followersPageUsersMainSection = ref(false);

onMounted(() => {
    document.title = "Followers | Socurity";
    // setTimeout(() => {
    //     followersPageLoading.value = false,
    //     followersPageUsers.value = CURRENT_USER.followers,
    //     followersPageUsers.value.length === 0 ? followersPageInfoAlert.value = true : followersPageInfoAlert.value = false,
    //     followersPageUsersMainSection.value = true
    // }, 300);
    axios.get("/users/")
    .then(response_FollowersPageUsers => {
        response_FollowersPageUsers.data.forEach(response_FollowersPageUser => {
            if(response_FollowersPageUser._id === CURRENT_USER._id){
                CURRENT_USER_FOLLOWERS.value = response_FollowersPageUser.followers;
                console.log(response_FollowersPageUser.followers);
                followersPageLoading.value = false,
                followersPageUsers.value = response_FollowersPageUser.followers,
                followersPageUsers.value.length === 0 ? followersPageInfoAlert.value = true : followersPageInfoAlert.value = false,
                followersPageUsersMainSection.value = true
            }
        });
    })
    .catch(() => {console.error})
})
</script>

<template>
    <AppButtonBack/>
    <main class="main">
        <AppLoading v-if="followersPageLoading"/>
        <InfoAlert v-if="followersPageInfoAlert" message="Anyone don't follow you." />
        <main v-if="followersPageUsersMainSection" class="users-main">
            <FollowersProfileCard 
            v-for="user in followersPageUsers" 
            :key="user._id" 
            :user="user" />
        </main>
    </main>
</template>

<style scoped>
.main {
    margin-top: 20px;
    padding-bottom: 96px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.users-main{
    width: 100%;
    height: 100%;
}
</style>