import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { useTodo } from '@/stores/todoStore'
import { useToast } from '@/components/ui/toast'
import { computed, ref, watch } from 'vue'
import type { TodoFormState } from '../types'
import { storeToRefs } from 'pinia'

export default function useTodoForm() {
  const store = useTodo()

  const { toast } = useToast()

  const { addTodo } = store

  const { selectedTodo: selectedTask } = storeToRefs(store)

  const formState = ref<TodoFormState>('create')

  const formSchema = toTypedSchema(
    z.object({
      task: z
        .string({
          required_error: 'Task is required',
        })
        .max(25, {
          message: 'Must be 25 or less characters long',
        })
        .trim()
        .refine((val) => val.trim().length !== 0, {
          message: 'Task is required',
        }),
      description: z.string().max(256).optional(),
    }),
  )

  const form = useForm({
    validationSchema: formSchema,
  })

  watch(
    () => selectedTask.value,
    () => {
      if (selectedTask.value) {
        setFormState('update')
        form.setFieldValue('task', selectedTask.value.task)
        form.setFieldValue('description', selectedTask.value.description)
      } else {
        resetForm()
      }
    },
  )

  const isFormDirty = computed(() => {
    return Object.keys(form.values).some((key) => form.isFieldDirty(key as any))
  })

  const onSubmit = form.handleSubmit((values) => {
    if (formState.value === 'create') {
      saveNewTask(values)
      return
    }

    updateTask(values)
  })

  function saveNewTask(values: { task: string; description?: string }) {
    try {
      addTodo(values.task, values.description)
      toast({
        title: 'Todo App',
        description: 'A new task has been added',
      })
      form.resetForm()
    } catch (e) {
      console.log(e)
    }
  }

  function updateTask(values: { task: string; description?: string }) {
    if (!selectedTask.value) return

    if (
      values.task === selectedTask.value.task &&
      values.description === selectedTask.value.description
    ) {
      resetForm()
      return
    }

    store.updateTodo(selectedTask.value.id, values.task, values.description)
    resetForm()
    toast({
      title: 'Todo App',
      description: 'The task has been updated',
    })
  }

  function resetForm() {
    form.resetForm()
    setFormState('create')
    selectedTask.value = null
  }

  function setFormState(state: TodoFormState) {
    formState.value = state
  }

  return {
    selectedTask,
    formState,
    form,
    formSchema,
    isFormDirty,
    onSubmit,
    resetForm,
    setFormState,
  }
}
