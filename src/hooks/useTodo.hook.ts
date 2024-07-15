import { TodoState } from "@/types/todoReducer";
import React, { createContext } from "react";

export const TodoStateContext = createContext<TodoContextType | undefined>(
  undefined
);
export type TodoContextType = {
  todos: TodoState[];
};
export const useTodo = () => {
  const context = React.useContext(TodoStateContext);
  if (context === undefined) {
    throw new Error("useTodo must be used within a TodoProvider");
  }

  return context;
};
