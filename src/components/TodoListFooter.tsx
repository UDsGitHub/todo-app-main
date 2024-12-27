import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Todo } from "./TodoList";
import FilterOptions from "./FilterOptions";

export type filterType = "*" | "active" | "completed";

type Props = {
  todos: Todo[];
  filter: filterType;
  filterTodos: (filter: filterType) => void;
  clearCompleted: () => void;
};

const TodoListFooter = ({
  todos,
  filter,
  filterTodos,
  clearCompleted,
}: Props) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div
      className={`${
        isDarkMode ? "bg-[#25273c]" : "bg-white"
      } h-12 flex justify-between items-center px-6 gap-4 text-xs text-[#777a92]`}
    >
      <p className="duration-300 hover:text-[#cacde8] cursor-default">
        {todos.length} {todos.length != 1 ? "items" : "item"} left
      </p>
      <div className="hidden md:block">
        <FilterOptions filter={filter} changeFilter={filterTodos} />
      </div>
      <button
        className="duration-300 hover:text-[#cacde8]"
        onClick={clearCompleted}
      >
        Clear Completed
      </button>
    </div>
  );
};

export default TodoListFooter;
