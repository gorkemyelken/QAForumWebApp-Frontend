import React, { useState } from "react";
import { FormControl, Input, InputLabel, FormHelperText } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { PostWithoutAuth } from "../../services/HttpService";

function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleUsername = (value) => {
    setUsername(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
  };

  const sendRequest = (path) => {
    PostWithoutAuth("/auth/" + path, {
      userName: username,
      password: password,
    })
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem("tokenKey", result.message);
        localStorage.setItem("currentUser", result.userId);
        localStorage.setItem("userName", username);
      })
      .catch((err) => console.log(err));
  };

  const handleButton = (path) => {
    sendRequest(path);
    setUsername("");
    setPassword("");
    navigate("/auth");
  };

  return (
    <FormControl>
      <InputLabel style={{ top: 80 }}>Username</InputLabel>
      <Input
        style={{ top: 80 }}
        onChange={(i) => handleUsername(i.target.value)}
      />
      <InputLabel style={{ top: 150 }}>Password</InputLabel>
      <Input
        style={{ top: 100 }}
        onChange={(i) => handlePassword(i.target.value)}
      />
      <Button
        variant="contained"
        style={{ marginTop: 140, background: "#2e7a0d", color: "white" }}
        onClick={() => handleButton("register")}
      >
        Register
      </Button>
      <FormHelperText style={{ margin: 20 }}>
        Are you already registered?
      </FormHelperText>
      <Button
        variant="contained"
        style={{
          background: "#2e7a0d",
          color: "white",
        }}
        onClick={() => handleButton("login")}
      >
        Login
      </Button>
    </FormControl>
  );
}

export default Auth;
