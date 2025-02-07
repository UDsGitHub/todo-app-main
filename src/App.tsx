import { FormEvent, useContext, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import TodoList, { Todo } from "./components/TodoList";
import Footer from "./components/Footer";
import { ThemeContext } from "./context/ThemeContext";

const initiateTodos = () => {
  const localTodos = localStorage.getItem("todos");
  if (localTodos) {
    return JSON.parse(localTodos);
  }
  return [];
};

function App() {
  const { isDarkMode } = useContext(ThemeContext);
  const [currentTodo, setCurrentTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>(initiateTodos);

  const handleTodoChange = (value: string) => {
    setCurrentTodo(value);
  };

  const handleTodoSubmit = (e: FormEvent) => {
    e.preventDefault();
    let todoId = crypto.randomUUID();
    let existingTodo = todos.find((todo) => todo.id === todoId);
    while (existingTodo !== undefined) {
      todoId = crypto.randomUUID();
      existingTodo = todos.find((todo) => todo.id === todoId);
    }

    const newTodo: Todo = {
      id: todoId,
      value: currentTodo,
      completed: false,
    };

    setTodos((prevState) => [...prevState, newTodo]);
    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
    setCurrentTodo("");
  };

  const toggleTodo = (id: string) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (todoToUpdate) {
      const updatedTodo: Todo = {
        ...todoToUpdate,
        completed: !todoToUpdate.completed,
      };
      const newTodos = todos.map((todo) =>
        todo.id === id ? updatedTodo : todo
      );
      setTodos((prevState) =>
        prevState.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      localStorage.setItem("todos", JSON.stringify(newTodos));
    }
  };

  const deleteTodo = (id: string) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
    localStorage.setItem("todos", JSON.stringify(filteredTodos));
  };

  const clearCompleted = () => {
    const filteredTodos = todos.filter((todo) => !todo.completed);
    setTodos((prevState) => prevState.filter((todo) => !todo.completed));
    localStorage.setItem("todos", JSON.stringify(filteredTodos));
  };

  return (
    <div
      className={`${
        isDarkMode
          ? "bg-mobile-dark md:bg-desktop-dark bg-[#181824]"
          : "bg-mobile-light md:bg-desktop-light bg-[#fafafa]"
      } bg-no-repeat bg-contain`}
    >
      <div
        className={`w-[90vw] md:w-[540px] h-full flex flex-col pb-4 mx-auto pt-8 md:pt-20 ${
          isDarkMode ? "text-[#cacde8]" : "text-[#393a4c]"
        }`}
      >
        <Header />
        <main className="font-epilogue">
          <TodoInput
            value={currentTodo}
            onChange={handleTodoChange}
            onSubmit={handleTodoSubmit}
          />
          <TodoList
            todos={todos}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            clearCompleted={clearCompleted}
          />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
