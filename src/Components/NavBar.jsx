/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useUser from "../Hooks/User";

const NavBar = () => {
  const navigatTo = useNavigate();
  const user = useUser()
  const [isUser, setUser] = useState(null);
  const logOut = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigatTo("/");
    window.location.reload();
  };
  useEffect(() => {
    if (user) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, [user]);
  return (
    <header>
      <nav>
        <a href="/" className="logo">
          Practise
        </a>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          {user && (
            <li>
              <Link to={"/profile"}>Profile</Link>
            </li>
          )}
        </ul>
        {isUser && (
          <button className="btn" onClick={() => logOut()}>
            Log Out
          </button>
        )}{" "}
        {!isUser && (
          <button className="btn" onClick={() => navigatTo("/login")}>
            Join Us
          </button>
        )}
      </nav>
      <ToastContainer />
    </header>
  );
};

export default NavBar;
