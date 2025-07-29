<script setup>
  import HomePage from './pages/HomePage.vue';
  import NavBar from './components/NavBar.vue';
  import askQueries from './pages/askQueries.vue';
  import Login from './components/Login.vue';
  import Signup from './components/Signup.vue';
  import Questions from './pages/Questions.vue';

  import { onMounted, reactive,ref } from 'vue';
  var user=reactive({
    islogin:true,
    uname:"soumita",
    email:"hello@gmail.com",
  })
  var allQueries=[];
  var queries=[];

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
    if(source==='Logout'){
      user.islogin=false;
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
  const addQuery=(val)=>{
    // console.log(val);
    const payload={
      queryId:val.queryId,
      userId:val.userId,
      category:val.category,
      queryTitle:val.queryTitle.value,
      query:val.query.value,
      like: 0,
      ansCount: 0,
      views: 0,
      date:val.date,
      time:val.time,
      status:val.status,
    }
    $.ajax({
      url: "http://localhost:8000/addQuery",
      method:"POST",
      contentType: "application/json",
      data: JSON.stringify(payload),
      // data: {val},
      success: (data1)=>{
        console.log("Success: "+ data1);
      },
      error:(err)=>{
        console.log("Error: "+err);
      }
    })
    getAllQuery();
  }
  const getAllQuery=()=>{
    $.ajax({
      url: "http://localhost:8000/getAllQuery",
      method:"GET",
      success: (data)=>{
        allQueries=data;
        console.log(allQueries);
      },
      error: (err)=>{
        console.log("error: "+err);
      }
    })
  }
  const getQuery=(userId)=>{
    $.ajax({
      url: "http://localhost:8000/getQuery?userId="+userId,
      method:"GET",
      success: (data)=>{
        queries=data;
        console.log(queries);
      },
      error: (err)=>{
        console.log("error: "+err);
      }
    })
  }
  onMounted(()=>{
    getAllQuery();
    // getQuery("hello");
  })
</script>

<template>
  <div class="relative min-h-screen">
    <div :class="{'blur-sm pointer-events-none':visibility.Login || visibility.Signup}">
      <NavBar @activate="changeVisibility" :islogin="user.islogin" :user="user"/>
      <HomePage @activate="changeVisibility" v-if="visibility.HomePage" :islogin="user.islogin"/>
      <askQueries v-if="visibility.AskQueries" :user="user" @addQuery="addQuery"/>
      <Questions v-if="visibility.Questions" :user="user" :allQueries="allQueries"/>
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
