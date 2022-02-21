<script setup>
import { ref, inject, onMounted } from 'vue';
const axios = inject("Axios");

const currentURL = window.location.hash;
const CURRENT_CATEGORY = currentURL.substring(currentURL.lastIndexOf("/") + 1);
const categoryPagePosts = ref([]);
const categoryPageLoading = ref(true);
const categoryPageInfoAlert = ref(false);
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
    setTimeout(() => {
        axios.post("/posts/category-page", {category: decodeURIComponent(CURRENT_CATEGORY)})
        .then(response_categoryPagePosts => { 
            categoryPagePosts.value = response_categoryPagePosts.data;
            categoryPageLoading.value = false;
            categoryPagePosts.value.length === 0 ? categoryPageInfoAlert.value = true : categoryPageInfoAlert.value = false;
            document.title = `Explore posts about ${decodeURIComponent(CURRENT_CATEGORY)} | Socurity`;
        })
        .catch(() => {console.error})
    }, 300);
})
</script>

<template>
    <AppButtonBack class="app-button-back"/>
    <main class="category-related-posts">
        <AppLoading v-if="categoryPageLoading"/>
        <InfoAlert 
        v-if="categoryPageInfoAlert" 
        message="There is no such a category" />
        <AppPost 
        v-for="post in categoryPagePosts" 
        :key="post._id" 
        :post="post" 
        :DeletePost="DeletePost" 
        :loadingButton="appPostButtonDeleteLoading" />
    </main>
</template>

<style scoped>
.app-button-back {
    margin-bottom: 20px;
}
.category-related-posts {
    width: 100%;
    margin-top: 20px;
    padding-bottom: 180px;
    display: flex;
    flex-direction: column;
    gap: 30px;
}
</style>