import { useForm } from "react-hook-form";
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
      .post("https://netzwelt-devtest.azurewebsites.net/Account/SignIn", data)
      .then((response) => {
        console.log(response.data);
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
