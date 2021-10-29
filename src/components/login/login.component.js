import React from "react";
import "./login.css";

import api from "./../../service/appwrite";

const Login = () => {
  const { loginWithGoogle } = api;

  return (
    <div className="login container">
      <button onClick={loginWithGoogle}>Log In</button>;
    </div>
  );
};

export default Login;
