import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./updateForm.css";
import { toast } from "react-toastify";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
const AccountSettings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [fullname, setFullname] = useState("");

  /* Load user */
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setUser(currentUser);
    setFullname(currentUser.fullname || "");
  }, [navigate]);

  /* Save changes */
  const handleSave = () => {
    if (!fullname.trim()) {
      toast.error("Full name cannot be empty");
      return;
    }

    const updatedUser = { ...user, fullname };

    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const updatedAccounts = accounts.map(acc =>
      acc.id === user.id ? updatedUser : acc
    );

    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    setUser(updatedUser);

    setTimeout(() => {
      toast.success("Profile updated successfully");
      navigate("/dashboard")
    }, 1500);
  };

  /* Delete account */
  const deleteAccount = () => {
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const updatedAccounts = accounts.filter(acc => acc.id !== user.id);

    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
    localStorage.removeItem("currentUser");
    localStorage.removeItem(`tx_${user.id}`);

    toast.success("Account deleted successfully");

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  /* Toast confirmation */
  const handleCloseAccount = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p style={{ fontWeight: "600" }}>Are you sure?</p>
          <p style={{ fontSize: "14px" }}>
            This will permanently delete your account.
          </p>

          <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
            <button
              onClick={() => {
                deleteAccount();
                closeToast();
              }}
              style={{
                background: "#dc2626",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Yes, Delete
            </button>

            <button
              onClick={closeToast}
              style={{
                background: "#e5e7eb",
                border: "none",
                padding: "6px 12px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  if (!user) return null;

  return (
    <div className="settings-wrapper">
      <div className="settings-card">

        <div className="settings-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowBackIosIcon /> Go Back
          </button>

          <h2>Account Settings</h2>
          <p className="set-p">Manage your personal details and security preferences.</p>
        </div>

        <div className="settings-body">
          <label>Full Name</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />

          <label>Email Address</label>
          <input type="email" value={user.email} disabled />

          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>

        <div className="danger-zone">
          <div>
            <h4>Close Account</h4>
            <p>Permanently delete your data and balance.</p>
          </div>
          <button className="upclose-btn" onClick={handleCloseAccount}>
            Close Account
          </button>
        </div>

      </div>
    </div>
  );
};

export default AccountSettings;
