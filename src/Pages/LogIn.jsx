/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { URL } from "../Utils/URL";
import { json, useNavigate } from "react-router-dom";
const LogIn = () => {
  const navigatTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const validateForm = () => {
    let isValid = true;
    if (!email) {
      toast.warn("Email is Required");
      isValid = false;
    }
    if (!password) {
      toast.warn("Missing password");
      isValid = false;
    }
    return isValid;
  };
  const handleSubmit = async () => {
    try {
      if (validateForm()) {
        const reqBody = { email, password, fcm_token: "test", lang: "ar" };
        const response = await axios.post(`${URL}/public/login`, reqBody);
        if (response) {
          console.log(response);
          localStorage.setItem("user", JSON.stringify(response.data.data))
          localStorage.setItem("token", response.data.data.token);
          navigatTo("/profile");
          window.location.reload();
        }
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  return (
    <div className="authScreen">
      <div className="authForm">
        <h2>Log In to your Account</h2>
        <div className="inputArea">
          <FaUserAlt />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="inputArea">
          <FaLock />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <a href="/signup">Do you not have an account? </a>
        <button className="submitBtn" onClick={() => handleSubmit()}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default LogIn;
