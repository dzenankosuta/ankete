import axios from "axios";
import { restApiUrl } from "../config/api";

export const getAnswers = async (token, surveyId) => {
  const url = `${restApiUrl.prod}/answers/${surveyId}`;
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

export const createAnswer = async (data, surveyId) => {
  const url = `${restApiUrl.prod}/answers/${surveyId}`;
  try {
    const response = await axios.post(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    // console.log(error);
  }
};

export const getAnswerById = async (token, surveyId, answerId) => {
  const url = `${restApiUrl.prod}/answers/${surveyId}/${answerId}`;
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

export const updateAnswer = async (token, surveyId, answerId, data) => {
  const url = `${restApiUrl.prod}/answers/${surveyId}/${answerId}`;
  try {
    const response = await axios.put(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // console.log(error);
  }
};

export const deleteAnswer = async (token, surveyId, answerId) => {
  const url = `${restApiUrl.prod}/answers/${surveyId}/${answerId}`;
  try {
    const response = await axios.delete(url, {
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
