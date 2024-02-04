import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import ForgotPwdForm from "./forgot-password/forgot-password";
import LoginForm from "./login-form/login-form";
import SetNewPasswordForm from "./set-new-password/setnew-pwd";

const Login = () => {
  const [quet, setQuet] = useState("");
  const getQuet = () => {
    axios
      .get("http://localhost:4000/api/v1/ping")
      .then((res) => {
        console.log(res);
        setQuet(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {quet}{" "}
      {/* <LoginForm />
      <ForgotPwdForm />
      <SetNewPasswordForm /> */}
      <Button onClick={getQuet}>Get</Button>
    </div>
  );
};

export default Login;
