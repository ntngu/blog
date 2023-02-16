import react from "react";

export interface Login {
  handleLogin: react.FormEventHandler<HTMLFormElement>;
  handleNameChange(e: react.ChangeEvent<HTMLInputElement>): void;
  handlePasswordChange(e: react.ChangeEvent<HTMLInputElement>): void;
}