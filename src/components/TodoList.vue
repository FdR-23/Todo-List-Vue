
<template>
    <div className='bg-green-600/50 rounded-sm w-full h-full my-2 p-2'>
        <div className='grid grid-cols-9 border-b-2 border-emerald-950 text-center font-semibold text-sm'>
            <p className="mb-1"># Task</p>
            <p className="mb-1 col-span-2">Name Task</p>
            <p className="mb-1 col-span-3">Description</p>
            <p className="mb-1">Status</p>
            <p className="mb-1">Edit</p>
            <p className="mb-1">Remove</p>
        </div>
    </div>
    <TodoItem :todoList="todoList" @remove-tasks="removeTasks" @find-task-to-update="findtasktoupdate" />
</template>
<script setup>
import TodoItem from './TodoItem.vue';
import { defineProps } from 'vue';
const { todoList, removeTasks, findtasktoupdate } = defineProps({
    todoList: Array,
    removeTasks: Function,
    findtasktoupdate: Function

})
</script>

