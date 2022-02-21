<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const CURRENT_USER = store.state.User;

const followersPageUsers = ref([]);
const followersPageLoading = ref(true);
const followersPageInfoAlert = ref(false);
const followersPageUsersMainSection = ref(false);

onMounted(() => {
    document.title = "Followers | Socurity";
    setTimeout(() => {
        followersPageLoading.value = false,
        followersPageUsers.value = CURRENT_USER.followers,
        followersPageUsers.value.length === 0 ? followersPageInfoAlert.value = true : followersPageInfoAlert.value = false,
        followersPageUsersMainSection.value = true
    }, 300);
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