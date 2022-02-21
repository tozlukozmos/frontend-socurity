<template>
    <header class="header">
        <button class="button-back" @click="$router.go(-1)">
            <svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="9.3454" y1="2.11978" x2="2.11978" y2="9.91906" stroke="#352D2B" stroke-width="3" stroke-linecap="round"/>
            <line x1="10.1431" y1="18.2646" x2="2.00001" y2="10.1215" stroke="#352D2B" stroke-width="3" stroke-linecap="round"/>
            </svg>
        </button>
    </header>
</template>

<style scoped>
.button-back {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
}
.button-back:focus {
    outline: var(--dark) solid 2px;
    outline-offset: 2px;
    border-radius: 10px;
}
.button-back:active {
    outline: var(--yellow) solid 2px;
}
</style>