/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { URL } from "../Utils/URL";
import { RiFolderUserFill } from "react-icons/ri";
import { IoIosCall } from "react-icons/io";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  
  const navigatTo = useNavigate();
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
    if (!password_confirmation) {
      toast.warn("Missing password");
      isValid = false;
    }
    if (password !== password_confirmation) {
      toast.warn("Password not identical!");
      isValid = false;
    }
    if (!mobile) {
      toast.warn("Mobile Number is requuired");
      isValid = false;
    }
    if (!name) {
      toast.warn("Name is requuired");
      isValid = false;
    }
    return isValid;
  };
  const handleSubmit = async () => {
    try {
      if (validateForm()) {
        const reqBody = {
          name,
          mobile,
          email,
          password,
          password_confirmation,
          code_country: "20",
          lang: "ar",
          fcm_token: "test",
        };
        const response = await axios.post(`${URL}/public/register`, reqBody);
        if (response) {
          console.log(response);
          localStorage.setItem("user", JSON.stringify(response.data.data));
          localStorage.setItem("token", response.data.data.token);
          navigatTo("/profile");
          window.location.reload();
        }
      }
    } catch (e) {
      toast.error(e.response.data.message);
      console.log(e);
    }
  };
  return (
    <div className="authScreen">
      <div className="authForm">
        <h2>Create new account</h2>
        <div className="inputArea">
          <RiFolderUserFill />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          <IoIosCall />
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
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
        <div className="inputArea">
          <FaLock />
          <input
            type="password"
            placeholder="Password Confirmation"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>
        <a href="/login">Do you have an account? </a>
        <button className="submitBtn" onClick={()=> handleSubmit()}>Sign Up</button>
      </div>
    </div>
  );
};

export default SignUp;
