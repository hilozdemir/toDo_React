import type { FormEvent } from 'react'
import { useState } from 'react'

type TodoInputProps = {
  onAddTodo: (text: string) => void
  onSearch: (query: string) => void
}

function TodoInput({ onAddTodo, onSearch }: TodoInputProps) {
  const [text, setText] = useState('')
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')

  const handleAdd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) {
      setError('Lütfen bir görev yazın.')
      return
    }
    onAddTodo(trimmed)
    setText('')
    setError('')
  }

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch(query)
  }

  return (
    <div className="stack">
      <form className="search-row" onSubmit={handleSearch}>
        <input
          className="field"
          placeholder="Görev ara..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-secondary">
          Search
        </button>
      </form>

      <form className="input-row" onSubmit={handleAdd}>
        <input
          className="field"
          placeholder="Örn: Yeni görevi girin"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Add new
        </button>
      </form>
      <span className="helper">
        Input boş ise görev eklenmez. Add butonunu kullanabilirsiniz.
      </span>
      {error ? (
        <span className="helper" style={{ color: '#ef4444' }}>
          {error}
        </span>
      ) : null}
    </div>
  )
}

export default TodoInput
