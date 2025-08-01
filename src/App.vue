<script setup>
  import HomePage from './pages/HomePage.vue';
  import NavBar from './components/NavBar.vue';
  import askQueries from './pages/askQueries.vue';
  import Login from './components/Login.vue';
  import Signup from './components/Signup.vue';
  import Questions from './pages/Questions.vue';
  import AnswerQuestions from './components/Questions/AnswerQuestions.vue';
  import AnsweredQuestions from './components/Questions/AnsweredQuestions.vue';
  import UnAnsweredQuestions from './components/Questions/UnAnsweredQuestions.vue';

  import { onBeforeMount, onMounted, reactive,ref } from 'vue';
  import { useToast } from 'vue-toastification';
  
  const toast=useToast();
  var user=reactive({
    islogin:true,
    uname:"Admin",
    email:"admin@gmail.com",
  })
  const admin=reactive({
    uname:"Admin",
    email:"admin@gmail.com"
  })

  var allQueries=ref([]);
  var query=ref([]);
  var answeredQueries=ref([]);
  var unAnsweredQueries=ref([]);

  const visibility=reactive({
    HomePage:true,
    AskQueries:false,
    Questions:false,
    answeredQuestions:false,
    unAnsweredQuestions:false,
    AnswerQuestions:false,
    Signup:false,
    Login:false,
  })
  const changeVisibility=async(newVisibility,source)=>{
    if(source==='AskQueries'){
      visibility.AskQueries=newVisibility;
      visibility.HomePage=!newVisibility;
      visibility.Questions=!newVisibility;
      await getQuery(user.email.slice(0,user.email.indexOf("@")));
    }
    if(source==='HomePage'){
      visibility.HomePage=newVisibility;
      visibility.AskQueries=!newVisibility;
      visibility.answeredQuestions=!newVisibility;
      visibility.unAnsweredQuestions=!newVisibility;
      visibility.Questions=!newVisibility;
      visibility.AnswerQuestions=!newVisibility;
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
      visibility.AnswerQuestions=!newVisibility;
    }
    if(source==='answeredQuestions'){
      visibility.answeredQuestions=newVisibility;
      visibility.unAnsweredQuestions=!newVisibility;
      visibility.HomePage=!newVisibility;
      visibility.AskQueries=!newVisibility;
      visibility.AnswerQuestions=!newVisibility;
    }
    if(source==='unAnsweredQuestions'){
      visibility.unAnsweredQuestions=newVisibility;
      visibility.answeredQuestions=!newVisibility;
      visibility.HomePage=!newVisibility;
      visibility.AskQueries=!newVisibility;
      visibility.AnswerQuestions=!newVisibility;
    }
    if(source==='Logout'){
      user.islogin=false;
      toast.success('Logged out successfully')
      if(visibility.AskQueries){
        visibility.AskQueries=false;
        visibility.HomePage=true;
      }
    }
    if(source==='AnswerQuestions'){
      visibility.Questions=!newVisibility;
      visibility.unAnsweredQuestions=!newVisibility;
      visibility.answeredQuestions=!newVisibility;
      visibility.HomePage=!newVisibility;
      visibility.AskQueries=!newVisibility;
      visibility.AnswerQuestions=newVisibility;
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
      success: async(data,txtstatus,jqXHR)=>{
        if(jqXHR.status==200){
          user.islogin=true;
          user.email=data[0].email;
          user.uname=data[0].uname;
          await getQuery(data[0].email.slice(0,data[0].email.indexOf("@")));
          toast.success("Login Successfully")
        }
        else{
          // console.log("Invalid Credentials !")
          visibility.Login=true;
          toast.error("Invalid Credentials !");

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
        visibility.Signup=true;
        toast.error("User Already Exists!!");
        console.log("Error: "+err);
      }
    })
  }
  const addQuery= (val)=>{
    // console.log(val);
    const payload={
      queryId:val.queryId,
      userId:val.userId,
      category:val.category,
      queryTitle:val.queryTitle,
      query:val.query,
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
      success: async(data1)=>{
        console.log("Success: "+ data1);
        await getAllQuery();
        await getQuery(user.email.slice(0,user.email.indexOf("@")));
      },
      error:(err)=>{
        console.log("Error: "+err);
      }
    })
  }
  const getAllQuery = async () => {
    try {
      const data = await new Promise((resolve, reject) => {
        $.ajax({
          url: "http://localhost:8000/getAllQuery",
          method: "GET",
          success: (data) => {
            resolve(data); 
          },
          error: (err) => {
            reject(err); 
          }
        });
      });
      allQueries.value = data;
      // console.log("Fetched Queries:", allQueries.value);
    } catch (err) {
      console.error("Error fetching queries:", err);
    }
  };

  const getQuery = async (userId) => {
    try {
      const data = await new Promise((resolve, reject) => {
        $.ajax({
          url: "http://localhost:8000/getQuery?userId=" + userId,
          method: "GET",
          success: (data) => {
            resolve(data);
          },
          error: (err) => {
            reject(err);
          }
        });
      });

      query.value = data;
      // console.log(query.value);

    } catch (err) {
      console.error("Error fetching query:", err);
    }
  };
  const postAnswer=async(answer)=>{
    // alert("Answer Posting")
    $.ajax({
      url: "http://localhost:8000/postAnswer",
      method:"POST",
      contentType: "application/json",
      data: JSON.stringify(answer),
      success: async(data)=>{
        console.log("Success: "+ data);
        await getAnsweredQuery();
        await getUnAnsweredQuery();
      },
      error:(err)=>{
        console.log("Error: "+err);
      }
    })
  }
  const getAnsweredQuery=async()=>{
    try {
      const data = await new Promise((resolve, reject) => {
        $.ajax({
          url: "http://localhost:8000/getAnsweredQueries",
          method: "GET",
          success: (data) => {
            resolve(data);
          },
          error: (err) => {
            reject(err);
          }
        });
      });

      answeredQueries.value = data;
      console.log(answeredQueries.value);

    } catch (err) {
      console.error("Error fetching query:", err);
    }
  }
  const getUnAnsweredQuery=async()=>{
    try {
      const data = await new Promise((resolve, reject) => {
        $.ajax({
          url: "http://localhost:8000/getUnAnsweredQueries",
          method: "GET",
          success: (data) => {
            resolve(data);
          },
          error: (err) => {
            reject(err);
          }
        });
      });

      unAnsweredQueries.value = data;
      console.log(unAnsweredQueries.value);

    } catch (err) {
      console.error("Error fetching query:", err);
    }
  }
  
  var specificQuery=ref("");
  const sendqId=(q)=>{
      specificQuery=q;
  }
  
  onMounted(async()=>{
    await getAllQuery();
    await getAnsweredQuery();
    await getUnAnsweredQuery();
    if(user.islogin){
      await getQuery(user.email.slice(0,user.email.indexOf("@")));
    }
  })
</script>

<template>
  <div class="relative min-h-screen">
    <div :class="{'blur-sm pointer-events-none':visibility.Login || visibility.Signup}">
      <NavBar @activate="changeVisibility" :islogin="user.islogin" :user="user" :admin="admin"/>
      <HomePage @activate="changeVisibility" v-if="visibility.HomePage" :islogin="user.islogin" :allQueries="allQueries" @queryId="sendqId"/>
      <askQueries v-if="visibility.AskQueries" :user="user" :query="query"  @addQuery="addQuery" @activate="changeVisibility" @queryId="sendqId"/>
      <Questions v-if="visibility.Questions" :user="user" :allQueries="allQueries" @activate="changeVisibility" @queryId="sendqId"/>
      <AnsweredQuestions v-if="visibility.answeredQuestions" :user="user" :answeredQueries="answeredQueries" @activate="changeVisibility" @queryId="sendqId"/>
      <UnAnsweredQuestions v-if="visibility.unAnsweredQuestions" :user="user" :unAnsweredQueries="unAnsweredQueries" @activate="changeVisibility" @queryId="sendqId"/>
      <AnswerQuestions v-if="visibility.AnswerQuestions" :user="user" :query="specificQuery" :admin="admin" @answer="postAnswer"/>
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
