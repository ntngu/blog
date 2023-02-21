import react from "react";

export interface BlogForm {
  handleCreate: react.FormEventHandler<HTMLFormElement>;
  handleTitleChange(e: react.ChangeEvent<HTMLInputElement>): void;
  handleContentChange(e: string | undefined): void;
  title: string | undefined;
  content: string | undefined;
}