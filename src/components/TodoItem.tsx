import { TodoState } from "@/types/todoReducer";
import { memo } from "react";
import { useTodoActions } from "@/hooks/useTodoActions.hook";
import { mdilDelete } from "@mdi/light-js";
import { Icon } from "@mdi/react";
import { Separator } from "@radix-ui/react-separator";

function TodoItem({ todo }: { todo: TodoState }) {
  const { onUpdate, onDelete } = useTodoActions();

  const handleChange = () => {
    onUpdate(todo.id);
  };

  const handleClick = () => {
    onDelete(todo.id);
  };

  return (
    <div>
      <div className="flex items-center gap-10 py-5">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only" // 화면에서 숨기지만 접근성 유지
            checked={todo.isDone}
            onChange={handleChange}
          />
          <div
            className={`w-5 h-5 border rounded-md cursor-pointer 
            ${
              todo.isDone
                ? "bg-emerald-400 border-emerald-400"
                : "border-zinc-200"
            }
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
        <div className="flex-1">{todo.content}</div>
        <div className="date">{new Date(todo.date).toLocaleDateString()}</div>
        <button onClick={handleClick}>
          <Icon path={mdilDelete} size={1} className="text-red-300" />
        </button>
      </div>
      <Separator className="border-b border-green-800/10" />
    </div>
  );
}

export default memo(TodoItem);
