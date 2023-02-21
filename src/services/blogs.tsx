import axios from "axios";
import { Credentials } from "../types/credentials";
import { Blog } from "../types/blog";
let baseUrlLogin = "";
let baseUrlBlog = "";

if (process.env.NODE_ENV === "development") {
  baseUrlBlog = process.env.NEXT_PUBLIC_DEV_API_BLOG_URL as string;
  baseUrlLogin = process.env.NEXT_PUBLIC_DEV_API_LOGIN_URL as string;
} else {
  baseUrlBlog = process.env.NEXT_PUBLIC_API_BLOG_URL as string;
  baseUrlLogin = process.env.NEXT_PUBLIC_API_LOGIN_URL as string;
}

let token: string = "";

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrlBlog);
  return response.data;
};

const create = async (newObj: Blog) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log(newObj, config);
  const response = await axios.post(baseUrlBlog, newObj, config);
  return response.data;
};

const update = async (id: string, newObj: Blog) => {
  const request = await axios.put(`${baseUrlBlog}/${id}`, newObj);
  return request.data;
};

export default { setToken, create, update, getAll };
