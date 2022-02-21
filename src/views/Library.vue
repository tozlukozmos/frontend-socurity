<script setup>
import { ref, inject, onMounted } from 'vue';
import { useStore } from 'vuex';
const axios = inject("Axios");
const store = useStore();
const CURRENT_USER = store.state.User;

const libraryPagePosts = ref([]);
const libraryPageLoading = ref(true);
const libraryPageInfoAlert = ref(false);
const appPostButtonDeleteLoading = ref(false);

const DeletePost = (postId) => {
    appPostButtonDeleteLoading.value = true;
    setTimeout(() => {
        axios.delete(`/posts/${postId}`)
        .then(() => {
            appPostButtonDeleteLoading.value = false, 
            libraryPagePosts.value = libraryPagePosts.value.filter(
                (libraryPagePost) => {
                libraryPagePost._id !== postId
            });
        })
        .catch(() => {
            console.error, 
            appPostButtonDeleteLoading.value = false
        })
    }, 300);
}

onMounted(() => {
    document.title = "Library | Socurity";
    setTimeout(() => {
        axios.get("/posts/library-page")
        .then(response_libraryPagePosts => { 
            libraryPagePosts.value = response_libraryPagePosts.data;
            libraryPageLoading.value = false;
            libraryPagePosts.value.length === 0 ? libraryPageInfoAlert.value = true : libraryPageInfoAlert.value = false;
        })
        .catch(() => {console.error})
    }, 300);
})
</script>

<template>
    <AppButtonBack/>
    <AppNavbar/>
    <main class="main">
        <AppLoading v-if="libraryPageLoading"/>
        <InfoAlert 
        v-if="libraryPageInfoAlert" 
        message="You should add a post to library to see it here." />
        <AppPost 
        v-for="post in libraryPagePosts" 
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
    padding-bottom: 180px;
    display: flex;
    flex-direction: column;
    gap: 30px;
}
</style>