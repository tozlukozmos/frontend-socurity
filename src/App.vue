<template>
  <router-view/>
</template>

<style>
/* google text font */
@import url('https://fonts.googleapis.com/css2?family=Baloo+Bhai+2:wght@400;600&display=swap');

/* css variables */
:root {
  /* colors */
  --dark: #352D2B;
  --light: #F8F1E7;
  --yellow: #E8AA33;
  --red: #AF2525;
  --green: #06942E;
  
  /* font weights */
  --normal: 400;
  --bold: 600;
}

/* reset css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
  outline: none;
  border: none;
  font-family: 'Baloo Bhai 2', cursive;
}

/* html and body */
html,
body {
  height: 100%;
  background-color: var(--light);
}

/* app */
#app {
  max-width: 500px;
  height: 100%;
  margin: auto;
  padding: 16px 0 16px 0;
  display: flex;
  flex-direction: column;
}
@media screen and (max-width: 520px) {
    #app {
        padding-right: 16px;
        padding-left: 16px;
    }
}
</style>
