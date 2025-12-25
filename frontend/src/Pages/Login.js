import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      if (response.ok) {
        navigate("/");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
      }
    } catch (e) {
      console.log(e);
      setError("Server Side Error");
    }
  };
  return (
    <div className="outer-login-container">
      <div className="login-container">
        <h1>Login Page</h1>
        <div className="login-email-container">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email ..."
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="login-password-container">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password ..."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button
          onClick={() => {
            handleSubmit();
          }}
        >
          Login
        </button>
        <div className="register-page-nav">
          <p>
            Dont have an Account ? <a href="/register">Register New</a>
          </p>
        </div>
        {error.length > 0 ? <p>{error}</p> : <></>}
      </div>
    </div>
  );
};

export default Login;
