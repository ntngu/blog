export interface HomeView {
  handleTabChange(str: string): void;
  title: string | undefined;
  content: string | undefined;
}