<script setup>
import { publishValidate } from '../utils/FormValidation.js'
import { ref, inject, onMounted } from "vue";
import { useStore } from "vuex";
import router from '../router/router.js';
const axios = inject("Axios");
const store = useStore();
const CURRENT_USER = store.state.User;

const publishPageErrors = ref([]);
const publishPageButtonLoading = ref(false);
const publishPageSuccessMessage = ref(false);
const Post = ref({
    category: null,
    text: null 
});

const Publish = () => {
    publishPageButtonLoading.value = true;
    setTimeout(() => {
        const errorCount = ref(0);
        publishValidate(Post.value).forEach(postPropertyErrors => {
            if(postPropertyErrors.length !== 0){
                errorCount.value++;
            }
        });
        if (errorCount.value === 0){
            axios.post("/posts", Post.value)
            .then(() => {
                publishPageErrors.value = [[], []], 
                publishPageButtonLoading.value = false;
                Post.value = {
                    category: null,
                    text: null
                },
                publishPageSuccessMessage.value = true;
                setTimeout(() => {
                    router.push({name: "Profile"});
                }, 600);
            })
            .catch(() => {
                publishPageButtonLoading.value = false, 
                console.error,
                publishPageErrors.value = [[], []]
            })
        } else {
            publishPageErrors.value = publishValidate(Post.value);
            publishPageButtonLoading.value = false;
        }
    }, 300);
};

onMounted(() => {
    document.title = "Let's create a new post! | Socurity";
})
</script>

<template>
    <AppButtonBack/>
    <AppNavbar/>
    <main class="main">
        <section class="category-box">
            <label for="category">category</label>
            <input 
            v-model="Post.category" 
            type="text" 
            name="category" 
            id="category" 
            placeholder="what is the post related to? e.g. personal, math, biology, philosophy,...">
            <p 
            v-for="error in publishPageErrors[0]" 
            :key="error" 
            class="form-error">&#10007; {{error}}</p>
            <p 
            v-if="publishPageSuccessMessage" 
            class="form-success">&#10003; post published successfully</p>
        </section>
        <section class="create-post-box">
            <label for="post">post</label>
            <textarea 
            v-model="Post.text" 
            name="post" 
            id="post" 
            placeholder="we cannot wait to hear what do you think at the moment! Let's create a post!" 
            maxlength="600">
            </textarea>
            <p 
            v-for="error in publishPageErrors[1]" 
            :key="error" 
            class="form-error">&#10007; {{error}}</p>
            <p 
            v-if="publishPageSuccessMessage" 
            class="form-success">&#10003; post published successfully</p>
            <div class="create-post-box-bottom">
                <router-link 
                to="/profile" 
                class="create-post-box-username">
                @{{CURRENT_USER.username}}
                </router-link>
                <button @click="Publish" class="button-publish">
                    <AppLoading 
                    class="loading-button" 
                    v-if="publishPageButtonLoading" 
                    color="#F8F1E7" 
                    backgroundColor="#352D2B"/>
                    Publish
                </button>
            </div>
        </section>
    </main>
</template>

<style scoped>
.main {
    padding-bottom: 190px;
}
.category-box {
    margin-top: 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
}
label[for=category],
label[for=post] {
    color: var(--dark);
    font-size: 1rem;
    font-weight: var(--bold);
    margin-bottom: 10px;
} 
#category {
    padding: 10px 15px;
    color: var(--dark);
    font-size: .9rem;
    font-weight: var(--bold);
    background-color: transparent;
    border: 2px solid var(--dark);
    border-radius: 10px;
    outline: none;
}
::placeholder {
    font-size: 1rem;
    color: var(--dark);
    opacity: .7;
    font-weight: var(--bold);
}
#category:focus {
    border: 2px solid var(--yellow);
    box-shadow: 0 0 1px 2px var(--yellow);
}
.create-post-box {
    width: 100%;
    margin: 20px 0;
    display: flex;
    flex-direction: column;
}
#post {
    width: 100%;
    height: 200px;
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
    color: var(--dark);
    opacity: .7;
}
#post:focus {
    border: 2px solid var(--yellow);
    box-shadow: 0 0 1px 1px var(--yellow);
}
.create-post-box-bottom {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.create-post-box-username {
    text-decoration: none;
    font-size: .8rem;
    font-weight: var(--bold);
    color: var(--dark);
}
.button-publish {
    margin-top: 10px;
    padding: 5px 10px;
    font-size: .9rem;
    font-weight: var(--bold);
    color: var(--light);
    background-color: var(--dark);
    border: 2px solid var(--dark);
    border-radius: 10px;
    cursor: pointer;
    position: relative;
}
.button-publish:focus {
    outline: var(--dark) solid 2px;
    outline-offset: 2px;
}
.button-publish:active {
    outline: var(--yellow) solid 2px;
}
.loading-button {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 10px;
}
.form-error {
    font-weight: var(--bold);
    color: var(--red);
    font-size: .7rem;
    margin-top: 5px;
}
.form-success {
    color: var(--green);
    font-size: .7rem;
    margin-top: 5px;
}
</style>