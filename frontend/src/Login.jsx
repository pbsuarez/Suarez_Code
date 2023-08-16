import { useForm } from "react-hook-form";
import { BrowserRouter as Redirect } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Submitting form . . .");
    // submit logic here
    axios
      .post("http://localhost:3001/login", data)
      .then((response) => {
        console.log(response);
        axios
          .get("http://localhost:3001/protected", {
            withCredentials: true,
            credentials: "include",
          })
          .then((response) => {
            response.status === 200 ? <Redirect to="/dashboard" /> : null;
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
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
      </form>
    </>
  );
};

export default Login;
