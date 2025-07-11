<template>
    <div class="flex flex-col items-center mt-10 sm:mx-5 mx-2 xl:mx-15 lg:mx-10">
        <div><h1 class="text-3xl font-bold">Recent Queires</h1></div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
            <div v-for="i in 10" class="border p-2">
                <div>{{ this.recentQuries.date }}</div>
                <div>Q. {{ this.recentQuries.query }}</div>
                <div class="truncate overflow-hidden whitespace-nowrap">Ans. {{ this.recentQuries.ans }}</div>
                <div>{{ this.recentQuries.ansCount }}</div>
            </div>
        </div>
        <!-- <div>
            <div></div>
        </div> -->
    </div>
</template>
<script>
    export default{
        data(){
            return{
                recentQuries:{
                        date: "12-5-2025",
                        query:"What is C?",
                        ans:"C is a High Level Procedural Programming Language.",
                        ansCount: 5,
                    }   
            }
        },
        methods:{
            
        },
    }
</script>
<style scoped>
    
</style>