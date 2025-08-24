<template>
  <div class="p-4 pt-25">
    <input
      v-model="search"
      type="text"
      placeholder="Search queries..."
      class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 mb-3"
      @keyup="fetchQueries"
    />

    <input
      v-model="tags"
      type="text"
      placeholder="Enter tags (comma separated)"
      class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-400 mb-3"
      @keyup="fetchQueries"
    />

    <div v-if="props.searchQuery.length > 0">
      <div v-for="q in props.searchQuery" :key="q.queryId" class="p-4 mb-2 cursor-pointer bg-white rounded shadow hover:shadow-md transition">
        <div @click="showAnswer(q)">
          <h2 class="font-semibold">{{ q.queryTitle }}</h2>
          <p class="text-gray-600 text-sm">{{ q.query }}</p>

          <div class="flex flex-wrap gap-1 mt-2">
            <span v-for="tag in q.category" :key="tag"
                  class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {{ tag }}
            </span>
          </div>

          <div class="text-xs text-gray-500 mt-2">
            {{ q.status }} • {{ q.date }} {{ q.time }}
          </div>
        </div>
      </div>
    </div>
    <p v-else class="text-gray-500">No queries found.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const emit=defineEmits(['searchQuery','activate','queryId'])
// const queries = ref([]);
const search = ref("");
const tags = ref("");    
const status = ref("");

const props=defineProps({
  searchQuery:Array,
})
const fetchQueries = () => {
  const searchQuery={
    query:search.value,
    tags:tags.value
  }
  emit('searchQuery',searchQuery);
};
const showAnswer=(query)=>{
  emit('activate',true,'AnswerQuestions');
  emit('queryId',query);
}
onMounted(fetchQueries);
</script>
