<template>
  <div id="app">
    <router-link to="/home" class="menu">Home</router-link>
    <router-link to="/about" class="menu">About</router-link>
    <router-view></router-view>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <form-test></form-test>
    <svg-test></svg-test>
  </div>
</template>

<script>
import FormTest from './ElForm/FormTest';
import SvgTest from './icons/SvgTest'
export default {
  name: 'App',
  components: {
    FormTest,
    SvgTest
  },
};
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
