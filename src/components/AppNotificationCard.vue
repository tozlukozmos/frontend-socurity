<script setup>
import moment from 'moment';
import { useStore } from 'vuex';
const store = useStore();
const CURRENT_USER = store.state.User;
const props = defineProps({
    notification: Object
});
const date = moment(props.notification.createdAt + '03:00', 'YYYY-MM-DD HH:mm:ssZ').fromNow();
const usernameRoute = CURRENT_USER._id === props.notification.sender._id ? '/profile' : `/explore/${props.notification.sender.username}`;
</script>

<template>
    <section class="notification-card">
        <div class="notification-card-info">
            <svg v-if="notification.actionType === 1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.16006 10.87C9.06006 10.86 8.94006 10.86 8.83006 10.87C6.45006 10.79 4.56006 8.84 4.56006 6.44C4.56006 3.99 6.54006 2 9.00006 2C11.4501 2 13.4401 3.99 13.4401 6.44C13.4301 8.84 11.5401 10.79 9.16006 10.87Z" stroke="#352D2B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16.41 4C18.35 4 19.91 5.57 19.91 7.5C19.91 9.39 18.41 10.93 16.54 11C16.46 10.99 16.37 10.99 16.28 11" stroke="#352D2B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.15997 14.56C1.73997 16.18 1.73997 18.82 4.15997 20.43C6.90997 22.27 11.42 22.27 14.17 20.43C16.59 18.81 16.59 16.17 14.17 14.56C11.43 12.73 6.91997 12.73 4.15997 14.56Z" stroke="#352D2B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.3401 20C19.0601 19.85 19.7401 19.56 20.3001 19.13C21.8601 17.96 21.8601 16.03 20.3001 14.86C19.7501 14.44 19.0801 14.16 18.3701 14" stroke="#352D2B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 10V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H14" stroke="#352D2B" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19.5 7C20.8807 7 22 5.88071 22 4.5C22 3.11929 20.8807 2 19.5 2C18.1193 2 17 3.11929 17 4.5C17 5.88071 18.1193 7 19.5 7Z" stroke="#352D2B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15.9965 11H16.0054" stroke="#352D2B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.9955 11H12.0045" stroke="#352D2B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.99451 11H8.00349" stroke="#352D2B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="notification-card-info-inside">
                <router-link
                :to="usernameRoute" 
                class="notification-card-username">
                @{{notification.sender.username}}
                </router-link>
                <p 
                v-if="notification.actionType === 1"
                class="notification-card-action-type">
                followed you
                </p>
                <router-link 
                v-else
                :to="`/explore/posts/${notification.postId}`" 
                class="notification-card-action-type">
                replied your post
                </router-link>
            </div>
        </div>
        <p class="notification-card-time">{{date}}</p>
    </section>
</template>

<style scoped>
.notification-card {
    width: 100%;
    margin-bottom: 20px;
    padding: 16px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.notification-card-info {
    display: flex;
    align-items: center;
}
.notification-card-info-inside {
    margin-left: 16px;
}
@media screen and (max-width: 520px) {
    .notification-card-info-inside {
        display: flex;
        flex-direction: column;
    }
}
.notification-card-username {
    margin-right: 8px;
    font-size: 1rem;
    font-weight: var(--bold);
    word-spacing: 2px;
    color: var(--dark);
}
.notification-card-action-type {
    font-size: .9rem;
    font-weight: var(--normal);
    word-spacing: 2px;
    color: var(--dark);
    display: inline-block;
}
.notification-card-time {
    font-size: .8rem;
    font-weight: var(--normal);
    word-spacing: 2px;
    color: var(--dark);
}
</style>