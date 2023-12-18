<template>
  <div class="flex flex-col w-96 mt-20">
    <TodoForm />
    <TodoList />
  </div>
</template>

<script setup lang="ts">
import TodoForm from './TodoForm.vue'
import TodoList from './TodoList.vue'
</script>
