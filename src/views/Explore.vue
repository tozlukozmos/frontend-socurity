<script setup>
import { ref, inject, onMounted, watchEffect, watch } from 'vue';
const axios = inject("Axios");

const explorePagePeopleSectionUsers = ref([]);
const explorePageCategorySectionCategories = ref([]);
const explorePagePostSectionPosts = ref([]);

const explorePagePeopleSectionLoading = ref(true);
const explorePagePeopleSectionInfoAlert = ref(false);
const explorePagePeopleSectionSearchInfoAlert = ref(false);

const explorePageCategorySectionLoading = ref(true);
const explorePageCategorySectionSearchInfoAlert = ref(false);
const explorePageCategorySectionInfoAlert = ref(false);

const explorePagePostSectionLoading = ref(true);
const explorePagePostSectionSearchInfoAlert = ref(false);
const explorePagePostSectionInfoAlert = ref(false);

const appPostButtonDeleteLoading = ref(false);
const explorePageSearchCardInputQuery = ref("");

watch(() => explorePageSearchCardInputQuery.value, () => {
    explorePagePeopleSectionInfoAlert.value = false,
    explorePageCategorySectionInfoAlert.value = false,
    explorePagePostSectionInfoAlert.value = false,

    axios.post("/users/search", {word: explorePageSearchCardInputQuery.value})
    .then(response_explorePageSearchQueryUsers => { 
        explorePagePeopleSectionUsers.value = response_explorePageSearchQueryUsers.data, 
        explorePagePeopleSectionLoading.value = false,
        explorePagePeopleSectionInfoAlert.value = false,
        explorePagePeopleSectionUsers.value.length === 0 ? explorePagePeopleSectionSearchInfoAlert.value = true : explorePagePeopleSectionSearchInfoAlert.value = false
    })
    .catch(() => {console.error})
    
    axios.post("/posts/search", {word: explorePageSearchCardInputQuery.value})
    .then(response_explorePageSearchQueryPosts => { 
        explorePagePostSectionPosts.value = response_explorePageSearchQueryPosts.data, 
        explorePagePostSectionLoading.value = false,
        explorePageCategorySectionCategories.value = [];       
        explorePagePostSectionPosts.value.forEach(explorePagePostSectionPost => {
            if(!explorePageCategorySectionCategories.value.includes(explorePagePostSectionPost.category)){
                explorePageCategorySectionCategories.value.push(explorePagePostSectionPost.category);
            }
        });
        explorePageCategorySectionLoading.value = false,
        explorePagePostSectionPosts.value.length === 0 ? explorePagePostSectionSearchInfoAlert.value = true : explorePagePostSectionSearchInfoAlert.value = false,
        explorePageCategorySectionCategories.value.length === 0 ? explorePageCategorySectionSearchInfoAlert.value = true : explorePageCategorySectionSearchInfoAlert.value = false
    })
    .catch(() => {console.error})
});

const DeletePost = (postId) => {
    appPostButtonDeleteLoading.value = true;
    setTimeout(() => {
        axios.delete(`/posts/${postId}`)
        .then(() => {
            appPostButtonDeleteLoading.value = false,
            explorePagePostSectionPosts.value = explorePagePostSectionPosts.value.filter(
                (explorePagePostSectionPost) => {
                explorePagePostSectionPost._id !== postId
            });
        })
        .catch(() => {
            console.error, 
            appPostButtonDeleteLoading.value = false
        })
    }, 300);
}

onMounted(() => {
    document.title = "Explore | Socurity";
    setTimeout(() => {
        axios.post("/users/explore-page")
        .then(response_explorePagePeopleSectionUsers => { 
            explorePagePeopleSectionUsers.value = response_explorePagePeopleSectionUsers.data, 
            explorePagePeopleSectionLoading.value = false
            explorePagePeopleSectionUsers.value.length === 0 ? explorePagePeopleSectionInfoAlert.value = true : explorePagePeopleSectionInfoAlert.value = false
        })
        .catch(() => {console.error})
    }, 300);
    setTimeout(() => {
        axios.get("/posts/explore-page")
        .then(response_explorePagePostSectionPosts => { 
            explorePagePostSectionPosts.value = response_explorePagePostSectionPosts.data, 
            explorePagePostSectionLoading.value = false,
            explorePagePostSectionPosts.value.forEach(explorePagePostSectionPost => {
                if(!explorePageCategorySectionCategories.value.includes(explorePagePostSectionPost.category)){
                    explorePageCategorySectionCategories.value.push(explorePagePostSectionPost.category);
                }
            });
            explorePageCategorySectionLoading.value = false,
            explorePageCategorySectionCategories.value.length === 0 ? explorePageCategorySectionInfoAlert.value = true : explorePageCategorySectionInfoAlert.value = false
            explorePagePostSectionPosts.value.length === 0 ? explorePagePostSectionInfoAlert.value = true : explorePagePostSectionInfoAlert.value = false
        })
        .catch(() => {console.error})
    }, 300);
})
</script>

