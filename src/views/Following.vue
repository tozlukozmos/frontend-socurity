<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const CURRENT_USER = store.state.User;

const followingPageUsers = ref([]);
const followingPageLoading = ref(true);
const followingPageInfoAlert = ref(false);
const followingPageUsersMainSection = ref(false);

onMounted(() => {
    document.title = "Following | Socurity";
    setTimeout(() => {
        followingPageLoading.value = false,
        followingPageUsers.value = CURRENT_USER.following,
        followingPageUsers.value.length === 0 ? followingPageInfoAlert.value = true : followingPageInfoAlert.value = false,
        followingPageUsersMainSection.value = true
    }, 300);
})
</script>

<template>
    <AppButtonBack/>
    <main class="main">
        <AppLoading v-if="followingPageLoading"/>
        <InfoAlert v-if="followingPageInfoAlert" message="You don't follow anyone." />
        <main v-if="followingPageUsersMainSection" class="users-main">
            <FollowingProfileCard 
            v-for="user in followingPageUsers" 
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