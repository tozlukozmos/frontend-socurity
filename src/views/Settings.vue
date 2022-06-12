<script setup>
import { settingsValidate } from '../utils/FormValidation.js'
import { ref, inject, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const axios = inject("Axios");
const store = useStore();
const router = useRouter();
const CURRENT_USER = store.state.User;
const tokens = CURRENT_USER.tokens;

const settingsPageErrors = ref([]);
const settingsPageButtonSaveLoading = ref(false);
const settingsPageButtonDeleteLoading = ref(false);
const settingsPageModalDelete = ref(false);
const isCurrentPasswordUpdatedSuccessfully = ref(false);

const User = ref({
    password: null
});

const Save = () => {
    settingsPageButtonSaveLoading.value = true;
    setTimeout(() => {
        if (settingsValidate(User.value).length === 0){
            axios.post("/users/change-password", User.value)
            .then(response_updatedCurrentUser => {
                settingsPageErrors.value = [], 
                settingsPageButtonSaveLoading.value = false;
                User.value = {
                    password: null
                },
                store.commit('setUser', {...response_updatedCurrentUser.data, tokens}) 
                isCurrentPasswordUpdatedSuccessfully.value = true,
                setTimeout(() => {
                    router.push({ name: "Profile"})
                }, 600);
            })
            .catch(() => {
                console.error,
                settingsPageErrors.value = [],
                settingsPageButtonSaveLoading.value = false
            })
        } else {
            settingsPageErrors.value = settingsValidate(User.value);
            settingsPageButtonSaveLoading.value = false;
        }
    }, 300);
};

const DeleteAccount = (userId) => {
    settingsPageButtonDeleteLoading.value = true;
    setTimeout(() => {
        axios.delete(`/users/${userId}`)
        .then(() => {
            settingsPageButtonDeleteLoading.value = false,
            delete axios.defaults.headers.Authorization;
            window.localStorage.clear();
            store.commit('logoutUser');
            router.push({name: "Home"});
        })
        .catch(() => {
            console.error, 
            settingsPageButtonDeleteLoading.value = false
        })
    }, 300);
};

onMounted(() => {
    document.title = "Settigns | Socurity";
})
</script>

<template>
    <AppButtonBack/>
    <main v-if="!settingsPageModalDelete" class="main">
        <h1 class="title-settings">Settings</h1>
        <form class="form-settings" action="PATCH">
            <div class="box-password">
                <label for="password">new password</label>
                <input 
                v-model="User.password" 
                type="password" 
                name="password" 
                id="password" 
                placeholder="you know, do your best...">
                <p 
                v-for="error in settingsPageErrors" 
                :key="error" 
                class="form-error">
                &#10007; {{error}}</p>
                <p 
                v-if="isCurrentPasswordUpdatedSuccessfully" 
                class="form-success">
                &#10003; password changed successfully</p>
            </div>
        </form>
        <button @click="Save" class="button-save">
            <AppLoading 
            class="loading-button" 
            v-if="settingsPageButtonSaveLoading" 
            color="#F8F1E7" 
            backgroundColor="#352D2B"/>
            Save
        </button>
        <button 
        @click="settingsPageModalDelete = true" 
        class="button-delete-account">
        Delete account</button>
    </main>
    <main class="main-modal">
        <section v-if="settingsPageModalDelete" class="delete-account-modal">
            <h2 class="delete-account-modal-question">
            Are you sure about deleting your account permanently?</h2>
            <div class="delete-account-modal-buttons">
                <button 
                @click="DeleteAccount(CURRENT_USER._id)" 
                class="delete-account-modal-button-yes">
                    <AppLoading 
                    class="loading-delete-button" 
                    v-if="settingsPageButtonDeleteLoading" 
                    color="#F8F1E7" 
                    backgroundColor="#AF2525"/>
                    Yes, delete my account permanently.
                </button>
                <button 
                @click="settingsPageModalDelete = false" 
                class="delete-account-modal-button-no">
                No, turn back!</button>
            </div>
        </section>
    </main>
</template>

<style scoped>
.main {
    margin-top: 20px;
    padding-bottom: 96px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.title-settings {
    color: var(--dark);
}
.form-settings {
    min-width: 300px;
    margin: 30px;
}
.box-password {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
}
label[for=password] {
    color: var(--dark);
    font-size: 1rem;
    font-weight: var(--bold);
} 
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
.form-success {
    color: var(--green);
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
.main-modal {
    margin-top: 50px;
    padding-bottom: 96px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.delete-account-modal {
    width: 300px;
    padding: 16px;
    border-radius: 10px;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(53,45,43,0.6);
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
}
.delete-account-modal-question {
    font-size: 1rem;
    font-weight: var(--bold);
    word-spacing: 2px;
    color: var(--light);
}
.delete-account-modal-buttons {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 30px;
}
.delete-account-modal-button-yes {
    padding: 5px 10px;
    font-weight: var(--bold);
    color: var(--light);
    background-color: var(--red);
    border: 2px solid var(--red);
    border-radius: 7px;
    cursor: pointer;
    position: relative;
}
.delete-account-modal-button-yes:focus {
    outline: var(--red) solid 2px;
    outline-offset: 2px;
}
.delete-account-modal-button-yes:active {
    outline: var(--dark) solid 2px;
}
.loading-delete-button {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 7px;
}
.delete-account-modal-button-no {
    padding: 5px 10px;
    font-weight: var(--bold);
    color: var(--light);
    background-color: transparent;
    border: 2px solid var(--light);
    border-radius: 7px;
    cursor: pointer;
}
.delete-account-modal-button-no:focus {
    outline: var(--light) solid 2px;
    outline-offset: 2px;
}
.delete-account-modal-button-no:active {
    outline: var(--yellow) solid 2px;
}
.button-delete-account {
    min-width: 300px;
    margin-top: 96px;
    font-size: 1.5rem;
    font-weight: var(--bold);
    color: var(--light);
    background-color: var(--red);
    border: 2px solid var(--red);
    border-radius: 10px;
    cursor: pointer;
}
.button-delete-account:focus {
    outline: var(--red) solid 2px;
    outline-offset: 2px;
}
.button-delete-account:active {
    outline: var(--light) solid 2px;
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