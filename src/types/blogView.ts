export interface BlogView {
  handleTabChange(str: string): void;
  title: string | undefined;
  content: string | undefined;
}