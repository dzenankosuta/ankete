import React, { createContext, useState } from "react";

const AppContext = createContext();

function ContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [surveys, setSurveys] = useState([]);
  const [newSurveyData, setNewSurveyData] = useState({
    title: "",
    questions: [],
    description: "",
  });

  const addSurvey = (survey) => {
    setSurveys([...surveys, survey]);
  };

  const values = {
    token,
    setToken,
    addSurvey,
    surveys,
    setSurveys,
    user,
    setUser,
    newSurveyData,
    setNewSurveyData,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

export { AppContext, ContextProvider };
