<script setup>
import { ref, inject, onMounted } from 'vue';
import { useStore } from 'vuex';
const axios = inject("Axios");
const store = useStore();
const CURRENT_USER = store.state.User;

const notificationsPageNotifications = ref([]);
const notificationsPageLoading = ref(true);
const notificationsPageInfoAlert = ref(false);

onMounted(() => {
    document.title = "Notifications | Socurity";
    setTimeout(() => {
        axios.get("/notifications")
        .then(response_notificationsPageNotifications => {
            response_notificationsPageNotifications.data.forEach(response_notificationsPageNotification => {
                if (response_notificationsPageNotification.sender._id !== CURRENT_USER._id) {
                    notificationsPageNotifications.value.push(response_notificationsPageNotification)
                }
            });
            notificationsPageLoading.value = false,
            notificationsPageNotifications.value.length === 0 ? notificationsPageInfoAlert.value = true : notificationsPageInfoAlert.value = false
            setTimeout(() => {
                axios.patch("/notifications", {notifications: notificationsPageNotifications.value})
                .catch((err) => {console.error(err)})
            }, 300);
        })
        .catch((err) => {
            notificationsPageLoading.value = false, 
            console.error(err);
        })
    }, 300);
});
</script>

<template>
    <AppButtonBack/>
    <AppNavbar/>
    <main class="main-notifications">
        <AppLoading v-if="notificationsPageLoading"/>
        <InfoAlert 
        v-if="notificationsPageInfoAlert" 
        message="There is no any notifications."/>
        <AppNotificationCard 
        v-for="notification in notificationsPageNotifications" 
        :notification="notification" 
        :key="notification._id"/>
    </main>
</template>

<style scoped>
.main-notifications {
    margin-top: 20px;
    padding-bottom: 96px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>