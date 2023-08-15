import React, { useEffect, useState } from "react";
import { Categories, Todo } from "../../types";

export const AddTodo = ({
  setAddTodo,
}: {
  setAddTodo: (todo: Todo) => void;
}) => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Housing");

  const newTodo: Todo = {
    text: text,
    category: category,
    completed: false,
    id: text,
  };

  useEffect(() => {
    console.log(newTodo);
    newTodo.category = category;
    newTodo.text = text;
  }, [category, text]);

  return (
    <>
      <form className="addTodoForm">
        <input
          placeholder="Todo text.."
          type="text"
          onChange={(e) => setText(e.target.value)}
        />
        <>
          <select
            name="category"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {Categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </>
        <button
          type="submit"
          disabled={!newTodo.text}
          onClick={(e) => {
            e.preventDefault();
            setAddTodo(newTodo);
          }}
        >
          {" "}
          Add Todo!
        </button>
      </form>
    </>
  );
};
