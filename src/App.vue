<script setup>
  import HomePage from './pages/HomePage.vue';
  import NavBar from './components/NavBar.vue';
  import askQueries from './pages/askQueries.vue';
  import Login from './components/Login.vue';
  import Signup from './components/Signup.vue';
  import Questions from './pages/Questions.vue';

  import { reactive,ref } from 'vue';
  var user=reactive({
    islogin:false,
    uname:"soumi",
    email:"nagsoumita04@gmail.com",
  })
  const visibility=reactive({
    HomePage:true,
    AskQueries:false,
    Questions:false,
    Signup:false,
    Login:false,
  })
  const changeVisibility=(newVisibility,source)=>{
    if(source==='AskQueries'){
      visibility.AskQueries=newVisibility;
      visibility.HomePage=!newVisibility;
      visibility.Questions=!newVisibility;
    }
    if(source==='HomePage'){
      visibility.HomePage=newVisibility;
      visibility.AskQueries=!newVisibility;
      visibility.Questions=!newVisibility;
    }
    if(source==='Signup'){
      visibility.Signup=newVisibility;
    }
    if(source==='Login'){
      visibility.Login=newVisibility;
    }
    if(source==='Questions'){
      visibility.Questions=newVisibility;
      visibility.HomePage=!newVisibility;
      visibility.AskQueries=!newVisibility;
    }
  }
  const checkLogin=(uId)=>{
    $.ajax({
      url:"http://localhost:8000/login",
      method:"POST",
      contentType:"application/json",
      data: JSON.stringify({
        email:uId.email,
        password:uId.password
      }),
      success: (data,txtstatus,jqXHR)=>{
        if(jqXHR.status==200){
          user.islogin=true;
          user.email=data[0].email;
          user.uname=data[0].uname;
        }
      },
      error: (err)=>{
        console.log("Error: "+err);
      }
    })
  }
  const createAccount=(uId)=>{
    $.ajax({
      url:"http://localhost:8000/signup",
      method:"POST",
      contentType:"application/json",
      data: JSON.stringify({
        uname:uId.uname,
        email:uId.email,
        password:uId.password
      }),
      success: (data)=>{
        console.log("Success: "+data);
      },
      error: (err)=>{
        console.log("Error: "+err);
      }
    })
  }
</script>

<template>
  <div class="relative min-h-screen">
    <div :class="{'blur-sm pointer-events-none':visibility.Login || visibility.Signup}">
      <NavBar @activate="changeVisibility" :islogin="user.islogin" :user="user"/>
      <HomePage @activate="changeVisibility" v-if="visibility.HomePage" :islogin="user.islogin"/>
      <askQueries v-if="visibility.AskQueries" :user="user"/>
      <Questions v-if="visibility.Questions"/>
    </div>
    <div v-if="visibility.Login" class="fixed inset-0 bg-black opacity-80 flex justify-center items-center z-50">
      <Login @activate="changeVisibility" @uId="checkLogin"/>
    </div>
    <div v-if="visibility.Signup" class="fixed inset-0 bg-black opacity-80 flex justify-center items-center z-50">
      <Signup @activate="changeVisibility" @uId="createAccount"/>
    </div>
  </div>
</template>

<style scoped>

</style>
