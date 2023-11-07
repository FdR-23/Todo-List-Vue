<template>
    <header class="bg-green-400  w-full flex flex-col items-center p-2 rounded-b-lg">
        <div class="m-2 p-2 flex items-center justify-center">
            <h1 class="text-5xl font-semibold skew-x-6 -skew-y-1 ">Todo List</h1>
        </div>

        <form class="m-2 p-2 space-x-4 flex items-center justify-center" @submit.prevent="addOrUpdate">
            <label class="font-semibold text-base" for="nameTask"> Name:
                <input class="rounded-sm pl-1" id="nameTask" name="nameTask" type="text" v-model="newTask.name" required>
            </label>
            <label class="font-semibold text-base" for="descriptionTask"> Description:
                <input class="rounded-sm pl-1" id="descriptionTask" name="descriptionTask" type="text"
                    v-model="newTask.description">
            </label>
            <button v-if="prop.editingTask"
                class="border-2 px-3 py-1 rounded-md bg-emerald-600 text-white font-semibold hover:bg-emerald-900 transition-all duration-300"
                type="submit">
                Update
            </button>
            <button v-else
                class="border-2 px-3 py-1 rounded-md bg-emerald-600 text-white font-semibold hover:bg-emerald-900 transition-all duration-300"
                type="submit">
                Create
            </button>
        </form>
        <div class="flex gap-2">
            <button
                class="border-2 px-3 py-1 rounded-md bg-emerald-600 text-white font-semibold hover:bg-emerald-900 transition-all duration-300"
                @click="onClearTasks">
                Clear All
            </button>
            <button
                class="border-2 px-3 py-1 rounded-md bg-emerald-600 text-white font-semibold hover.bg-emerald-900 transition-all duration-300"
                @click="onClearCompletedTasks">
                Clear Task Completed
            </button>
        </div>
    </header>
</template>

<script setup>
import { defineProps, ref, reactive, watch } from "vue";

const prop = defineProps({
    todoList: Array,
    editingTask: Object,
    onAddTask: Function,
    onUpdateTask: Function,
    onClearCompletedTasks: Function,
    onClearTasks: Function,
});

const count = ref(0);
const newTask = reactive({
    id: +new Date(),
    taskNum: count,
    name: "",
    description: "",
    completed: false,
});

watch(() => prop.editingTask, (newVal) => {
    if (newVal) { 
        newTask.id = newVal.id;
        newTask.name = newVal.name;
        newTask.description = newVal.description;
        newTask.completed = newVal.completed;
    }
});

const addOrUpdate = () => {
    count.value++;
    const currentTask = {
        id: +new Date(),
        taskNum: count.value,
        name: newTask.name,
        description: newTask.description,
        completed: false,
    };

    if (prop.editingTask) {
        const updateTask = {
            id: prop.editingTask.id,
            taskNum: prop.editingTask.taskNum,
            name: newTask.name,
            description: newTask.description,
            completed: prop.editingTask.completed,
        };
        prop.onUpdateTask(updateTask);
        newTask.name = '';
        newTask.description = '';
    } else {
        prop.onAddTask(currentTask);
        newTask.name = '';
        newTask.description = '';
    }

};
</script>
