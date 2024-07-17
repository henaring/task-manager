import { TodoState } from "@/types/todoReducer";
import { memo } from "react";
import { useTodoActions } from "@/hooks/useTodoActions.hook";

function TodoItem({ todo }: { todo: TodoState }) {
  const { onUpdate, onDelete } = useTodoActions();

  const handleChange = () => {
    onUpdate(todo.id);
  };

  const handleClick = () => {
    onDelete(todo.id);
  };

  return (
    <div className="mb-2">
      <div className="w-full border shadow-sm rounded-lg items-center flex gap-4 p-2">
        <div className="flex-none m-2">
          <div className="checkbox-container relative">
            <input
              type="checkbox"
              className="sr-only" // 화면에서 숨기지만 접근성 유지
              checked={todo.isDone}
              onChange={handleChange}
            />
            <div
              className={`w-5 h-5 border rounded-full cursor-pointer 
            ${todo.isDone ? "bg-primary border-primary" : "border-zinc-200"}
          `}
              onClick={handleChange}
            >
              {todo.isDone && (
                <svg
                  className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <div
            className={`flex-1 font-semibold ${
              todo.isDone
                ? "line-through decoration-muted text-muted"
                : "text-primary "
            }`}
          >
            {todo.content}
          </div>
          <div className="date text-xs text-gray-500">
            {new Date(todo.date).toLocaleDateString()}
          </div>
        </div>
        <button className="flex-none" onClick={handleClick}>
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
  );
}

export default memo(TodoItem);
