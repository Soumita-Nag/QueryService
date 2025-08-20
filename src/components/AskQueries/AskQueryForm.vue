<template>
  <div class="max-w-xl sm:mx-auto p-6 mt-28 ml-10 bg-white rounded-xl shadow-lg">
    <form @submit.prevent="AddQuery" class="space-y-6">
      <div class="text-lg font-semibold text-gray-700 capitalize">
        Hello {{ props.user.uname }} 👋
      </div>
      <div>
        <label for="tags" class="block mb-2 text-sm font-medium text-gray-600">Add Tags</label>
        <div class="flex gap-2">
          <input
            type="text" @keyup.enter="addTags"
            v-model="tag"
            list="tagSugg"
            id="tags"
            placeholder="Enter tags"
            class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <datalist id="tagSugg">
            <option v-for="t in tagSugg" :value="t"></option>
          </datalist>
          <button
            type="button"
            @click="addTags"
            class="px-4 py-2 cursor-pointer bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            +
          </button>
        </div>
        <div class="mt-3 flex flex-wrap gap-2">
          <span
            v-for="(t, i) in tags"
            :key="i"
            class="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full flex items-center gap-2"
          >
            {{ t }}
            <button
              type="button"
              class="text-blue-500 hover:text-red-500"
              @click="removeTag(i)"
            >
              &times;
            </button>
          </span>
        </div>
      </div>
      <div>
        <label for="questionHead" class="block mb-2 text-sm font-medium text-gray-600">Question Title</label>
        <input type="text" name="" v-model="queryTitle" id="questionHead" placeholder="Enter the Title of your Question" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required>
      </div>
      <div>
        <label for="question" class="block mb-2 text-sm font-medium text-gray-600">Your Question</label>
        <textarea name="" v-model="query" id="question" placeholder="Ask Your Question" class="w-full min-h-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required>

        </textarea>
      </div>
      <div class="text-right">
        <button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 shadow">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
var category="Select Category";
var tags=ref([]);
var tag=ref("");
var query=ref("");
var queryTitle=ref("");
const props=defineProps({
    user:Object,
})
const tagSugg=ref(
  [
  // Programming & Tech
  "JavaScript", "Python", "Java", "C++", "React", "Node.js", "Web Development", "AI", "Machine Learning", "Android", "iOS", "Cloud", "DevOps", "Cybersecurity",

  // Healthcare & Medicine
  "Nutrition", "Mental Health", "Fitness", "Yoga", "COVID-19", "Diabetes", "Heart Disease", "First Aid", "Dentistry", "Dermatology", "Vaccines", "Sleep",

  // Science & Environment
  "Physics", "Chemistry", "Biology", "Astronomy", "Ecology", "Genetics", "Space", "Climate Change", "Geology", "Oceanography",

  // Art & Culture
  "Painting", "Drawing", "Photography", "Sculpture", "Music", "Dance", "Theater", "Film", "Design", "Literature", "Fashion", "Crafts",

  // Sports & Recreation
  "Football", "Cricket", "Basketball", "Tennis", "Swimming", "Badminton", "Hiking", "Running", "Golf", "Table Tennis",

  // History & Geography
  "Ancient", "Medieval", "Modern", "World War II", "Mythology", "India", "Europe", "Asia", "Maps", "Capitals", "Monuments",

  // Education & Career
  "Mathematics", "Economics", "Business", "Startups", "Marketing", "Leadership", "Scholarships", "Internships", "Online Courses", "Exams",

  // General Knowledge & Misc
  "Trivia", "Technology", "Quotes", "Current Affairs", "Languages", "Travel", "Food", "Space Science", "Robotics", "Ethics", "Environmentalism",
  "Programming","Healthcare","Science","Art","Sports","History","Geography","Business","Education","Technology","General Knowledge","Environment","Travel","Food","Music","Literature","Finance","Fashion","Politics","Mythology","Space","Engineering","Mathematics","Law","Psychology","Philosophy","Religion","Languages"
]
);
const emit=defineEmits(['addQuery']);
const AddQuery=()=>{
    const date=new Date();
    const time=date.getTime();
    const day=date.getDate();
    const month=date.getMonth();
    const year=date.getFullYear();
    const currDate=day+"-"+(month+1)+"-"+year;
    const hour=(date.getHours()<=9?"0":"")+date.getHours();
    const minute=(date.getMinutes()<=9?"0":"")+date.getMinutes();
    const currTime=hour+":"+minute;
    const queryId=time.toString(16);
    const userId=props.user.email.slice(0,props.user.email.indexOf("@"));
    // if(category=="Select Category")
    // category="General Knowledge"
    if(tag.value.trim()!==""){
      tags.value.push(tag.value.trim());
      tag.value="";
    }
    const questionSchema={
      queryId:queryId,
      userId:userId,
      category:category,
      category:tags.value,
      queryTitle:queryTitle.value,
      query:query.value,
      date:currDate,
      time: currTime,
      status:"pending",
    } 
    category="Select Category";
    query.value="";
    queryTitle.value="";
    tags.value=[];
    emit('addQuery',questionSchema);
    // console.log(questionSchema);
}
const addTags=()=>{
  if(tag.value.trim()!==""){
    tags.value.push(tag.value.trim());
    tag.value="";
  }
}
const removeTag = (index) => {
  tags.value.splice(index, 1);
};
</script>
<style scoped>
    
</style>