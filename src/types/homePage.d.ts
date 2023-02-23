export interface HomePage {
  handleTabChange(str: string): void;
  title: string | undefined;
  content: string | undefined;
}