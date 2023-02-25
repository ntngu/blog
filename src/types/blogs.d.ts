import { Blog } from "./blog";

export interface Blogs {
  handleTabChange(str: string): void;
  blogs: Blog[];
}