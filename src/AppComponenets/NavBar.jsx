import React, { useContext, useEffect, useState, useCallback } from "react";
import arrow from "../assets/NavBarAssets/arrow.svg";
import { popUpContext } from "../Context/PopUpContext";
import { authContext } from "../Context/authContext";
import { getAllCompanies } from "../Authentication/company";
import CompanyList from "../Components/CompanyList";

function NavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setCompanyPopUp } = useContext(popUpContext);
  const {setJoinPopUp} = useContext(popUpContext);
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
          setCompanies(res.data.data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchCompanies();
    }
  }, [user?._id]);

  return (
    <div
      className={`flex flex-col bg-white transition-all duration-300 ease-in-out relative ${
        sidebarOpen ? 'w-52' : 'w-16'
      } h-screen shadow-lg`}
    >
      {/* Header */}
      <div
        className="bg-black w-full h-14 flex items-center justify-between px-4 box-border"
        style={{ borderRadius: "0px 20px 0px 0px" }}
      >
        {sidebarOpen && (
          <p className="text-white font-semibold truncate">{user?.username}</p>
        )}
        <img
          src={arrow}
          className="cursor-pointer transform transition-transform duration-300"
          onClick={toggleSidebar}
          style={{ transform: sidebarOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          alt="Toggle Sidebar"
        />
      </div>

      {/* Company List Area */}
      <div
        className={`flex transition-opacity duration-500 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0'
        } flex-col justify-center w-full px-4`}
        style={{ height: "50%", overflowY: "auto" }}
      >
      <p className="p-2">My companies</p>
        {loading ? (
          <p className="text-center text-gray-500 py-4">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-4">Error: {error.message}</p>
        ) : companies.length > 0 ? (
          <ul className="space-y-3">
            {companies.map((company, i) => (
              <CompanyList key={i} companyName={company.name} companyId={company.id} />
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 py-4">No companies found</p>
        )}
      </div>

      {/* Create Company Button */}
      <div className="absolute bottom-0 w-full h-14 bg-gray-900 flex items-center justify-center">
        {sidebarOpen && (
          <div className="flex ">

          <button
            className="text-white font-medium hover:bg-gray-700 px-4 py-2 rounded"
            onClick={() => setCompanyPopUp(true)}
          >
            Create Company
          </button>
          <button
            className="text-white font-medium hover:bg-gray-700 px-4 py-2 rounded"
            onClick={() => setJoinPopUp(true)}
          >
            Join Company
          </button>

          </div>
          
        )}
      </div>
    </div>
  );
}

export default NavBar;
