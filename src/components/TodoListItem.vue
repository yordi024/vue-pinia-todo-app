<template>
  <Collapsible v-model:open="isOpen" class="w-full space-y-2 my-2">
    <div class="flex items-center justify-between space-x-4">
      <h4 class="flex text-sm font-semibold items-center">
        <Checkbox
          :disabled="disabledActions"
          :checked="task.completed"
          @update:checked="(value) => emit('onToggleComplete', task.id, value)"
          class="me-1"
        />
        <span :class="{ 'line-through': task.completed }">{{ task.task }}</span>
      </h4>
      <CollapsibleTrigger as-child>
        <Button variant="ghost" size="sm" class="w-9 p-0">
          <ChevronsUpDown class="h-4 w-4" />
          <span class="sr-only">Toggle</span>
        </Button>
      </CollapsibleTrigger>
    </div>
    <CollapsibleContent class="space-y-2">
      <div class="rounded-md border px-4 py-3 text-sm">
        {{ task.description }}
      </div>
      <Button
        :disabled="task.completed || disabledActions"
        variant="link"
        class="float-left"
        @click="!task.completed ? emit('onEdit', task.id) : null"
        >Edit</Button
      >
      <Button
        :disabled="disabledActions"
        variant="link"
        class="float-right text-destructive"
        @click="emit('onDelete', task.id)"
        >Delete</Button
      >
    </CollapsibleContent>
  </Collapsible>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import type { Todo } from '@/lib/types'
import { ChevronsUpDown } from 'lucide-vue-next'
import { useTodo } from '@/stores/todoStore'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  task: Todo
}>()

const emit = defineEmits(['onDelete', 'onEdit', 'onToggleComplete'])

const store = useTodo()

const { selectedTodo } = storeToRefs(store)

const isOpen = ref(false)

const disabledActions = computed(() => selectedTodo.value?.id === props.task.id)
</script>
