import "./App.css";
import { useRef, useReducer, useCallback, useMemo } from "react";
import Editor from "./components/Editor";
import Header from "./components/layout/Header";
import List from "./components/List";
import { TodoActionKind, TodoState, todoReducer } from "./types/todoReducer";
import { TodoStateContext } from "./hooks/useTodo.hook";
import { TodoActionsContext } from "./hooks/useTodoActions.hook";
import { Separator } from "@radix-ui/react-separator";

const mockData: TodoState[] = [
  {
    id: 0,
    isDone: false,
    content: "react 공부하기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: true,
    content: "빨래하기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "잠자기",
    date: new Date().getTime(),
  },
];

function App() {
  const [todos, dispatch] = useReducer(todoReducer, mockData);
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
    <div className="app">
      <Header />

      <Separator className="border-t border-green-800/10" />

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
