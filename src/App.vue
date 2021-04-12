<template>
  <div id="app">
    <router-link to="/home" class="menu">Home</router-link>
    <router-link to="/about" class="menu">About</router-link>
    <router-view></router-view>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<style scoped>
.menu {
  margin-right: 10px;
  font-size: 18px;
  font-weight: bold;
}
</style>
