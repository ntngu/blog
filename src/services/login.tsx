import axios from "axios";
import { Credentials } from "../types/credentials";

const login = async (credentials: Credentials) => {
  let baseUrl = "";
  if (process.env.NODE_ENV === "development") {
    baseUrl = process.env.NEXT_PUBLIC_DEV_API_LOGIN_URL as string;
  } else {
    baseUrl = process.env.NEXT_PUBLIC_API_LOGIN_URL as string;
  }
  const response = await axios.post(baseUrl, credentials);
  return response.data; 
};

export default { login };