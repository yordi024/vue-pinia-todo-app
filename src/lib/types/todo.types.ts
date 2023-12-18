export type Todo = {
  id: string
  task: string
  description?: string
  completed: boolean
  createdAt: string
}

export type TodoFormState = 'create' | 'update'
