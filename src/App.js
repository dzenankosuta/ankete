import { Route, Routes } from "react-router-dom";
import { StyledApp, StyledMainContainer } from "./App.styled";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Login from "./pages/login";
import Home from "./pages/main";
import { useContext, useEffect } from "react";
import { AppContext } from "./context";
import ShowSurvey from "./pages/showSurvey";
import SubmitSurvey from "./pages/submitSurvey";

function App() {
  const { token, setToken, setUser } = useContext(AppContext);
  useEffect(() => {
    const localUser = localStorage.getItem("user");
    const localToken = localStorage.getItem("token");
    setUser(JSON.parse(localUser));
    setToken(localToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <StyledApp>
      <Navbar />
      <StyledMainContainer>
        <Routes>
          <Route path="/" element={token ? <Home /> : <Login />} />
          <Route path="/login" element={!token && <Login />} />
          <Route
            path="/survey/:id"
            element={token ? <ShowSurvey /> : <Login />}
          />
          <Route path="/submit-survey/:id" element={<SubmitSurvey />} />
        </Routes>
      </StyledMainContainer>
      <Footer />
    </StyledApp>
  );
}

export default App;
