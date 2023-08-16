export const Categories = ["Housing", "Work", "Education", "Financial"];
export type TodoListItemProps = {
  todo: Todo;
  setTodoCompleted: (todo: Todo) => void;
  handleDeleteTodo: (selectedTodo: Todo) => void;
};

export type AddTodoProps = {
  setAddTodo: (todo: Todo) => void;
};
export type Todo = {
  id: string;
  text: string;
  category: string;
  completed: boolean;
};
