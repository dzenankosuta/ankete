import axios from "axios";
import { restApiUrl } from "../config/api";

export const getSurveys = async () => {
  const url = `${restApiUrl.prod}/survey`;
  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    // console.log(error);
  }
};

export const getSurvey = async (token, id) => {
  const url = `${restApiUrl.prod}/survey/${id}`;
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

export const getPrivateSurvey = async (id) => {
  const url = `${restApiUrl.prod}/survey/private/${id}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    // console.log(error);
  }
};

export const createSurvey = async (token, data) => {
  const url = `${restApiUrl.prod}/survey/`;
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": " application/json",
        Authorization: `Bearer ${token}`,
        // "Access-Control-Allow-Origin": true,
      },
    });
    return response.data;
  } catch (error) {
    // throw new Error(error.message);
  }
};

export const excelSurvey = async (token, id) => {
  const url = `${restApiUrl.prod}/survey/excel/${id}`;
  const outputFile = "rezultati.xls";

  axios({
    url: url,
    method: "GET",
    responseType: "blob",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", outputFile);
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      // console.error("Error downloading file:", error.message);
    });
};

export const updateSurvey = (token, id, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const url = `${restApiUrl.prod}/survey/${id}`;
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      };
      const survey = await axios.put(url, data, config);
      resolve(survey);
    } catch (error) {
      reject(error);
      // console.log(error);
      throw new Error(error.data);
    }
  });

export const deleteSurvey = (token, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const url = `${restApiUrl.prod}/survey/${id}`;
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        },
      };
      const survey = await axios.delete(url, config);
      resolve(survey);
    } catch (error) {
      reject(error);
      throw new Error(error.data);
    }
  });
