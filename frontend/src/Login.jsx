import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setShowError(false);
    axios
      .post("http://localhost:3001/login", data, {
        withCredentials: true,
        credentials: "include",
      })
      .then((response) => {
        console.log(response.data);
        navigate("/home/index");
      })
      .catch((err) => {
        setShowError(true);
        console.error(err);
      });
  };

  const closeError = () => {
    setShowError(false);
  };
  return (
    <>
      <form className="login-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="login-elements">
          <div>Username</div>
          <input type="text" {...register("username", { required: true })} />
          {errors.password ? (
            <p style={{ color: "red", margin: "3px 0px" }}>
              This is a required input
            </p>
          ) : null}
        </div>
        <div className="login-elements">
          <div>Password</div>
          <input
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password ? (
            <p style={{ color: "red", margin: "3px 0px" }}>
              This is a required input
            </p>
          ) : null}
        </div>
        <button type="submit">Login</button>
        {showError && (
          <div>
            <p style={{ color: "red" }}>Invalid username and/or password</p>
            {closeError}
          </div>
        )}
      </form>
    </>
  );
};

export default Login;
