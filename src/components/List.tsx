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
                stroke="#34d399"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${(doneCount / totalCount) * 100 * 1.25} 125`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs text-green-500">
              {Math.round((doneCount / totalCount) * 100)}%
            </span>
          </div>
        </div>
      </div>
      <input
        placeholder="검색어를 입력하세요"
        value={search}
        onChange={onChangeSearch}
      />
      <div className="flex flex-col">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}
