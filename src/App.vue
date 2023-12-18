<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
import TodoApp from '@/components/TodoApp.vue'
</script>

<template>
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <TodoApp />

    <Toaster />
  </div>
</template>

<style scoped></style>
