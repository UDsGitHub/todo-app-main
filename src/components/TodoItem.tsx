import { DraggableProvided } from "@hello-pangea/dnd";
import { Todo } from "./TodoList";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

interface Props {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  provided: DraggableProvided;
}

const TodoItem = ({ todo, toggleTodo, deleteTodo, provided }: Props) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`group border-b-[1px] ${
        isDarkMode
          ? "bg-[#25273c] border-[#393a4c]"
          : "bg-white border-[#d2d3db]"
      } h-12 flex items-center px-5 md:px-6 gap-4`}
    >
      <button onClick={() => toggleTodo(todo.id)}>
        {todo.completed ? (
          <div className="size-[22px] flex justify-center items-center bg-gradient-to-br from-[#57ddff] to-[#c058f3] rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
              <path
                fill="none"
                stroke="#FFF"
                strokeWidth="2"
                d="M1 4.304L3.696 7l6-6"
              />
            </svg>
          </div>
        ) : (
          <div
            className={`size-[22px] border-2 rounded-full ${
              isDarkMode ? "border-[#393a4c]" : "border-[#d2d3db]"
            }`}
          ></div>
        )}
      </button>
      <p
        className={
          "flex-1 " + `${todo.completed ? "line-through text-[#777a92]" : ""}`
        }
      >
        {todo.value}
      </p>
      <button
        className="hidden group-hover:block text-[#494C6B] hover:text-[#cacde8] duration-300"
        onClick={() => deleteTodo(todo.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-[18px] fill-current"
        >
          <path
            fillRule="evenodd"
            d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default TodoItem;
