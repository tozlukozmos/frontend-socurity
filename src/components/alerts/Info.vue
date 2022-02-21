<script setup>
const props = defineProps({
    message: String
});
</script>

<template>
    <div class="alert-info">
        <div class="alert-info-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 0C4.48086 0 0 4.48086 0 10C0 15.5191 4.48086 20 10 20C15.5191 20 20 15.5191 20 10C20 4.48086 15.5191 0 10 0ZM11.8359 10.5255C11.8359 9.5116 11.014 8.68969 10.0001 8.68969C10 8.68969 10 8.68969 10 8.68969C9.51309 8.68969 9.04609 8.88309 8.7018 9.22742C8.3575 9.57172 8.16406 10.0387 8.16406 10.5256C8.16406 11.6371 8.16406 13.3227 8.16406 14.4342C8.16406 14.9211 8.3575 15.3881 8.7018 15.7324C9.04609 16.0767 9.51309 16.2701 10 16.2701C10 16.2701 10 16.2701 10.0001 16.2701C11.014 16.2701 11.8359 15.4482 11.8359 14.4343V10.5255ZM10 3.72988C8.98672 3.72988 8.16406 4.55254 8.16406 5.56582C8.16406 6.5791 8.98672 7.40176 10 7.40176C11.0133 7.40176 11.8359 6.5791 11.8359 5.56582C11.8359 4.55254 11.0133 3.72988 10 3.72988Z" fill="#352D2B"/>
            </svg>
        </div>
        <p class="alert-info-message">{{message}}</p>
    </div>
</template>

<style scoped>
.alert-info {
    width: 100%;
    padding: 16px;
    border-radius: 10px;
    font-size: .9rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    color: var(--dark);
    background-color: var(--yellow);
}
.alert-info-icon {
    width: 30px;
    height: 100%;
    margin-right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>