<template>
    <AppNavbar/>
    <section class="search-card">
        <input 
        v-model="explorePageSearchCardInputQuery"
        type="search" 
        name="search" 
        id="search" 
        placeholder="enter a username, a category, or a word.">
        <span class="search-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="#E8AA33" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22 22L20 20" stroke="#E8AA33" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </span>
    </section>
    <main class="main">
        <div class="line">
            <h3>People</h3>
        </div>
        <div class="people-box">
            <InfoAlert class="info-alert" v-if="explorePagePeopleSectionSearchInfoAlert" message="There is no such a user!" />
            <InfoAlert class="info-alert" v-if="explorePagePeopleSectionInfoAlert" message="There is no any user!" />
            <AppLoading v-if="explorePagePeopleSectionLoading" />
            <ExploreProfileCard 
            v-for="user in explorePagePeopleSectionUsers" 
            :key="user._id" 
            :user="user" />
        </div>
        <div class="line">
            <h3>Category</h3>
        </div>
        <div class="category-box">
            <InfoAlert class="info-alert" v-if="explorePageCategorySectionSearchInfoAlert" message="There is no such a category!" />
            <InfoAlert class="info-alert" v-if="explorePageCategorySectionInfoAlert" message="There is no any category!" />
            <AppLoading v-if="explorePageCategorySectionLoading" />
            <ExploreCategoryCard 
            class="explore-category-card"
            v-for="category in explorePageCategorySectionCategories" 
            :key="category" 
            :category="category" />
        </div>
        <div class="line">
            <h3>Post</h3>
        </div>
        <div class="post-box">
            <InfoAlert class="info-alert" v-if="explorePagePostSectionSearchInfoAlert" message="There is no such a post!" />
            <InfoAlert class="info-alert" v-if="explorePagePostSectionInfoAlert" message="There is no any post!" />
            <AppLoading v-if="explorePagePostSectionLoading" />
            <AppPost 
            v-for="post in explorePagePostSectionPosts" 
            :key="post._id" 
            :post="post" 
            :DeletePost="DeletePost" 
            :loadingButton="appPostButtonDeleteLoading" />
        </div>
    </main>
</template>

<style scoped>
.search-card {
    margin: 20px 0;
    position: relative;
    display: flex;
    justify-content: space-between;
}
#search {
    width: 100%;
    padding: 10px 15px;
    color: var(--dark);
    font-size: 1rem;
    font-weight: var(--bold);
    background-color: transparent;
    border: 2px solid var(--dark);
    border-radius: 10px;
    outline: none;
}
.search-icon {
    padding-left: 8px;
    position: absolute;
    top: 55%;
    right: 16px;
    transform: translateY(-50%);
    pointer-events: none;
    background-color: var(--light);
}
::placeholder {
    font-size: 1rem;
    color: var(--dark);
    opacity: .7;
    font-weight: var(--bold);
    text-overflow: ellipsis;
}
#search:focus {
    border: 2px solid var(--yellow);
    box-shadow: 0 0 1px 2px var(--yellow);
}
/* clears the ‘X’ from Internet Explorer */
input[type=search]::-ms-clear { display: none; width : 0; height: 0; }
input[type=search]::-ms-reveal { display: none; width : 0; height: 0; }
/* clears the ‘X’ from Chrome */
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration { display: none; }
.main {
    padding-bottom: 130px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.line {
    margin: 20px 0;
    width: 100%;
    height: 2px;
    background-color: var(--dark);
    border-radius: 2px;
    position: relative;
}
.line > h3{
    color: var(--dark);
    background-color: var(--light);
    padding: 5px 10px;
    position: absolute;
    top: -15px;
    left: 50%;
    font-size: .9rem;
    word-spacing: 2px;
    transform: translateX(-50%);
}
.people-box {
    width: 100%;
    min-height: 248px;
    display: flex;
    gap: 50px;
    position: relative;
    overflow: auto;
}
::-webkit-scrollbar {
    appearance: none;
}
.info-alert {
    height: max-content;
}
.category-box {
    width: 100%;
    min-height: 138px;
    margin: 20px 0;
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
}
.explore-category-card {
    width: max-content;
    height: max-content;
}
.post-box {
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 30px;
}
</style>