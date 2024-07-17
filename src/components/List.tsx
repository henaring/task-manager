import { useState, useMemo } from "react";
import "./List.css";
import TodoItem from "./TodoItem";
import { useTodo } from "@/hooks/useTodo.hook";

export default function List() {
  const { todos } = useTodo();
  const [search, setSearch] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    getFilteredData();
  };

  const getFilteredData = () => {
    if (search === "") {
      return todos;
    }

    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredTodos = getFilteredData();

  const { totalCount, doneCount } = useMemo(() => {
    console.log("getAnalyzedData call");
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length;

    return {
      totalCount,
      doneCount,
    };
  }, [todos]);

  const progress =
    totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);

  return (
    <div className="list">
      <div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <h3>totalCount</h3>
            <span>{totalCount}</span>
          </div>
          <div className="relative">
            <svg className="w-12 h-12 transform -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="#f4f4f5"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="#36BA98"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${progress * 1.25} 125`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs text-primary">
              {typeof progress === "number" ? progress + "%" : "0%"}
            </span>
          </div>
        </div>
      </div>
      <input
        placeholder="검색어를 입력하세요"
        value={search}
        onChange={onChangeSearch}
      />
      <div className="flex flex-col flex-grow">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center -mt-[44px]">
            <span className="text-gray-500">You have no tasks 🥹</span>
            <span className="text-gray-300 text-sm">Write something below</span>
          </div>
        )}
      </div>
    </div>
  );
}
