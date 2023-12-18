import type { Todo } from '@/lib/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

function generateId(): string {
  return 'task-' + Math.floor(Math.random() * 1000000)
}

export const useTodo = defineStore(
  'todo',
  () => {
    const todos = ref<Todo[]>([
      {
        id: generateId(),
        task: 'Learn Vue',
        description: 'Sample task',
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ])

    const selectedTodo = ref<Todo | null>(null)

    function addTodo(task: string, description?: string) {
      const createdAt = new Date().toISOString()

      todos.value.push({
        id: generateId(),
        task,
        description,
        completed: false,
        createdAt,
      })
    }

    function deleteTodo(id: string) {
      todos.value = todos.value.filter((todo) => todo.id !== id)
    }

    function updateTodo(id: string, task: string, description?: string) {
      const todo = todos.value.find((todo) => todo.id === id)

      if (todo) {
        todo.task = task
        todo.description = description
      }
    }

    function setSelectedTodo(id: string) {
      selectedTodo.value = todos.value.find((todo) => todo.id === id) || null
    }

    function toggleTodo(id: string, value: boolean) {
      const index = todos.value.findIndex((todo) => todo.id === id)

      if (index !== -1) {
        todos.value[index].completed = value
      }

      console.log(index, id, todos.value)
    }

    return {
      selectedTodo,
      todos,
      addTodo,
      deleteTodo,
      updateTodo,
      setSelectedTodo,
      toggleTodo,
    }
  },
  {
    persist: [
      {
        paths: ['todos'],
        storage: localStorage,
      },
    ],
  },
)
