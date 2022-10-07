import React, { useContext, useEffect } from "react";
import HomeScreen from "./screens/HomeScreen";
import NavBar from "./components/Navbar";
import { solutionContext } from "./contexts/ContextApi";
import { Route, Routes } from "react-router-dom";
import Solutions from "./components/Solutions";
import SolutionDetail from "./components/SolutionDetail";
import UserSolutions from "./components/UserSolutions";
import Auth from "./components/Auth";
import { createTheme, Switch, ThemeProvider } from "@mui/material";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const { isAuth, isSetAuth } = useContext(solutionContext);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      isSetAuth(false);
    }
  }, [isAuth]);
  return (
    <ThemeProvider theme={darkTheme}>
      <NavBar />
      <main>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Solutions />} />
          <Route path="/solutions/add" element={<HomeScreen />} />
          <Route path="/my-solutions" element={<UserSolutions />} />
          <Route path="/my-solutions/:id" element={<SolutionDetail />} />
        </Routes>
      </main>
    </ThemeProvider>
  );
}

export default App;
