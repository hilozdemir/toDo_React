import type { Todo } from './types'

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(`${API_BASE_URL}/todos`)
  if (!res.ok) {
    throw new Error('Görevler alınamadı')
  }
  const data = await res.json()
  return data.map((item: any) => ({
    id: item.id,
    text: item.text,
    completed: item.completed,
  }))
}

export async function createTodo(todo: Todo): Promise<Todo> {
  const res = await fetch(`${API_BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })

  if (!res.ok) {
    throw new Error('Görev oluşturulamadı')
  }

  const data = await res.json()
  return {
    id: data.id,
    text: data.text,
    completed: data.completed,
  }
}

export async function updateTodo(todo: Todo): Promise<Todo> {
  const res = await fetch(`${API_BASE_URL}/todos/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })

  if (!res.ok) {
    throw new Error('Görev güncellenemedi')
  }

  const data = await res.json()
  return {
    id: data.id,
    text: data.text,
    completed: data.completed,
  }
}

export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('Görev silinemedi')
  }
}

