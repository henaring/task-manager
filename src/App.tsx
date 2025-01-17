import { useRef, useReducer, useCallback, useMemo, useEffect } from "react";
import Editor from "./components/Editor";
import Header from "./components/layout/Header";
import List from "./components/List";
import { TodoActionKind, TodoState, todoReducer } from "./types/todoReducer";
import { TodoStateContext } from "./hooks/useTodo.hook";
import { TodoActionsContext } from "./hooks/useTodoActions.hook";

function App() {
  const savedData = localStorage.getItem("todos");
  const initialTodos: TodoState[] = savedData ? JSON.parse(savedData) : [];

  const [todos, dispatch] = useReducer(todoReducer, initialTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const idRef = useRef(3);

  const onCreate = useCallback((content: string) => {
    dispatch({
      type: TodoActionKind.CREATE,
      payload: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  }, []);

  const onUpdate = useCallback((targetId: number) => {
    dispatch({
      type: TodoActionKind.UPDATE,
      targetId,
    });
  }, []);

  const onDelete = useCallback((targetId: number) => {
    dispatch({
      type: TodoActionKind.DELETE,
      targetId,
    });
  }, []);
  const memoizedDispatch = useMemo(
    () => ({ onCreate, onUpdate, onDelete }),
    [onCreate, onUpdate, onDelete]
  );
  return (
    <div className="app w-full max-w-screen-sm sm:w-80 md:w-96 mx-auto flex flex-col h-screen">
      <Header />
      <TodoStateContext.Provider
        value={{
          todos,
        }}
      >
        <TodoActionsContext.Provider value={memoizedDispatch}>
          <List />
          <Editor />
        </TodoActionsContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
