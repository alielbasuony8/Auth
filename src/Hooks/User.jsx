/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const useUser = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);
  return user;
};

export default useUser;
