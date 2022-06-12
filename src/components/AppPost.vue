<script setup>
import { ref, inject, onMounted } from 'vue';
import moment from 'moment';
import { useStore } from 'vuex';
const store = useStore();
const axios = inject("Axios");

const currentUser = store.state.User;
const props = defineProps({
    post: Object,
    DeletePost: Function,
    isMainPost: Boolean,
    loadingButton: Boolean,
});

const isLibrary = ref(false);

const isDeleteModal = ref(false);
const showDeleteModal = () => {
    isDeleteModal.value = true;
}
const hideDeleteModal = () => {
    isDeleteModal.value = false;
}

const addToLibrary = () => {
    axios.post(`/posts/${props.post._id}/add-to-library`)
    .then(post => {isLibrary.value = true})
    .catch(error => {console.error, isLibrary.value = false})
}

const removeFromLibrary = () => {
    let libraryId = null;
    props.post.libraries.forEach(element => {
        if(element.userId === currentUser._id){
            libraryId = element._id;
        }
    });
    axios.delete(`/posts/${props.post._id}/${libraryId}/remove-from-library`)
    .then(post => {isLibrary.value = false})
    .catch(error => {console.error, isLibrary.value = true})
}

const date = moment(props.post.createdAt + '03:00', 'YYYY-MM-DD HH:mm:ssZ').fromNow();
const buttonDelete = currentUser._id === props.post.userId._id ? true : false;
const usernameRoute = currentUser._id === props.post.userId._id ? '/profile' : `/explore/${props.post.userId.username}`;
const parentPostUsernameRoute = currentUser._id === props.post.userId._id ? '/profile' : `/explore/${props.post.userId.username}`;

onMounted(() => {
    props.post.libraries?.forEach(element => {
        if(element.userId === currentUser._id){
            isLibrary.value = true;
        }
    });
})
</script>

<template>
    <!-- post -->
    <article class="post">
        <!-- post content -->
        <section class="post-content">
            <!-- post content top -->
            <div class="post-content-top">
                <!-- post content top category -->
                <router-link :to="`/explore/categories/${post.category}`" class="post-content-top-category">{{post.category}}</router-link>

                <!-- post content top time -->
                <p class="post-content-top-time">{{date}}</p>
            </div>

            <!-- post content text -->
            <p class="post-content-text">{{post.text}}</p>
            
            <!-- post content username -->
            <router-link  :to="usernameRoute" class="post-content-username">
            @{{post.userId.username}}</router-link>
        </section>

        <!-- post action -->
        <section class="post-action">
            <!-- post action button comment-->
            <router-link v-if="!isMainPost" :to="`/explore/posts/${post._id}`">
                <button class="post-action-comment">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z" stroke="#E0DBDB" stroke-opacity="0.5" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M15.9965 11H16.0054" stroke="#E0DBDB" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M11.9955 11H12.0045" stroke="#E0DBDB" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M7.99451 11H8.00349" stroke="#E0DBDB" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                </button>
            </router-link>

            <!-- post action button library -->
            <button @click="addToLibrary" v-if="!isLibrary" class="post-action-library">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5 10.6504H9.5" stroke="#E0DBDB" stroke-opacity="0.5" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 8.20996V13.21" stroke="#E0DBDB" stroke-opacity="0.5" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.82 2H7.18001C5.05001 2 3.32001 3.74 3.32001 5.86V19.95C3.32001 21.75 4.61001 22.51 6.19001 21.64L11.07 18.93C11.59 18.64 12.43 18.64 12.94 18.93L17.82 21.64C19.4 22.52 20.69 21.76 20.69 19.95V5.86C20.68 3.74 18.95 2 16.82 2Z" stroke="#E0DBDB" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>

            <!-- post action button library active -->
            <button @click="removeFromLibrary" v-if="isLibrary" class="post-action-library">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5 10.6504H9.5" stroke="#E8AA33" stroke-opacity="0.5" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.82 2H7.18001C5.05001 2 3.32001 3.74 3.32001 5.86V19.95C3.32001 21.75 4.61001 22.51 6.19001 21.64L11.07 18.93C11.59 18.64 12.43 18.64 12.94 18.93L17.82 21.64C19.4 22.52 20.69 21.76 20.69 19.95V5.86C20.68 3.74 18.95 2 16.82 2Z" stroke="#E8AA33" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>

            <!-- post action button delete -->
            <button @click="showDeleteModal" v-if="buttonDelete" class="post-action-delete">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 5.98047C17.67 5.65047 14.32 5.48047 10.98 5.48047C9 5.48047 7.02 5.58047 5.04 5.78047L3 5.98047" stroke="#E0DBDB" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="#E0DBDB" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M18.85 9.13965L18.2 19.2096C18.09 20.7796 18 21.9996 15.21 21.9996H8.79002C6.00002 21.9996 5.91002 20.7796 5.80002 19.2096L5.15002 9.13965" stroke="#E0DBDB" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.33 16.5H13.66" stroke="#E0DBDB" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.5 12.5H14.5" stroke="#E0DBDB" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </section>

        <!-- delete post modal -->
        <section v-if="isDeleteModal" class="delete-post-modal">
            <h2 class="delete-post-modal-question">Are you sure about deleting your post?</h2>
            <div class="delete-post-modal-buttons">
                <button @click="DeletePost(post._id)" class="delete-post-modal-button-yes">
                    <!-- loading -->
                    <AppLoading class="loading-button" v-if="loadingButton" color="#F8F1E7" backgroundColor="#AF2525"/>
                    Yes, delete my post.
                </button>
                <button @click="hideDeleteModal" class="delete-post-modal-button-no">No, turn back!</button>
            </div>
        </section>
    </article>
