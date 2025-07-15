<script setup>
  import HomePage from './pages/HomePage.vue';
  import NavBar from './components/NavBar.vue';
  import askQueries from './pages/askQueries.vue';

  import { reactive } from 'vue';
  
  const visibility=reactive({
    HomePage:true,
    AskQueries:false,
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
  }
</script>

<template>
  <NavBar @activate="changeVisibility"/>
  <HomePage @activate="changeVisibility" v-if="visibility.HomePage"/>
  <askQueries v-if="visibility.AskQueries"/>
</template>

<style scoped>

</style>
