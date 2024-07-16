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
    if (e.key === "Enter" && e.nativeEvent.isComposing == false) {
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
          className="w-full bg-muted placeholder:italic placeholder:text-muted-foreground"
        ></Input>

        <button
          className="absolute inset-y-0 right-0 flex items-center justify-center w-10 h-full rounded-r-lg bg-primary"
          onClick={onSubmit}
        >
          <span className="text-white font-light text-2xl p-2">+</span>
        </button>
      </div>
    </div>
  );
}
