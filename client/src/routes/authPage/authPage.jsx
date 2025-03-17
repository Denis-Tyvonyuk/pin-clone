import "./authPage.css";
import Image from "../../components/Image/image";
import { useState } from "react";

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="authPage">
      <div className="authContainer">
        <Image path={"/general/logo.png"} w={36} h={36} alt={""} />
        <h1>{isRegister ? "Create an Account" : "Login to your account"}</h1>
        {isRegister ? (
          <form key={"registerForm"}>
            <div className="formGroup">
              <label htmlFor="userName">User Name</label>
              <input
                type="userName"
                placeholder="User Name"
                required
                name="userName"
              ></input>
            </div>
            <div className="displayName">
              <label htmlFor="displayName">Name</label>
              <input
                type="displayName"
                placeholder="Name"
                required
                name="displayName"
              ></input>
            </div>
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
              ></input>
            </div>
            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
              ></input>
            </div>
            <button type="submit">Register</button>
            <p onClick={() => setIsRegister(false)}>
              Do you have an account? <b>Login</b>
            </p>
            {error && <p className="error">{error}</p>}
          </form>
        ) : (
          <form key={"loginForm"}>
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
              ></input>
            </div>
            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
              ></input>
            </div>
            <button type="submit">Login</button>
            <p onClick={() => setIsRegister(true)}>
              Dont have an account <b>Register</b>
            </p>
            {error && <p className="error">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
