import React, { createContext } from "react";

export type TodoActionsType = {
  onCreate: (content: string) => void;
  onUpdate: (targetId: number) => void;
  onDelete: (targetId: number) => void;
};

export const TodoActionsContext = createContext<TodoActionsType | undefined>(
  undefined
);

export const useTodoActions = () => {
  const context = React.useContext(TodoActionsContext);
  if (!context) {
    throw new Error("useTodoActions must be used within a TodoActionsProvider");
  }
  return context;
};
