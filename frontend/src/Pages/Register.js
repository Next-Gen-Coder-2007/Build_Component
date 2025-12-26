import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://build-component.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      navigate("/login");
    } catch (e) {
      console.log(e);
      setError("Something went wrong");
    }
  };

  return (
    <div className="outer-register-container">
      <div className="register-container">
        <h1>Register Page</h1>

        <div className="register-name-container">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name ..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="register-email-container">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email ..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="register-password-container">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password ..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="register-confirm-password-container">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password ..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button onClick={handleSubmit}>Register</button>

        <div className="login-page-nav">
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>

        {error.length > 0 ? <p>{error}</p> : <></>}
      </div>
    </div>
  );
};

export default Register;
