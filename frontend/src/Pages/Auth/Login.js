import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useState, useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/verify", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          await fetch("http://localhost:5000/api/auth/logout", {
            method: "POST",
            credentials: "include",
          });
          navigate("/login", { replace: true });
        }
      } catch {}
    };
    checkLogin();
  }, [navigate]);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.ok) {
        navigate("/");
      } else {
        const errorData = await response.json();
        console.log(errorData)
      }
    } catch (e) {
      console.log(e);
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
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="login-password-container">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password ..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleSubmit}>Login</button>

        <div className="register-page-nav">
          <p>
            Don't have an Account? <a href="/register">Register New</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
