import React, { createContext, useState } from "react";
export const solutionContext = createContext();

const Context = ({ children }) => {
  const [solutionData, setSolutionData] = useState({
    user: "",
    code: "",
    title: "",
    language: "",
    webURL: "",
    youtubeURL: "",
    topic: "",
    timeC: "",
    spaceC: "",
    hint: "",
  });
  const [isAuth, isSetAuth] = useState(false);

  return (
    <solutionContext.Provider
      value={{ solutionData, setSolutionData, isAuth, isSetAuth }}
    >
      {children}
    </solutionContext.Provider>
  );
};

export default Context;
