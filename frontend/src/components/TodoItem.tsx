import type { Todo } from '../types'

type TodoItemProps = {
  todo: Todo
  onToggle: () => void
  onDelete: () => void
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="todo-item">
      <button
        type="button"
        className={`checkbox ${todo.completed ? 'checked' : ''}`}
        aria-pressed={todo.completed}
        onClick={onToggle}
      >
        {todo.completed ? '✓' : ''}
      </button>
      <p className={`todo-text ${todo.completed ? 'done' : ''}`}>{todo.text}</p>
      <button className="delete-btn" type="button" onClick={onDelete}>
        Delete
      </button>
    </div>
  )
}

export default TodoItem
