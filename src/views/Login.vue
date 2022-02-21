<script setup>
import { loginValidate } from '../utils/FormValidation.js'
import { ref, inject, onMounted } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const axios = inject("Axios");
const store = useStore();
const router = useRouter();

const loadingButtonLogin = ref(false);
const errors = ref([]);
const User = ref({
    username: null,
    password: null
});

const Login = () => {
    loadingButtonLogin.value = true;
    setTimeout(() => {
        const errorCount = ref(0);
        loginValidate(User.value).forEach(userPropertyErrors => {
            if(userPropertyErrors.length !== 0){
                errorCount.value++;
            }
        });
        if (errorCount.value === 0){
            axios.post("/users/login", User.value)
            .then(user => {
                errors.value = [[], []], 
                loadingButtonLogin.value = false;
                router.push({ name: "Login" });
                User.value = {
                    username: null,
                    email: null,
                    password: null
                },
                axios.defaults.headers.Authorization = `Bearer ${user.data?.tokens?.access_token}`;
                store.commit("setUser", user.data);
                router.push({ name: "Feed" });
            })
            .catch(() => {
                loadingButtonLogin.value = false, 
                console.error,
                errors.value = [[], []],
                errors.value[0].push("username and/or password wrong!");
                errors.value[1].push("username and/or password wrong!");
            })
        } else {
            errors.value = loginValidate(User.value);
            loadingButtonLogin.value = false;
        }
    }, 300);
};

onMounted(() => {
    document.title = "Log in | Socurity";
})
</script>

<template>
    <AppButtonBack/>
    <main class="main">
        <h1 class="title-login">Log in</h1>
        <form class="form-login" action="POST">
            <div class="box-username">
                <label for="username">username</label>
                <input 
                v-model="User.username" 
                type="text" 
                name="username" 
                id="username" 
                placeholder="your unique socurity name">
                <p 
                v-for="error in errors[0]" 
                :key="error" 
                class="form-error">&#10007; {{error}}</p>
            </div>
            <div class="box-password">
                <label for="password">password</label>
                <input 
                v-model="User.password" 
                type="password" 
                name="password" 
                id="password" 
                placeholder="must have at least 6 characters">
                <p 
                v-for="error in errors[1]" 
                :key="error" 
                class="form-error">&#10007; {{error}}</p>
            </div>
            <!-- <div class="box-remember-me">
                <input type="checkbox" name="remember-me" id="remember-me">
                <label for="remember-me">remember me</label>
            </div> -->
        </form>
        <button @click="Login" class="button-login">
            <AppLoading 
            class="loading-button" 
            v-if="loadingButtonLogin" 
            color="#F8F1E7" 
            backgroundColor="#352D2B"/>
            Log in
        </button>
        <h3 class="question-text">
            Don't have an account? 
            <router-link to="/signup">Sign up</router-link>
        </h3>
    </main>
</template>

<style scoped>
.main {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.title-login {
    font-size: 2rem;
    color: var(--dark);
}
.form-login {
    min-width: 300px;
    margin: 30px;
}
.box-username,
.box-password {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
}
.box-remember-me {
    display: flex;
    align-items: center;
}
.box-remember-me > input {
    appearance: none;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border: 2px solid var(--light);
    border-radius: 3px;
    position: relative;
    cursor: pointer;
}
.box-remember-me > input::before {
    content: "\2714";
    font-size: 12px;
    font-weight: var(--bold);
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    color: var(--dark);
    background-color: var(--yellow);
}
.box-remember-me > input:checked::before {
    transform: scale(1);
}
label[for=username],
label[for=password],
label[for=remember-me] {
    color: var(--dark);
    font-size: 1rem;
    font-weight: var(--bold);
} 
#username,
#password {
    padding: 10px 15px;
    color: var(--dark);
    font-size: 1rem;
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
#username:focus,
#password:focus {
    border: 2px solid var(--yellow);
    box-shadow: 0 0 1px 2px var(--yellow);
}
.form-error {
    color: var(--red);
    font-size: .7rem;
    font-weight: var(--bold);
    margin-top: 5px;
}
.button-login {
    min-width: 300px;
    font-size: 1.5rem;
    font-weight: var(--bold);
    color: var(--light);
    background-color: var(--dark);
    border: 2px solid var(--dark);
    border-radius: 10px;
    cursor: pointer;
    position: relative;
}
.button-login:focus {
    outline: var(--dark) solid 2px;
    outline-offset: 2px;
}
.button-login:active {
    outline: var(--yellow) solid 2px;
}
.loading-button {
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 10px;
}
.question-text {
    margin-top: 30px;
    color: var(--dark);
    font-size: 1rem;
    font-weight: var(--bold);
}
.question-text > a {
    text-decoration: none;
    color: var(--yellow);
}
</style>