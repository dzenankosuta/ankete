import axios from "axios";
import { restApiUrl } from "../config/api";

export const login = async (data) => {
  const url = `${restApiUrl.prod}/auth/login`;
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    // console.log(error);
  }
};

export const authMe = async (token) => {
  const url = `${restApiUrl.prod}/auth/me`;
  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // console.log(error);
  }
};
