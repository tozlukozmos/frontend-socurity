<script setup>
import { signupValidate } from '../utils/FormValidation.js'
import { ref, inject, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const axios = inject("Axios");

const loadingButtonSignup = ref(false);
const errors = ref([]);
const User = ref({
    username: null,
    email: null,
    password: null
});

const Signup = () => {
    loadingButtonSignup.value = true;
    setTimeout(() => {
        const errorCount = ref(0);
        signupValidate(User.value).forEach(userPropertyErrors => {
            if(userPropertyErrors.length !== 0){
                errorCount.value++;
            }
        });
        if (errorCount.value === 0){
            axios.post("/users", User.value)
            .then(() => {
                errors.value = [[], [], []], 
                loadingButtonSignup.value = false;
                router.push({ name: "Login" });
                User.value = {
                    username: null,
                    email: null,
                    password: null
                }
            })
            .catch(() => {
                loadingButtonSignup.value = false, 
                console.error,
                errors.value = [[], [], []],
                errors.value[0].push("username and/or email already exist!");
                errors.value[1].push("username and/or email already exist!");
            })
        } else {
            errors.value = signupValidate(User.value);
            loadingButtonSignup.value = false;
        }
    }, 300);
};

onMounted(() => {
    document.title = "Sign up | Socurity";
})
</script>

<template>
    <AppButtonBack/>
    <main class="main">
        <h1 class="title-signup">Sign up</h1>
        <form class="form-signup" action="POST">
            <div class="box-username">
                <label for="username">username<span>*</span></label>
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
            <div class="box-email">
                <label for="email">email<span>*</span></label>
                <input 
                v-model="User.email"
                type="email" 
                name="email" 
                id="email" 
                placeholder="name@domain.com">
                <p 
                v-for="error in errors[1]" 
                :key="error" 
                class="form-error">&#10007; {{error}}</p>
            </div>
            <div class="box-password">
                <label for="password">password<span>*</span></label>
                <input 
                v-model="User.password" 
                type="password" 
                name="password" 
                id="password" 
                placeholder="must have at least 6 characters">
                <p 
                v-for="error in errors[2]" 
                :key="error" 
                class="form-error">&#10007; {{error}}</p>
            </div>
        </form>
        <button @click="Signup" class="button-signup">
            <AppLoading 
            class="loading-button" 
            v-if="loadingButtonSignup" 
            color="#F8F1E7" 
            backgroundColor="#352D2B"/>
            Sign up
        </button>
        <h3 class="question-text">
            Already have an account? 
            <router-link to="/login">Log in</router-link>
        </h3>
    </main>
</template>

<style scoped>
.main {
    padding-bottom: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.title-signup {
    color: var(--dark);
}
.form-signup {
    width: 300px;
    margin: 30px;
}
.box-username,
.box-email,
.box-password {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
}
label[for=username],
label[for=email],
label[for=password] {
    color: var(--dark);
    font-size: 1rem;
    font-weight: var(--bold);
} 
label[for=username] > span,
label[for=email] > span,
label[for=password] > span {
    margin-left: 10px;
    color: var(--yellow);
    font-size: 1rem;
    font-weight: var(--bold);
} 
#username,
#email,
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
#email:focus,
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
.button-signup {
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
.button-signup:focus {
    outline: var(--dark) solid 2px;
    outline-offset: 2px;
}
.button-signup:active {
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