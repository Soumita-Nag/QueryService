<template>
    <div class="pt-20">
        <ShowQuestions v-if="visibility.ShowQuestions" :recentQueries="recentQueries" @activate="showAnswerQuestion"/>
        <AnswerQuestions v-if="visibility.AnswerQuestions" :recentQueries="recentQueries"/>
    </div>
</template>
<script setup>
    import ShowQuestions from '@/components/Questions/ShowQuestions.vue';
    import AnswerQuestions from '@/components/Questions/AnswerQuestions.vue';
import { reactive } from 'vue';
    const recentQueries={
        category:'Healthcare',
        queryHead:"Effective communication in healthcare",
        queryBody:"Explain the importance of effective communication in healthcare settings and discuss three barriers that may hinder the escalation of care. Additionally, outline two strategies that can be implemented to improve the recognition of patient deterioration",
        date: "12-5-2025",
        time:"11.00pm",
        like: 5,
        ansCount:5,
        views: 50,
        user:"Soumita",
    }
    var visibility=reactive({
        ShowQuestions:true,
        AnswerQuestions:false
    });
    const showAnswerQuestion=(newVisibility)=>{
        visibility.ShowQuestions=!newVisibility;
        visibility.AnswerQuestions=newVisibility;
    }
</script>
<style scoped>
    
</style>