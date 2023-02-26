export interface BlogView {
  modal(str: string): void;
  title: string | undefined;
  content: string | undefined;
}