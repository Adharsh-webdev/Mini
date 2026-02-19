import React, { useContext, useState } from "react";
import "./AccountCreationForm.css";

/* Material Icons */
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate } from "react-router-dom";


const AccountCreateForm = ({ closemodal = () => { } }) => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    amount: "",
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const generateAccountNumber = () => {
    let acc = "";
    for (let i = 0; i < 12; i++) {
      acc += Math.floor(Math.random() * 10);
    }
    return acc;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    if (!form.fullname) errors.fullname = "Full name is required!";
    if (!form.email) errors.email = "Email is required!";
    if (!form.password) errors.password = "Password is required!";
    if (!form.amount) errors.amount = "Amount is required!";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email && !emailRegex.test(form.email))
      errors.email = "Enter a valid email!";

    if (form.password && form.password.length < 6)
      errors.password = "Password must be at least 6 characters!";

    if (form.amount && Number(form.amount) <= 0)
      errors.amount = "Amount must be greater than 0!";

    const accounts =
      JSON.parse(localStorage.getItem("accounts")) || [];

    if (accounts.some(acc => acc.email === form.email))
      errors.email = "Email already registered!";

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    const newAccount = {
      id: Date.now(),
      fullname: form.fullname,
      email: form.email,
      password: form.password,
      amount: Number(form.amount), // 🔥 FIX
      accountNumber: generateAccountNumber(),
    };

    // Save account
    localStorage.setItem(
      "accounts",
      JSON.stringify([...accounts, newAccount])
    );
    localStorage.setItem("currentUser", JSON.stringify(newAccount));

    // ✅ Initial recent activity
    const initialTransaction = {
      id: Date.now(),
      type: "deposit",
      amount: Number(form.amount),
      reference: "Account Opening Deposit",
      date: new Date().toLocaleDateString("en-IN"),
    };

    localStorage.setItem(
      `tx_${newAccount.id}`,
      JSON.stringify([initialTransaction])
    );

    navigate("/dashboard");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="form-top">
          <button type="button" className="close-btn" onClick={closemodal}>
            ✖
          </button>
          <h2>Create Your Account</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <label>Full Name:</label>
          <div className="input-wrapper">
            <div className="inputBox">
              <PersonIcon className="inputIcon" sx={{ fontSize: "18px" }} />
              <input
                type="text"
                placeholder="Enter your name"
                name="fullname"
                value={form.fullname}
                onChange={handleChange}
              />
            </div>
            <p className="error-msg">{error.fullname || " "}</p>
          </div>

          {/* Email */}
          <label>Email:</label>
          <div className="input-wrapper">
            <div className="inputBox">
              <EmailIcon className="inputIcon" sx={{ fontSize: "18px" }} />
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <p className="error-msg">{error.email || " "}</p>
          </div>

          {/* Password */}
          <label>Password:</label>
          <div className="input-wrapper">
            <div className="inputBox">
              <LockIcon className="inputIcon" sx={{ fontSize: "18px" }} />
              <input
                type="password"
                placeholder="Enter password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <p className="error-msg">{error.password || " "}</p>
          </div>

          {/* Initial Amount */}
          <label>Initial Amount:</label>
          <div className="input-wrapper">
            <div className="inputBox">
              <CurrencyRupeeIcon className="inputIcon" sx={{ fontSize: "18px" }} />
              <input
                type="number"
                placeholder="Enter amount"
                name="amount"
                value={form.amount}
                onChange={handleChange}
              />
            </div>
            <p className="error-msg">{error.amount || " "}</p>
          </div>

          <button type="submit" className="submit-btn">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountCreateForm;
