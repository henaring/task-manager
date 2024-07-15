import { useState, useRef } from "react";
import { Input } from "./ui/input";
import "./Editor.css";
import { useTodoActions } from "@/hooks/useTodoActions.hook";

export default function Editor() {
  const { onCreate } = useTodoActions();

  const [content, setContent] = useState("");
  const contentRef = useRef<HTMLInputElement>(null);
  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const onKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const onSubmit = () => {
    if (content === "") {
      contentRef.current?.focus();
      return;
    }
    onCreate(content);
    setContent("");
  };

  return (
    <div className="editor">
      <div className="relative">
        <Input
          ref={contentRef}
          value={content}
          onChange={onChangeContent}
          onKeyDown={onKeydown}
          placeholder="New Task"
          className="w-full border-emerald-600/20 bg-emerald-400/10 placeholder:italic placeholder:text-emerald-600/40"
        ></Input>

        <button
          className="absolute inset-y-0 right-0 flex items-center justify-center w-10 h-full rounded-r-lg bg-teal-400"
          onClick={onSubmit}
        >
          <span className="text-white font-light text-2xl p-2">+</span>
        </button>
      </div>
    </div>
  );
}
