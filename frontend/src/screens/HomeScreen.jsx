import React from "react";
import Editor from "../components/Editor";
import Savedcode from "../components/Savedcode";
// import InputForm from "../components/InputForm";
import "./homescreen.css";

const HomeScreen = () => {
  return (
    <div className="home-container">
      <div className="savedcode">
        <Savedcode />
      </div>
      <div className="editor">
        <Editor className="editor" value={"//Add your code here"} />
      </div>
    </div>
  );
};

export default HomeScreen;
