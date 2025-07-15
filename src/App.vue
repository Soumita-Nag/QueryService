<script setup>
  import HomePage from './pages/HomePage.vue';
  import NavBar from './components/NavBar.vue';
  import askQueries from './pages/askQueries.vue';
  import Login from './components/Login.vue';
  import Signup from './components/Signup.vue';

  import { reactive } from 'vue';
  
  const visibility=reactive({
    HomePage:true,
    AskQueries:false,
    Signup:false,
    Login:false,
  })
  const changeVisibility=(newVisibility,source)=>{
    if(source==='AskQueries'){
      visibility.HomePage=!newVisibility;
      visibility.AskQueries=newVisibility;
    }
    if(source==='HomePage'){
      visibility.HomePage=newVisibility;
      visibility.AskQueries=!newVisibility;
    }
    if(source==='Signup'){
      visibility.Signup=newVisibility;
    }
    if(source==='Login'){
      visibility.Login=newVisibility;
    }
  }
</script>

<template>
  <NavBar @activate="changeVisibility"/>
  <HomePage @activate="changeVisibility" v-if="visibility.HomePage"/>
  <askQueries v-if="visibility.AskQueries"/>
  <Login @activate="changeVisibility" v-if="visibility.Login"/>
  <Signup @activate="changeVisibility" v-if="visibility.Signup"/>
</template>

<style scoped>

</style>
