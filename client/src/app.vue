<template>
    <router-view :key="$route.fullPath"></router-view><!--fullPath re-renders page so properties update-->
</template>