</template>

<style scoped>
/* post */
.post {
    width: 100%;
    border-radius: 10px;
    display: grid;
    position: relative;
    grid-template-columns: auto 40px;
    background-color: #39312f;
}

/* post content */
.post-content {
    height: 100%;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

/* post content top */
.post-content-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* post content top category */
.post-content-top-category {
    text-decoration: none;
    font-size: .8rem;
    opacity: 50%;
    color: var(--light);
}

/* post content top time */
.post-content-top-time {
    font-size: .8rem;
    opacity: 50%;
    color: var(--light);
}

/* post content text */
.post-content-text {
    margin: 15px 0;
    font-size: .9rem;
    word-spacing: 2px;
    line-height: 18px;
    color: var(--light);
    white-space: pre-line;
}
.post-content-text > a{
    text-decoration: none;
    color: var(--yellow);
}

/* post content username */
.post-content-username {
    text-decoration: none;
    font-size: .8rem;
    opacity: 50%;
    color: var(--light);
}

/* post action */
.post-action {
    height: 100%;
    padding: 10px 8px;
    border-radius: 10px;
    background-color: #3d3533;
}

/* post action button */
.post-action > button {
    margin-bottom: 20px;
    background-color: transparent;
    outline: none;
    border: none;
    cursor: pointer;
}
.post-action-comment {
    margin-bottom: 20px;
    background-color: transparent;
    outline: none;
    border: none;
    cursor: pointer;
}

.delete-post-modal {
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(248,241,231,0.6);
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
}
.delete-post-modal-question {
    font-size: 1rem;
    font-weight: 600;
    word-spacing: 2px;
    color: var(--dark);
}
.delete-post-modal-buttons {
    margin-top: 20px;
    display: flex;
    gap: 30px;
}
.delete-post-modal-button-yes {
    padding: 5px 10px;
    font-weight: 600;
    color: var(--light);
    background-color: var(--red);
    border: 2px solid var(--red);
    border-radius: 7px;
    cursor: pointer;
    position: relative;
}
.delete-post-modal-button-yes:focus {
    outline: var(--red) solid 2px;
    outline-offset: 2px;
}
.delete-post-modal-button-yes:active {
    outline: var(--dark) solid 2px;
}
.loading-button {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 7px;
}

.delete-post-modal-button-no {
    padding: 5px 10px;
    font-weight: 600;
    color: var(--dark);
    background-color: transparent;
    border: 2px solid var(--dark);
    border-radius: 7px;
    cursor: pointer;
}
.delete-post-modal-button-no:focus {
    outline: var(--dark) solid 2px;
    outline-offset: 2px;
}
.delete-post-modal-button-no:active {
    outline: var(--dark) solid 2px;
}
</style>