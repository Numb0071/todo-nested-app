import React, { useEffect, useState } from "react";

export interface Todo {
  id: number;
  text: string;
  assignee?: string;
  due_date?: string;
  is_done: boolean;
  parent_id?: number | null;
  children: Todo[];
}

const fetchTodos = async (): Promise<Todo[]> => {
  const resp = await fetch("http://localhost:8000/todos/");
  return await resp.json();
};

const TodoItem: React.FC<{ todo: Todo; level?: number }> = ({ todo, level = 0 }) => (
  <div style={{ marginLeft: level * 24, borderLeft: level ? "1px solid #ccc" : "none", paddingLeft: 8 }}>
    <div>
      <input type="checkbox" checked={todo.is_done} readOnly />
      <span style={{ textDecoration: todo.is_done ? "line-through" : "none" }}>{todo.text}</span>
      {todo.assignee && <small> (Zuständig: {todo.assignee})</small>}
      {todo.due_date && (
        <small> – Fällig bis: {new Date(todo.due_date).toLocaleDateString()}</small>
      )}
    </div>
    {todo.children && todo.children.length > 0 && (
      <div>
        {todo.children.map((child) => (
          <TodoItem key={child.id} todo={child} level={level + 1} />
        ))}
      </div>
    )}
  </div>
);

export const TodoTree: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Lade...</div>;

  return (
    <div>
      <h2>ToDos (Verschachtelt)</h2>
      {todos.length === 0
        ? <div>Keine Todos vorhanden.</div>
        : todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      }
    </div>
  );
};

export default TodoTree;