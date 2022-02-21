<script setup>
import { ref, inject, onMounted } from 'vue';
const axios = inject("Axios");

const isUnreadNotifications = ref(false);

onMounted(() => {
    axios.get("/notifications")
    .then(response_notifications => {
        response_notifications.data.forEach(response_notification => {
            if(!response_notification.isRead) isUnreadNotifications.value = true 
        });
    })
    .catch(() => {console.error})
});
</script>

<template>
    <nav class="navbar">
        <router-link class="navbar-menu-link" active-class="active-navbar-menu-link" data-menu-name="feed" to="/feed">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.02 2.84016L3.63 7.04016C2.73 7.74016 2 9.23016 2 10.3602V17.7702C2 20.0902 3.89 21.9902 6.21 21.9902H17.79C20.11 21.9902 22 20.0902 22 17.7802V10.5002C22 9.29016 21.19 7.74016 20.2 7.05016L14.02 2.72016C12.62 1.74016 10.37 1.79016 9.02 2.84016Z" stroke="#F2EEEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 17.9902V14.9902" stroke="#F2EEEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </router-link>
    
        <router-link class="navbar-menu-link" active-class="active-navbar-menu-link" data-menu-name="explore" to="/explore">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z" stroke="#F2EEEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z" stroke="#F2EEEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>                            
        </router-link>
    
        <router-link v-if="$route.name !== 'Publish'" class="navbar-menu-link" active-class="active-navbar-menu-link" data-menu-name="publish" to="/publish">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 12H16" stroke="#352D2B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 16V8" stroke="#352D2B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#352D2B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>    
        </router-link>
    
        <router-link class="navbar-menu-link" active-class="active-navbar-menu-link" data-menu-name="library" to="/library">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 8.98987V20.3499C16 21.7999 14.96 22.4099 13.69 21.7099L9.76001 19.5199C9.34001 19.2899 8.65999 19.2899 8.23999 19.5199L4.31 21.7099C3.04 22.4099 2 21.7999 2 20.3499V8.98987C2 7.27987 3.39999 5.87988 5.10999 5.87988H12.89C14.6 5.87988 16 7.27987 16 8.98987Z" stroke="#F2EEEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22 5.10999V16.47C22 17.92 20.96 18.53 19.69 17.83L16 15.77V8.98999C16 7.27999 14.6 5.88 12.89 5.88H8V5.10999C8 3.39999 9.39999 2 11.11 2H18.89C20.6 2 22 3.39999 22 5.10999Z" stroke="#F2EEEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </router-link>

        <router-link :class="isUnreadNotifications && $route.name !== 'Notifications' ? 'navbar-menu-link navbar-menu-link-sign' : 'navbar-menu-link' " active-class="active-navbar-menu-link" data-menu-name="notifications" to="/notifications">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.02 2.90991C8.70997 2.90991 6.01997 5.59991 6.01997 8.90991V11.7999C6.01997 12.4099 5.75997 13.3399 5.44997 13.8599L4.29997 15.7699C3.58997 16.9499 4.07997 18.2599 5.37997 18.6999C9.68997 20.1399 14.34 20.1399 18.65 18.6999C19.86 18.2999 20.39 16.8699 19.73 15.7699L18.58 13.8599C18.28 13.3399 18.02 12.4099 18.02 11.7999V8.90991C18.02 5.60991 15.32 2.90991 12.02 2.90991Z" stroke="#F2EEEB" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
            <path d="M13.87 3.19994C13.56 3.10994 13.24 3.03994 12.91 2.99994C11.95 2.87994 11.03 2.94994 10.17 3.19994C10.46 2.45994 11.18 1.93994 12.02 1.93994C12.86 1.93994 13.58 2.45994 13.87 3.19994Z" stroke="#F2EEEB" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15.02 19.0601C15.02 20.7101 13.67 22.0601 12.02 22.0601C11.2 22.0601 10.44 21.7201 9.90002 21.1801C9.36002 20.6401 9.02002 19.8801 9.02002 19.0601" stroke="#F2EEEB" stroke-width="1.5" stroke-miterlimit="10"/>
            </svg>
        </router-link>
    
        <router-link class="navbar-menu-link" active-class="active-navbar-menu-link" data-menu-name="profile" to="/profile">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.16 10.87C12.06 10.86 11.94 10.86 11.83 10.87C9.45 10.79 7.56 8.84 7.56 6.44C7.56 3.99 9.54 2 12 2C14.45 2 16.44 3.99 16.44 6.44C16.43 8.84 14.54 10.79 12.16 10.87Z" stroke="#F2EEEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z" stroke="#F2EEEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </router-link>
    </nav>
</template>

<style scoped>
.navbar {
    width: 100%;
    height: 60px;
    position: fixed;
    bottom: 0px;
    left: 50%;
    z-index: 50;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    transform: translateX(-50%);
    background: rgba(53,45,43,0.6);
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
}
@media screen and (min-width: 520px) {
    body {
        padding-bottom: 100px;
    }
    .navbar {
        width: 500px;
        border-radius: 10px;
        bottom: 20px;
    }
}
.navbar-menu-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
}
.navbar-menu-link[data-menu-name="publish"] {
    width: 60px;
    height: 60px;
    position: absolute;
    top: -150%;
    right: 16px;
    border-radius: 30px;
    background: rgba(232,170,51,0.9);
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
}
.navbar-menu-link-sign::after {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: 50%;
    position: absolute;
    top: 29%;
    background: var(--yellow);
}
@keyframes menu-animation {
    0% {margin-bottom: 0;}
    50% {margin-bottom: 10px;}
    100% {margin-bottom: 0;}
}
@keyframes menu-animation-after {
    0% {opacity: 0;}
    100% {opacity: 1;}
}
.active-navbar-menu-link {
    animation: menu-animation 1s;
}
.active-navbar-menu-link::after {
    content: attr(data-menu-name);
    font-size: .6rem;
    font-weight: 700;
    color: var(--light);
    animation: menu-animation-after 1s;
}
</style>