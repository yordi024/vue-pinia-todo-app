<template>
  <Card class="w-[400px] mt-5">
    <CardHeader class="px-4 pb-2">
      <CardTitle>Todos:</CardTitle>
    </CardHeader>
    <CardContent class="px-4 py-4">
      <template v-for="(task, i) in todos" :key="task.id">
        <TodoListItem
          :task="task"
          @on-delete="deleteTodoTask"
          @on-edit="setTaskSelect"
          @on-toggle-complete="toggleTaskState"
        />
        <hr class="mx-2" v-if="i < todos.length - 1" />
      </template>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { useTodo } from '@/stores/todoStore'
import TodoListItem from './TodoListItem.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { storeToRefs } from 'pinia'
import { useToast } from '@/components/ui/toast'

const store = useTodo()

const { toast } = useToast()

const { todos } = storeToRefs(store)

const { deleteTodo, setSelectedTodo, toggleTodo } = store

function deleteTodoTask(id: string) {
  deleteTodo(id)
  toast({
    title: 'Todo App',
    description: 'Task deleted',
  })
}

function setTaskSelect(id: string) {
  setSelectedTodo(id)
}

function toggleTaskState(id: string, value: boolean) {
  toggleTodo(id, value)
}
</script>
