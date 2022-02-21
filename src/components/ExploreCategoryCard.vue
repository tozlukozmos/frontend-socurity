<script setup>
const props = defineProps({
    category: String
});
</script>

<template>
    <router-link :to="`/explore/categories/${category}`" class="explore-category">{{category}}</router-link>
</template>

<style scoped>
.explore-category {
    text-decoration: none;
    padding: 5px 10px;
    border-radius: 10px;
    color: var(--light);
    background-color: #39312f;
}
</style>