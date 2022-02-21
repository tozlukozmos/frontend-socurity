<script setup>
import { editProfileValidate } from '../utils/FormValidation.js'
import { ref, inject, onMounted } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const store = useStore();
const router = useRouter();
const axios = inject("Axios");
const CURRENT_USER = store.state.User;
const currentUserTokens = CURRENT_USER.tokens;

const editProfilePageButtonLoading = ref(false);
const editProfilePageErrors = ref([]);
const User = ref({
    username: CURRENT_USER.username,
    place: CURRENT_USER.place || "",
    department: CURRENT_USER.department || "",
    profession: CURRENT_USER.profession || "",
    email: CURRENT_USER.email || ""
});

const Save = () => {
    editProfilePageButtonLoading.value = true;
    setTimeout(() => {
        const errorCount = ref(0);
        editProfileValidate(User.value).forEach(userPropertyErrors => {
            if(userPropertyErrors.length !== 0){
                errorCount.value++;
            }
        });
        if (errorCount.value === 0){
            axios.patch("/users", User.value)
            .then(response_updatedUser => {
                editProfilePageErrors.value = [[], []], 
                editProfilePageButtonLoading.value = false;
                User.value = {
                    username: CURRENT_USER.username,
                    place: CURRENT_USER.place || "",
                    department: CURRENT_USER.department || "",
                    profession: CURRENT_USER.profession || "",
                    email: CURRENT_USER.email || ""
                },
                store.commit('setUser', {...response_updatedUser.data, tokens: currentUserTokens}), 
                router.push({ name: "Profile"})
            })
            .catch(() => {
                editProfilePageButtonLoading.value = false, 
                console.error,
                editProfilePageErrors.value = [[], []],
                editProfilePageErrors.value[0].push("username and/or email already exist!");
                editProfilePageErrors.value[1].push("username and/or email already exist!");
            })
        } else {
            editProfilePageErrors.value = editProfileValidate(User.value);
            editProfilePageButtonLoading.value = false;
        }
    }, 300);
};

onMounted(() => {
    document.title = "Edit Profile | Socurity";
})
</script>

<template>
    <AppButtonBack/>
    <main class="main">
        <h1 class="title-edit">Edit Profile</h1>
        <form class="form-edit" action="PATCH">
            <div class="box-username">
                <label for="username">username</label>
                <input 
                v-model="User.username" 
                type="text" 
                name="username" 
                id="username" 
                placeholder="e.g. albert_einstein, alex, nikola, ...">
                <p 
                v-for="error in editProfilePageErrors[0]" 
                :key="error" 
                class="form-error">&#10007; {{error}}</p>
            </div>
            <div class="box-place">
                <label for="place">place</label>
                <input 
                v-model="User.place" 
                type="text" 
                name="place" 
                id="place" 
                placeholder="e.g. Turkey, Microsoft, Harvard University, ...">
            </div>
            <div class="box-department">
                <label for="department">department</label>
                <input 
                v-model="User.department" 
                type="text" 
                name="department" 
                id="department" 
                placeholder="e.g. Biology, Literature, Sport, ...">
            </div>
            <div class="box-profession">
                <label for="profession">profession</label>
                <input 
                v-model="User.profession" 
                type="text" 
                name="profession" 
                id="profession" 
                placeholder="e.g. Student, Professor, Software Developer, ...">
            </div>
            <div class="box-email">
                <label for="email">email</label>
                <input 
                v-model="User.email" 
                type="email" 
                name="email" 
                id="email" 
                placeholder="e.g. name@domain.com">
                <p 
                v-for="error in editProfilePageErrors[1]" 
                :key="error" 
                class="form-error">&#10007; {{error}}</p>
            </div>
        </form>
        <button @click="Save" class="button-save">
            <AppLoading 
            class="loading-button" 
            v-if="editProfilePageButtonLoading" 
            color="#F8F1E7" 
            backgroundColor="#352D2B"/>
            Save
        </button>
    </main>
</template>

<style scoped>
.main {
    padding-bottom: 96px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.title-edit {
    color: var(--dark);
}
.form-edit {
    min-width: 300px;
    margin: 30px;
}
.box-username,
.box-place,
.box-department,
.box-profession,
.box-email {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
}
label[for=username],
label[for=place],
label[for=department],
label[for=profession],
label[for=email] {
    color: var(--dark);
    font-size: 1rem;
    font-weight: var(--bold);
} 
#username,
#place,
#department,
#profession,
#email {
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
#place:focus,
#department:focus,
#profession:focus,
#profession:focus {
    border: 2px solid var(--yellow);
    box-shadow: 0 0 1px 2px var(--yellow);
}
.form-error {
    color: var(--red);
    font-size: .7rem;
    font-weight: var(--bold);
    margin-top: 5px;
}
.button-save {
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
.button-save:focus {
    outline: var(--dark) solid 2px;
    outline-offset: 2px;
}
.button-save:active {
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
</style>