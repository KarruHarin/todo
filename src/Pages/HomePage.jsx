import React, { useContext, useEffect } from "react";
import NavBar from "../AppComponenets/NavBar";
import CreateCompany from "../PopUpComponents/createCompany"; // Correct import
import { popUpContext } from "../Context/PopUpContext";
import { useNavigate } from "react-router-dom";
import { authContext } from "../Context/authContext";
import { checking } from "../Authentication/authentication";
import { Outlet } from "react-router-dom";

function HomePage() {
  const { companyPopUp, setCompanyPopUp } = useContext(popUpContext);
  const navigate = useNavigate();
  const { setUser, user } = useContext(authContext);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await checking();
        // Pretty-print the object
        if (res?.status !== 200) {
          navigate("/login");
        } else {
          setUser(res.data.data);
          // Pretty-print the user data
        }
      } catch (error) {
        console.error(error); // Use console.error for logging errors
      }
    };
    check();
  }, []);

  return (
    <div className="flex flex-row">
      {" "}
      {/* Adjusted to flex-col for vertical alignment */}
      <NavBar />
      <div>{companyPopUp && <CreateCompany />}</div>
      <Outlet />
    </div>
  );
}

export default HomePage;
