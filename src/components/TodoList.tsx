import { useContext, useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import TodoListFooter, { filterType } from "./TodoListFooter";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { reorder } from "../utils/reorder";
import { ThemeContext } from "../context/ThemeContext";
import FilterOptions from "./FilterOptions";

export interface Todo {
  id: string;
  value: string;
  completed: boolean;
}

interface Props {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearCompleted: () => void;
}

const TodoList = ({ todos, toggleTodo, deleteTodo, clearCompleted }: Props) => {
  const [tempTodos, setTempTodos] = useState<Todo[]>(todos);
  const [filter, setFilter] = useState<filterType>("*");
  const { isDarkMode } = useContext(ThemeContext);

  const changeFilter = (filter: filterType) => {
    setFilter(filter);
  };

  const filterTodos = () => {
    switch (filter) {
      case "active":
        setTempTodos(todos.filter((todo) => !todo.completed));
        break;
      case "completed":
        setTempTodos(todos.filter((todo) => todo.completed));
        break;
      case "*":
      default:
        setTempTodos(todos);
        break;
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (result.combine) {
      // super simple: just removing the dragging item
      const newTempTodos: Todo[] = [...tempTodos];
      newTempTodos.splice(result.source.index, 1);
      setTempTodos(newTempTodos);
      return;
    }

    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newTempTodos = reorder(
      tempTodos,
      result.source.index,
      result.destination.index
    );

    setTempTodos(newTempTodos);
  };

  useEffect(() => {
    filterTodos();
  }, [todos, filter]);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={"todo-list"}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="bg-[#25273c] rounded-md overflow-hidden mb-10 shadow-2xl"
            >
              {tempTodos.map((todo, index) => (
                <Draggable draggableId={todo.id} key={todo.id} index={index}>
                  {(dragProvided: DraggableProvided) => (
                    <>
                      <TodoItem
                        todo={todo}
                        toggleTodo={toggleTodo}
                        deleteTodo={deleteTodo}
                        provided={dragProvided}
                      />
                      {provided.placeholder}
                    </>
                  )}
                </Draggable>
              ))}
              <TodoListFooter
                todos={tempTodos}
                filter={filter}
                filterTodos={changeFilter}
                clearCompleted={clearCompleted}
              />
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div
        className={`h-12 w-full rounded-md text-xs  flex justify-center items-center shadow-2xl mb-10 md:shadow-none md:hidden md:mb-0 ${
          isDarkMode ? "bg-[#25273c]" : "bg-white"
        }`}
      >
        <FilterOptions filter={filter} changeFilter={changeFilter} />
      </div>
    </>
  );
};

export default TodoList;
