<script setup>
import { commentValidate } from '../utils/FormValidation.js'
import { ref, inject, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const store = useStore();
const router = useRouter();
const axios = inject("Axios");
const CURRENT_USER = store.state.User;

const currentURL = window.location.hash;
const CURRENT_POST_ID = currentURL.substring(currentURL.lastIndexOf("/") + 1);
const CURRENT_POST = ref();
const postCommentPageComments = ref([]);
const postCommentPageErrors = ref([]);
const postCommentPageNewComment = ref();
const postCommentPagePostSectionLoading = ref(true);
const postCommentPageCommentBoxLoading = ref(true);
const postCommentPageButtonReplyLoading = ref(false);
const postCommentPageCommentsSectionLoading = ref(true);
const appPostButtonDeleteLoading = ref(false);
const appCommentButtonDeleteLoading = ref(false);
const isCurrentPostRepliedSuccessfully = ref(false);
const isCurrentPostNoComments = ref(false);

const Reply = () => {
    postCommentPageButtonReplyLoading.value = true;
    setTimeout(() => {
        if (commentValidate(postCommentPageNewComment.value).length === 0){
            axios.post(`/posts/${CURRENT_POST.value._id}/create-comment`, {comment: postCommentPageNewComment.value})
            .then(() => {
                postCommentPageErrors.value = [], 
                postCommentPageButtonReplyLoading.value = false;
                postCommentPageNewComment.value = null, 
                isCurrentPostRepliedSuccessfully.value = true,
                axios.post(`/notifications/${CURRENT_POST.value.userId._id}`, {actionType: 2, postId: CURRENT_POST_ID})
                .then((user) => {console.log(user);})
                .catch(() => {console.error})
                setTimeout(() => {
                    window.location.reload();
                }, 600);
            })
            .catch(() => {
                console.error,
                postCommentPageButtonReplyLoading.value = false, 
                postCommentPageErrors.value = []
            })
        } else {
            postCommentPageErrors.value = commentValidate(postCommentPageNewComment.value);
            postCommentPageButtonReplyLoading.value = false;
        }
    }, 300);
}

const DeletePost = (postId) => {
    appPostButtonDeleteLoading.value = true;
    setTimeout(() => {
        axios.delete(`/posts/${postId}`)
        .then(() => {
            appPostButtonDeleteLoading.value = false,
            router.go(-1);
        })
        .catch(() => {
            console.error, 
            appPostButtonDeleteLoading.value = false
        })
    }, 300);
}

const DeleteComment = (postId, commentId) => {
    appCommentButtonDeleteLoading.value = true;
    setTimeout(() => {
        axios.delete(`/posts/${postId}/${commentId}`)
        .then(() => {
            appCommentButtonDeleteLoading.value = false,
            postCommentPageComments.value = postCommentPageComments.value.filter(
                (postCommentPageComment) => {
                postCommentPageComment._id !== commentId
            })
        })
        .catch(() => {
            console.error, 
            appCommentButtonDeleteLoading.value = false
        })
    }, 300);
}

onMounted(() => {
    setTimeout(() => {
        axios.get("/posts/")
        .then(response_postCommentPagePosts => { 
            response_postCommentPagePosts.data.forEach(response_postCommentPagePost => {
                if(response_postCommentPagePost._id === CURRENT_POST_ID){
                    CURRENT_POST.value = response_postCommentPagePost;
                    postCommentPageComments.value = CURRENT_POST.value.comments;
                    document.title = `Post from @${CURRENT_POST.value.userId.username} | Socurity`;
                }
            });
            postCommentPagePostSectionLoading.value = false;
            postCommentPageCommentBoxLoading.value = false;
            postCommentPageCommentsSectionLoading.value = false;
            CURRENT_POST.value.comments.length === 0 ? isCurrentPostNoComments.value = true : isCurrentPostNoComments.value = false;
        })
        .catch(() => {
            console.error,
            postCommentPagePostSectionLoading.value = false;
            postCommentPageCommentBoxLoading.value = false;
            postCommentPageCommentsSectionLoading.value = false;
        })
    }, 300);
})
</script>

<template>
    <AppButtonBack class="app-button-back"/>
    <section class="post-section">
        <AppLoading v-if="postCommentPagePostSectionLoading" />
        <AppPost 
        v-if="CURRENT_POST" 
        :post="CURRENT_POST" 
        :isMainPost="true" 
        :DeletePost="DeletePost" 
        :loadingButton="appPostButtonDeleteLoading" />
    </section>
    <main class="main-line">
        <div class="line">
            <h3>Comments</h3>
        </div>
    </main>
    <section class="comment-box">
        <p 
        v-if="CURRENT_POST" 
        class="comment-replying">
        replying to 
        <router-link 
        :to="CURRENT_USER._id === CURRENT_POST.userId._id ? '/profile' : `/explore/${CURRENT_POST.userId.username}`">
        @{{CURRENT_POST.userId.username}}
        </router-link></p>
        <textarea 
        v-model="postCommentPageNewComment" 
        name="comment" 
        id="comment" 
        placeholder="add a comment..." 
        maxlength="600"></textarea>
        <p 
        v-for="error in postCommentPageErrors" 
        :key="error" 
        class="form-error">
        &#10007; {{error}}</p>
        <p 
        v-if="isCurrentPostRepliedSuccessfully" 
        class="form-success">
        &#10003; comment published successfully</p>
        <div class="comment-box-bottom">
            <router-link to="/profile" class="comment-box-username">
            @{{CURRENT_USER.username}}</router-link>
            <button @click="Reply" class="button-comment">
                <AppLoading 
                class="loading-button" 
                v-if="postCommentPageButtonReplyLoading" 
                color="#F8F1E7" 
                backgroundColor="#352D2B"/>
                Reply
            </button>
        </div>
    </section>
    <main class="main">
        <AppLoading v-if="postCommentPageCommentsSectionLoading" />
        <InfoAlert 
        v-if="isCurrentPostNoComments" 
        message="There is no any comments. Let's be first one!" />
        <section v-if="CURRENT_POST" class="comments">
            <AppComment 
            v-for="comment in postCommentPageComments" 
            :key="comment._id" 
            :comment="comment" 
            :post="CURRENT_POST" 
            :DeleteComment="DeleteComment" 
            :loadingButtonComment="appCommentButtonDeleteLoading" />
        </section>
    </main>
</template>

<style scoped>
.app-button-back {
    margin-bottom: 20px;
}
.post-section {
    padding-bottom: 12px;
    height: max-content;
    display: flex;
    align-items: center;
    justify-content: center;
}
.line {
    display:block;
    margin: 30px 0;
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
.comment-box {
    width: 100%;
    display: flex;
    flex-direction: column;
}
#comment {
    width: 100%;
    padding: 10px 15px;
    color: var(--dark);
    font-size: .9rem;
    font-weight: var(--bold);
    resize: none;
    background-color: transparent;
    border: 2px solid var(--dark);
    border-radius: 10px;
    outline: none;
}
::placeholder {
    font-size: .9rem;
    opacity: .7;
    font-weight: var(--bold);
    color: var(--dark);
}
#comment:focus {
    border: 2px solid var(--yellow);
    box-shadow: 0 0 1px 1px var(--yellow);
}
.form-error {
    color: var(--red);
    font-size: .7rem;
    font-weight: var(--bold);
    margin-top: 5px;
}
.form-success {
    color: var(--green);
    font-size: .7rem;
    font-weight: var(--bold);
    margin-top: 5px;
}
.comment-box-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.comment-box-username {
    text-decoration: none;
    font-size: .8rem;
    font-weight: var(--bold);
    color: var(--dark);
}
.button-comment {
    margin-top: 10px;
    padding: 3px 10px;
    font-size: .9rem;
    font-weight: var(--bold);
    color: var(--light);
    background-color: var(--dark);
    border: 2px solid var(--dark);
    border-radius: 10px;
    cursor: pointer;
    position: relative;
}
.button-comment:focus {
    outline: var(--dark) solid 2px;
    outline-offset: 2px;
}
.button-comment:active {
    outline: var(--yellow) solid 2px;
}
.loading-button {
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 10px;
    left: 0;
    top: 0;
}
.main {
    margin-top: 30px;
    padding-bottom: 96px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.comments {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.comment-replying {
    margin-bottom: 10px;
    font-size: .9rem;
    font-weight: var(--bold);
    word-spacing: 2px;
    line-height: 18px;
    color: var(--dark);
}
.comment-replying > a{
    text-decoration: none;
    color: var(--yellow);
}
</style>