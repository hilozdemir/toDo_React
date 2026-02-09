import { useEffect, useMemo, useState } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import type { Todo } from './types'
import { createTodo, deleteTodo, fetchTodos, updateTodo } from './api'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await fetchTodos()
        setTodos(data)
      } catch (err) {
        console.error(err)
        setError('Görevler yüklenemedi.')
      } finally {
        setLoading(false)
      }
    }

    loadTodos()
  }, [])

  const handleAddTodo = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const tempId = Date.now()
    const newTodo: Todo = {
      id: tempId,
      text: trimmed,
      completed: false,
    }
    // Optimistic update
    setTodos((prev) => [newTodo, ...prev])
    try {
      const saved = await createTodo(newTodo)
      // tempId ile eklenen todo'yu, backend'den dönen gerçek todo ile değiştir
      setTodos((prev) => [saved, ...prev.filter((todo) => todo.id !== tempId)])
    } catch (err) {
      console.error(err)
      setTodos((prev) => prev.filter((todo) => todo.id !== tempId))
      setError('Görev kaydedilemedi.')
    }
  }

  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )

    const updated = todos.find((todo) => todo.id === id)
    if (updated) {
      const payload: Todo = { ...updated, completed: !updated.completed }
      updateTodo(payload).catch((err) => {
        console.error(err)
        // Hata olursa lokal değişikliği geri al
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === id ? { ...todo, completed: updated.completed } : todo,
          ),
        )
        setError('Görev güncellenemedi.')
      })
    }
  }

  const handleDelete = async (id: number) => {
    const previous = todos
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
    try {
      await deleteTodo(id)
    } catch (err) {
      console.error(err)
      setTodos(previous)
      setError('Görev silinemedi.')
    }
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term.trim().toLowerCase())
  }

  const filteredTodos = useMemo(() => {
    if (!searchTerm) return todos
    return todos.filter((todo) =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm, todos])

  if (loading) {
    return <main className="card">Görevler yükleniyor...</main>
  }

  return (
    <main className="card">
      <div className="header">
        <div className="badge">✓</div>
        <div className="title-area">
          <h1>Task Manager</h1>
          <p>Günlük görevlerini takip et ve tamamla</p>
        </div>
      </div>

      <div className="stack">
        {error ? (
          <div style={{ color: '#ef4444', marginBottom: '0.5rem' }}>
            {error}
          </div>
        ) : null}
        <TodoInput onAddTodo={handleAddTodo} onSearch={handleSearch} />
        <TodoList
          todos={filteredTodos}
          onToggleTodo={handleToggle}
          onDeleteTodo={handleDelete}
        />
      </div>
    </main>
  )
}

export default App
