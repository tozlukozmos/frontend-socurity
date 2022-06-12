<script setup>
import { ref, inject, onMounted } from 'vue';
import { useStore } from 'vuex';
const axios = inject("Axios");
const store = useStore();
const CURRENT_USER = store.state.User;

const feedPagePosts = ref([]);
const feedPageLoading = ref(true);
const feedPageInfoAlert = ref(false);
const appPostButtonDeleteLoading = ref(false);

const DeletePost = (postId) => {
    appPostButtonDeleteLoading.value = true;
    setTimeout(() => {
        axios.delete(`/posts/${postId}`)
        .then(() => {
            appPostButtonDeleteLoading.value = false, 
            feedPagePosts.value = feedPagePosts.value.filter((feedPagePost) => {
                feedPagePost._id !== postId
            });
        })
        .catch(() => {
            console.error, 
            appPostButtonDeleteLoading.value = false
        })
    }, 300);
}

onMounted(() => {
    document.title = "Feed | Socurity";
    setTimeout(() => {
        axios.post("/users/posts/feed-page", {following: CURRENT_USER.following})
        .then(response_feedPagePosts => { 
            feedPagePosts.value = response_feedPagePosts.data, 
            feedPageLoading.value = false,
            response_feedPagePosts.data.length === 0 ? feedPageInfoAlert.value = true : feedPageInfoAlert.value = false
        })
        .catch(() => {console.error})
    }, 300);
})
</script>

<template>
    <AppNavbar/>
    <main class="main">
        <AppLoading v-if="feedPageLoading" />
        <InfoAlert v-if="feedPageInfoAlert" message="You should follow someone or 
        publish a post to see something here. At the bottom-right, you can 
        see a button to create a new post. Let's do it!" />
        <AppPost 
        v-for="post in feedPagePosts" 
        :key="post._id" 
        :post="post" 
        :DeletePost="DeletePost" 
        :loadingButton="appPostButtonDeleteLoading" />
    </main>
</template>

<style scoped>
.main {
    width: 100%;
    margin-top: 20px;
    padding-bottom: 130px;
    display: flex;
    flex-direction: column;
    gap: 30px;
}
</style>