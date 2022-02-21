<script setup>
const props = defineProps({
    color: String,
    backgroundColor: String
})
</script>

<template>
    <svg class="loading" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" :style="`margin: auto; background: ${backgroundColor || 'none'}; display: block; shape-rendering: auto;`" width="43px" height="43px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <circle cx="84" cy="50" r="10" :fill="color || '#352D2B'">
        <animate attributeName="r" repeatCount="indefinite" dur="0.3246753246753247s" calcMode="spline" keyTimes="0;1" values="7;0" keySplines="0 0.5 0.5 1" begin="0s"></animate>
        <animate attributeName="fill" repeatCount="indefinite" dur="1.2987012987012987s" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1" values="#352D2B;#352D2B;#352D2B;#352D2B;#352D2B" begin="0s"></animate>
        </circle><circle cx="16" cy="50" r="10" :fill="color || '#352D2B'">
        <animate attributeName="r" repeatCount="indefinite" dur="1.2987012987012987s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;7;7;7" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>
        <animate attributeName="cx" repeatCount="indefinite" dur="1.2987012987012987s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>
        </circle><circle cx="50" cy="50" r="10" :fill="color || '#352D2B'">
        <animate attributeName="r" repeatCount="indefinite" dur="1.2987012987012987s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;7;7;7" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.3246753246753247s"></animate>
        <animate attributeName="cx" repeatCount="indefinite" dur="1.2987012987012987s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.3246753246753247s"></animate>
        </circle><circle cx="84" cy="50" r="10" :fill="color || '#352D2B'">
        <animate attributeName="r" repeatCount="indefinite" dur="1.2987012987012987s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;7;7;7" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.6493506493506493s"></animate>
        <animate attributeName="cx" repeatCount="indefinite" dur="1.2987012987012987s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.6493506493506493s"></animate>
        </circle><circle cx="16" cy="50" r="10" :fill="color || '#352D2B'">
        <animate attributeName="r" repeatCount="indefinite" dur="1.2987012987012987s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;7;7;7" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.974025974025974s"></animate>
        <animate attributeName="cx" repeatCount="indefinite" dur="1.2987012987012987s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.974025974025974s"></animate>
        </circle>
    </svg>
</template>