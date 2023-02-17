import axios from "axios";
import { Credentials } from "../types/credentials";
import { Blog } from "../types/blog";
let baseUrl = "";
if (process.env.NODE_ENV === "development") {
  baseUrl = process.env.NEXT_PUBLIC_DEV_API_BLOG_URL as string;
} else {
  baseUrl = process.env.NEXT_PUBLIC_API_LOGIN_URL as string;
}

let token: string = "";

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const create = async (newObj: Blog) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log(newObj, config);
  const response = await axios.post(baseUrl, newObj, config);
  return response.data;
};

const update = async (id: string, newObj: Blog) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObj);
  return request.data;
};

export default { setToken, create, update, getAll };
