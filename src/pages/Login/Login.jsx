import React, { useState } from "react";
import "./Login.css";

/* Material Icons */
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";

const Login = ({ closelogin = () => {} }) => {
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Field-wise error state
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    setError({ ...error, [name]: "" }); // clear error while typing
  };

const handleSubmit = (e) => {
  e.preventDefault();

  let errors = {};

  if (!form.email) errors.email = "Email is required";
  if (!form.password) errors.password = "Password is required";

  if (Object.keys(errors).length > 0) {
    setError(errors);
    return;
  }

  const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

  const user = accounts.find(
    (acc) => acc.email === form.email && acc.password === form.password
  );

  if (!user) {
    const emailExists = accounts.some(
      (acc) => acc.email === form.email
    );

    if (!emailExists) {
      setError({ email: "Email not found", password: "" });
    } else {
      setError({ email: "", password: "Incorrect password" });
    }
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  navigate("/dashboard");
};


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="form-top">
          <button className="close-btn" onClick={closelogin}>
            ✖
          </button>
          <h2>Login</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <label>Email:</label>
          <div className="input-wrapper">
            <div className="inputBox">
              <EmailIcon className="inputIcon" sx={{ fontSize: 18 }} />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className={
                  error.email
                    ? "input-error"
                    : form.email
                    ? "input-success"
                    : ""
                }
              />
            </div>
            <p className="error-msg">{error.email}</p>
          </div>

          {/* Password */}
          <label>Password:</label>
          <div className="input-wrapper">
            <div className="inputBox">
              <LockIcon className="inputIcon" sx={{ fontSize: 18 }} />
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                className={
                  error.password
                    ? "input-error"
                    : form.password
                    ? "input-success"
                    : ""
                }
              />
            </div>
            <p className="error-msg">{error.password}</p>
          </div>

          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
