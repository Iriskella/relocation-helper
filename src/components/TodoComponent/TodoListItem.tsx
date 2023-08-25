import React from "react";
import { TodoListItemProps } from "../../types";

export const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  setTodoCompleted,
  handleDeleteTodo,
}) => {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
      ></link>
      <tr id={todo.text}>
        <button id="delete-todo" onClick={() => handleDeleteTodo(todo)}>
          <i className="bi bi-trash"></i>
        </button>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => setTodoCompleted(todo)}
        ></input>
        <label className={todo.completed ? "completed" : undefined}>
          <b>{todo.category}</b>: {todo.text}
        </label>
      </tr>
    </div>
  );
};
