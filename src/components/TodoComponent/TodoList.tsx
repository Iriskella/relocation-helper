import React, { useEffect, useState } from "react";
import { TodoListItem } from "./TodoListItem";

import { AddTodo } from "./AddTodo";
import { Todo } from "../../types";

export const TodoList = ({ todosData }: { todosData: Array<Todo> }) => {
  const isStoredTodos =
    localStorage?.getItem("todos") !== "[]"
      ? localStorage?.getItem("todos")
      : false;
  const data = isStoredTodos
    ? JSON.parse(localStorage?.getItem("todos") ?? "")
    : JSON.parse(JSON.stringify(todosData));
  const [todos, setTodos] = useState(data as Array<Todo>);

  const handleCompletedChange = (selectedTodo: Todo) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === selectedTodo.id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const handleAddToDo = (todo: Todo) => {
    if (todos.map((originTodo) => originTodo.id).includes(todo.id)) {
      alert("Todo exists already ");
    } else {
      const newTodos = [...todos, todo];
      localStorage.setItem("todos", JSON.stringify(newTodos));
      setTodos(newTodos);
    }
  };

  const handleDeleteTodo = (selectedTodo: Todo) => {
    const newTodos = todos.filter((todo) => !(todo.id === selectedTodo.id));
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  useEffect(() => {
    const sortedTodos = todos.sort((a, b) =>
      a.category > b.category ? -1 : 1
    );

    setTodos(sortedTodos);
  }, [todos]);

  return (
    <div className="todo-list">
      <AddTodo setAddTodo={handleAddToDo} />
      {todos
        .sort((item1, item2) => (item1.category >= item2.category ? 1 : -1))
        .map((item) => (
          <TodoListItem
            key={item.id}
            todo={item}
            setTodoCompleted={handleCompletedChange}
            handleDeleteTodo={handleDeleteTodo}
          ></TodoListItem>
        ))}
    </div>
  );
};
