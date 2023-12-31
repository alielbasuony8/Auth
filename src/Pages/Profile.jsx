/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import useUser from "../Hooks/User";
import axios from "axios";
import { URL } from "../Utils/URL";
import { setDate } from "rsuite/esm/utils/dateUtils";
import Loader from "../Components/Loader";

const Profile = () => {
  const user = useUser();
  const [data, SetData] = useState(null);
  const [error, SetError] = useState(null);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    if (user) {
      axios
        .get(`${URL}/public/user-auth-data`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          SetData(response.data.data);
        })
        .catch((e) => {
          SetError(e.message);
        })
        .finally(() => {
          setLoader(false);
        });
    }
  }, [user]);
  return (
    <>
      {loader ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : data ? (
        <div className="profile">
          <div className="profileCover">
            <div className="generalDetails">
              <div className="userImage">
              <img
                src={data.image}
                alt="user image"
              />
              </div>
              <h3>{data.name}</h3>
            </div>
          </div>
          <div className="container">
            <div className="personalDetails">
              <h2>Personal Details</h2>
              <p>
                <span>Name: </span>{data.name}
              </p>
              <p>
                <span>Email: </span>{data.email}
              </p>
              <p>
                <span>Country Code: </span>{data.code_country}
              </p>
              <p>
                <span>Mobile Number: </span>{data.mobile}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p>No data to show</p>
      )}
    </>
  );
};

export default Profile;
