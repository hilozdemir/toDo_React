import { useMemo, useState } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import type { Todo } from './types'

const seedTodos: Todo[] = [
  { id: 1, text: 'Dokümantasyonun son halini paylaş', completed: true },
  { id: 2, text: 'Design sistemi için kart bileşeni çıkar', completed: true },
  { id: 3, text: 'Takımın yaptığı deployment problemini araştır', completed: false },
  { id: 4, text: 'Yeni olacak görevlerle ilgili soru sor', completed: false },
]

function App() {
  const [todos, setTodos] = useState<Todo[]>(seedTodos)
  const [searchTerm, setSearchTerm] = useState('')

  const handleAddTodo = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const newTodo: Todo = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    }
    setTodos((prev) => [newTodo, ...prev])
  }

  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
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
