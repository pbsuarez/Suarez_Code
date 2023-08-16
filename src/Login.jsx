import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // submit logic here
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
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
