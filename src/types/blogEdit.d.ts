export interface BlogEdit {
  title: string | undefined;
  date: string | undefined;
  content: string | undefined;
  id: string | undefined;
  handleDelete(str: string): void;
}