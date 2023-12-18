<template>
  <Card class="w-[400px]">
    <CardHeader>
      <CardTitle>{{ formProperties.title }}</CardTitle>
      <CardDescription>{{ formProperties.subtitle }}</CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit="onSubmit">
        <div class="grid items-center w-full gap-4">
          <FormField v-slot="{ componentField }" name="task">
            <FormItem>
              <FormLabel>Task</FormLabel>
              <FormControl>
                <Input
                  id="task"
                  placeholder="Enter task"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="description">
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  id="description"
                  placeholder="Enter task description"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
      </form>
    </CardContent>
    <CardFooter class="flex justify-between px-6 pb-6">
      <Button variant="outline" @click="resetForm" :disabled="!isFormDirty">
        Cancel
      </Button>
      <Button @click="onSubmit">{{ formProperties.action }}</Button>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { useTodoForm } from '@/lib/composables'
import { computed } from 'vue'

const { isFormDirty, formState, onSubmit, resetForm } = useTodoForm()

const formProperties = computed(() => {
  const form = {
    create: {
      title: 'Create Task',
      subtitle: 'Add a new task to your TODO list.',
      action: 'Add Task',
    },
    update: {
      title: 'Update Task',
      subtitle: 'Update current selected task.',
      action: 'Update Task',
    },
  }

  return form[formState.value]
})
</script>
