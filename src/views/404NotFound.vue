<template>
    <main class="notfound-page-main">
        <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_03wqck43.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>
        <h2>Sorry... This page is not exist.</h2>
        <button 
        @click="$router.go(-1)" 
        class="button-turn-back">
        Turn Back!
        </button>
    </main>
</template>

<style scoped>
.notfound-page-main{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}
.button-turn-back {
    min-width: 300px;
    margin-top: 30px;
    font-size: 1.5rem;
    font-weight: var(--bold);
    color: var(--light);
    background-color: var(--dark);
    border: 2px solid var(--dark);
    border-radius: 10px;
    cursor: pointer;
    position: relative;
}
.button-turn-back:focus {
    outline: var(--dark) solid 2px;
    outline-offset: 2px;
}
.button-turn-back:active {
    outline: var(--yellow) solid 2px;
}

</style>