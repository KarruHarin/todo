import React, { useContext, useEffect, useState, useCallback } from "react";
import arrow from "../assets/NavBarAssets/arrow.svg";
import { popUpContext } from "../Context/PopUpContext";
import { authContext } from "../Context/authContext";
import { getAllCompanies } from "../Authentication/company";

function NavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setCompanyPopUp } = useContext(popUpContext);
  const { user } = useContext(authContext);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  useEffect(() => {
    if (user?._id) {
      const fetchCompanies = async () => {
        setLoading(true);
        try {
          const res = await getAllCompanies({ userId: user._id });
          console.log(res);
          setCompanies(res.data.data); // Assuming res.data contains the list of companies
        } catch (error) {
          setError(error);
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchCompanies();
    }
  }, [user?._id]);

  return (
    <div
      className={`flex flex-col bg-white transition-all duration-300 relative ${
        sidebarOpen ? 'w-52' : 'w-14'
      }`}
      style={{
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        className="bg-black w-full h-12 relative flex items-center justify-between px-2"
        style={{
          borderRadius: "0px 20px 0px 0px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {sidebarOpen && <p className="text-white">{user.username}</p>}

        <img
          src={arrow}
          className="cursor-pointer absolute right-0 transition-transform duration-300 rounded-lg"
          onClick={toggleSidebar}
          style={{ transform: sidebarOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          alt="Toggle Sidebar"
        />
      </div>
      <div
        className={`w-full transition-transform duration-300 ${
          sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-100%]'
        }`}
        style={{
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#FDFDFD",
          height: "calc(100vh - 48px)",
          overflowY: 'auto',
        }}
      >
        {loading ? (
          <p className="text-center p-4">Loading...</p>
        ) : error ? (
          <p className="text-center p-4 text-red-500">Error: {error.message}</p>
        ) : companies.length > 0 ? (
          <ul className="p-4 space-y-2">
            {companies.map(company => (
              <li
                key={company._id}
                className="bg-gray-100 p-2 rounded shadow-sm"
              >
                {company.name} {/* Adjust according to your company object structure */}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center p-4">No companies found</p>
        )}
      </div>

      <div
        className="absolute bottom-0 w-full h-12 text-center"
        style={{ backgroundColor: "black" }}
      >
        {sidebarOpen && (
          <button
            className="text-white text-center"
            onClick={() => setCompanyPopUp(true)}
          >
            Create Company
          </button>
        )}
      </div>
    </div>
  );
}

export default NavBar;
