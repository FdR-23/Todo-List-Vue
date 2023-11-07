<script setup>
import { ref, onMounted } from 'vue';
import NavBar from './components/NavBar.vue'
import TodoList from './components/TodoList.vue';
const todoList = ref([]);
let editingTask = ref(null);

const addTask = (task) => {
    todoList.value.push(task);
    updateLocalStorage()
}
const removeTasks = (taskId) => {
    const findTask = todoList.value.find((task) => task.id === taskId)
    if (findTask && findTask.completed) {
        const index = todoList.value.map(element => element.id).indexOf(taskId);
        todoList.value.splice(index, 1)
        updateLocalStorage()
        return todoList.value
    } else {
        return alert("Task not completed or no found")
    }
}

const findTasktoUpdate = (task) => {
    editingTask.value = task
    updateLocalStorage()
}

const updateTask = (updateTask) => {
    const findTask = todoList.value.find((task) => task.id === updateTask.id)
    if (findTask) {
        const indexTask = todoList.value.map(element => element.id).indexOf(updateTask.id);
        todoList.value.splice(indexTask, 1, updateTask)
        editingTask.value = null
        updateLocalStorage()
    } else {
        return alert("Task not Found")
    }
}

const clearCompletedTasks = () => {
    const findTasksCompleted = todoList.value.some((task) => task.completed === true)
    if (!findTasksCompleted) { return alert("No tasks completed") }
    const completedTasks = todoList.value.filter((task) => task.completed === false);
    todoList.value = completedTasks
    updateLocalStorage()
}

const clearTasks = () => {
    todoList.value = []
    updateLocalStorage()
}
const updateLocalStorage = () => {
    localStorage.setItem('todoList', JSON.stringify(todoList.value));
}

onMounted(() => {
    const savedTodoList = localStorage.getItem('todoList');
    if (savedTodoList) {
        todoList.value = JSON.parse(savedTodoList);
    }
});

</script>
<template>
    <NavBar @clear-tasks="clearTasks" @clear-completed-tasks="clearCompletedTasks" @add-task="addTask" :todoList="todoList"
        @update-task="updateTask" :editingTask="editingTask" />
    <main>
        <TodoList :remove-tasks="removeTasks" :todoList="todoList" :findtasktoupdate="findTasktoUpdate" />
    </main>
</template>

