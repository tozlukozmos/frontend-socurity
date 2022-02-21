<script setup>
import { useStore } from 'vuex';
const store = useStore();

const currentUser = store.state.User;

const props = defineProps({
    user: Object
});

const usernameRoute = currentUser._id === props.user._id ? '/profile' : `/explore/${props.user.username}`;
</script>

<template>
    <section class="profile-card">
        <div class="username-box">
            <router-link :to="usernameRoute" v-if="user.isVerified" class="verified-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.75 2.45031C11.44 1.86031 12.57 1.86031 13.27 2.45031L14.85 3.81031C15.15 4.07031 15.71 4.28031 16.11 4.28031H17.81C18.87 4.28031 19.74 5.15031 19.74 6.21031V7.91031C19.74 8.30031 19.95 8.87031 20.21 9.17031L21.57 10.7503C22.16 11.4403 22.16 12.5703 21.57 13.2703L20.21 14.8503C19.95 15.1503 19.74 15.7103 19.74 16.1103V17.8103C19.74 18.8703 18.87 19.7403 17.81 19.7403H16.11C15.72 19.7403 15.15 19.9503 14.85 20.2103L13.27 21.5703C12.58 22.1603 11.45 22.1603 10.75 21.5703L9.17 20.2103C8.87 19.9503 8.31 19.7403 7.91 19.7403H6.18C5.12 19.7403 4.25 18.8703 4.25 17.8103V16.1003C4.25 15.7103 4.04 15.1503 3.79 14.8503L2.44 13.2603C1.86 12.5703 1.86 11.4503 2.44 10.7603L3.79 9.17031C4.04 8.87031 4.25 8.31031 4.25 7.92031V6.20031C4.25 5.14031 5.12 4.27031 6.18 4.27031H7.91C8.3 4.27031 8.87 4.06031 9.17 3.80031L10.75 2.45031Z" fill="#E8AA33" stroke="#352D2B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8.38 12.0001L10.79 14.4201L15.62 9.58008" stroke="#352D2B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </router-link>
            <router-link :to="usernameRoute" class="username">@{{user.username}}</router-link>
        </div>
        <div class="info-and-action-box">
            <div class="info-box">
                <div v-if="user.place" class="place-box">
                    <span class="place-icon">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.125 13.75H3.125C1.875 13.75 1.25 13.125 1.25 11.875V6.875C1.25 5.625 1.875 5 3.125 5H6.25V11.875C6.25 13.125 6.875 13.75 8.125 13.75Z" stroke="#352D2B" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6.31874 2.5C6.26874 2.6875 6.25 2.89375 6.25 3.125V5H3.125V3.75C3.125 3.0625 3.6875 2.5 4.375 2.5H6.31874Z" stroke="#352D2B" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.75 5V8.125" stroke="#352D2B" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M11.25 5V8.125" stroke="#352D2B" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10.625 10.625H9.375C9.03125 10.625 8.75 10.9062 8.75 11.25V13.75H11.25V11.25C11.25 10.9062 10.9688 10.625 10.625 10.625Z" stroke="#352D2B" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3.75 8.125V10.625" stroke="#352D2B" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6.25 11.875V3.125C6.25 1.875 6.875 1.25 8.125 1.25H11.875C13.125 1.25 13.75 1.875 13.75 3.125V11.875C13.75 13.125 13.125 13.75 11.875 13.75H8.125C6.875 13.75 6.25 13.125 6.25 11.875Z" stroke="#352D2B" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                    <h2 class="place">{{user.place}}</h2>
                </div>
                <div v-if="user.department" class="department-box">
                    <span class="department-icon">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.75 1.25C10 1.25 10.625 1.88125 10.625 3.14375V7.55C10.625 8.79375 9.74375 9.275 8.6625 8.625L7.8375 8.125C7.65 8.0125 7.35 8.0125 7.1625 8.125L6.3375 8.625C5.25625 9.275 4.375 8.79375 4.375 7.55V3.14375C4.375 1.88125 5 1.25 6.25 1.25H8.75Z" stroke="#352D2B" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M4.2625 3.11836C2.13125 3.47461 1.25 4.78711 1.25 7.43711V9.33086C1.25 12.4871 2.5 13.7496 5.625 13.7496H9.375C12.5 13.7496 13.75 12.4871 13.75 9.33086V7.43711C13.75 4.74336 12.8375 3.42461 10.625 3.09961" stroke="#352D2B" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                    <h2 class="department">{{user.department}}</h2>
                </div>
                <div v-if="user.profession" class="profession-box">
                    <span class="profession-icon">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.00001 13.75H10C12.5125 13.75 12.9625 12.7438 13.0938 11.5188L13.5625 6.51875C13.7313 4.99375 13.2938 3.75 10.625 3.75H4.37501C1.70626 3.75 1.26876 4.99375 1.43751 6.51875L1.90626 11.5188C2.03751 12.7438 2.48751 13.75 5.00001 13.75Z" stroke="#352D2B" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5 3.75V3.25C5 2.14375 5 1.25 7 1.25H8C10 1.25 10 2.14375 10 3.25V3.75" stroke="#352D2B" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.75 8.125V8.75C8.75 8.75625 8.75 8.75625 8.75 8.7625C8.75 9.44375 8.74375 10 7.5 10C6.2625 10 6.25 9.45 6.25 8.76875V8.125C6.25 7.5 6.25 7.5 6.875 7.5H8.125C8.75 7.5 8.75 7.5 8.75 8.125Z" stroke="#352D2B" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M13.5313 6.875C12.0875 7.925 10.4375 8.55 8.75 8.7625" stroke="#352D2B" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M1.63751 7.04297C3.04376 8.00547 4.63126 8.58672 6.25001 8.76797" stroke="#352D2B" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                    <h2 class="profession">{{user.profession}}</h2>
                </div>
                <div class="following-system-box">
                    <p>{{user.following.length}} following</p>
                    <p>{{user.followers.length}} followers</p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.profile-card {
    min-width: 210px;
    height: 210px;
    margin-top: 20px;
    padding-right: 16px;
    border-radius: 10px;
    display: flex;
    position: relative;
    flex-shrink: 0;
    flex-direction: column;
    /* background: rgba(53, 45, 43, 0.4); */
}
.username-box,
.place-box,
.department-box,
.profession-box {
    display: flex;
}
.verified-icon {
    display: flex;
    align-items: center;
    margin-right: 15px;
    position: relative;
    cursor: pointer;
}
.username {
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: var(--bold);
    word-spacing: 2px;
    color: var(--dark);
}
.info-and-action-box {
    margin: 20px 0;
}
.place,
.department,
.profession {
    margin-left: 15px;
    font-size: .9rem;
    font-weight: var(--bold);
    word-spacing: 2px;
    color: var(--dark);
}
.info-and-action-box {
    display: flex;
    justify-content: space-between;
}
.following-system-box {
    margin-top: 20px;
    display: inline-block;
    position: absolute;
    bottom: 16px;
}
.following-system-box > p{
    margin-right: 15px;
    display: inline-block;
    font-size: .9rem;
    font-weight: var(--bold);
    word-spacing: 2px;
    color: var(--dark);
}
</style>