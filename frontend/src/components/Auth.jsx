import { Alert, Snackbar } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState();
  const [severity, setSeverity] = useState("success");
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async (type = "signup") => {
    const data = await fetch(`http://localhost:4000/api/user/${type}`, {
      method: "POST",
      body: JSON.stringify({
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      }),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    // console.log(data);
    setOpen(true);
    setMsg(data.message);
    if (
      data.message !== "Login Successfull" &&
      data.message !== "Signup Successfully"
    ) {
      setSeverity("error");
    } else {
      setSeverity("success");
      navigate("/my-solutions");
      await window.localStorage.setItem("userId", data.user._id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSignup) {
      sendRequest("login");
    } else {
      sendRequest();
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSeverity("success");
    setOpen(false);
  };
  return (
    <>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {msg}
          </Alert>
        </Snackbar>
      </Stack>
      <div>
        <h4>{isSignup ? "Signup" : "Login"} </h4>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input
              placeholder="name"
              name="name"
              onChange={handleChange}
              value={inputs.name}
              required
            />
          )}

          <input
            placeholder="email"
            name="email"
            onChange={handleChange}
            value={inputs.email}
            required
          />
          <input
            placeholder="password"
            name="password"
            onChange={handleChange}
            value={inputs.password}
            required
          />
          <button type="submit">{isSignup ? "Signup" : "Login"}</button>
        </form>
        <p>
          <button onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Signup"}
          </button>
        </p>
      </div>
    </>
  );
};

export default Auth;
