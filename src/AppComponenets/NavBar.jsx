import React, { useContext, useEffect, useState, useCallback } from "react";
import arrow from "../assets/NavBarAssets/arrow.svg";
import { popUpContext } from "../Context/PopUpContext";
import { authContext } from "../Context/authContext";
import { getAllCompanies, getAllJoinedCompanies } from "../Authentication/company";
import CompanyList from "../Components/CompanyList";
import { useNavigate } from "react-router-dom";
import JoinedCompanyList from "../Components/JoinedCompanyList";

function NavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [joinedCompanies, setJoinedCompanies] = useState([]); // Placeholder for joined companies
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState(null); // Controls which section is open

  const { setCompanyPopUp } = useContext(popUpContext);
  const { setJoinPopUp } = useContext(popUpContext);
  const { user } = useContext(authContext);
  const navigate = useNavigate();

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  useEffect(() => {
    if (user?._id) {
      const fetchCompanies = async () => {
        setLoading(true);
        try {
          const res = await getAllCompanies({ userId: user._id });
          const res2= await getAllJoinedCompanies({userId: user._id});
          setCompanies(res.data.data);
          setJoinedCompanies(res2.data.data);
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
      className={`flex flex-col bg-gray-50 transition-all duration-300 ease-in-out relative ${
        sidebarOpen ? "w-56" : "w-20"
      } h-screen shadow-lg border-r border-gray-200`}
      style={{ overflowY: "auto" }} // Handle overflow for the entire sidebar
    >
      {/* Header */}
      <div
        className="bg-blue-900 w-full h-14 flex items-center justify-between px-4 box-border"
        style={{ borderRadius: "0px 20px 0px 0px" }}
      >
        {sidebarOpen && (
          <p className="text-white font-semibold text-lg truncate">
            {user?.username}
          </p>
        )}
        <img
          src={arrow}
          className="cursor-pointer transform transition-transform duration-300"
          onClick={toggleSidebar}
          style={{
            transform: sidebarOpen ? "rotate(180deg)" : "rotate(0deg)",
            
          }}
          alt="Toggle Sidebar"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* My Tasks Section */}
        <div
          className={`px-4 mt-4 transition-all duration-300 ${
            sidebarOpen ? "opacity-100" : "opacity-0 h-0"
          }`}
          style={{ height: sidebarOpen ? "auto" : "0px", overflow: "hidden" }}
        >
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() =>  navigate('/dashboard')}
          >
            <p className="text-gray-700 font-medium">My Tasks</p>
          </div>
         
        </div>

        {/* Joined Companies Section */}
        <div
          className={`px-4 mt-4 transition-all duration-300 ${
            sidebarOpen ? "opacity-100" : "opacity-0 h-0"
          }`}
          style={{ height: sidebarOpen ? "auto" : "0px", overflow: "hidden" }}
        >
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("joinedCompanies")}
          >
            <p className="text-gray-700 font-medium">Joined Companies</p>
            <span>{activeSection === "joinedCompanies" ? "▲" : "▼"}</span>
          </div>
          {activeSection === "joinedCompanies" && (
            <div className="mt-2 transition-all duration-300">
              <ul className="space-y-2">
                {loading ? (
                  <p className="text-gray-400 text-sm">Loading...</p>
                ) : error ? (
                  <p className="text-red-500 text-sm">Error: {error.message}</p>
                ) : joinedCompanies.length > 0 ? (
                  joinedCompanies.map((company, i) => (
                    <JoinedCompanyList key={i} companyName={company.name} companyId={company.id} />
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No companies found</p>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* My Companies Section */}
        <div
          className={`px-4 mt-4 transition-all duration-300 ${
            sidebarOpen ? "opacity-100" : "opacity-0 h-0"
          }`}
          style={{ height: sidebarOpen ? "auto" : "0px", overflow: "auto" }}
        >
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("myCompanies")}
          >
            <p className="text-gray-700 font-medium">My Companies</p>
            <span>{activeSection === "myCompanies" ? "▲" : "▼"}</span>
          </div>
          {activeSection === "myCompanies" && (
            <div className="mt-2 transition-all duration-300">
              <ul className="space-y-2">
                {loading ? (
                  <p className="text-gray-400 text-sm">Loading...</p>
                ) : error ? (
                  <p className="text-red-500 text-sm">Error: {error.message}</p>
                ) : companies.length > 0 ? (
                  companies.map((company, i) => (
                    <CompanyList key={i} companyName={company.name} companyId={company.id} />
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No companies found</p>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Footer - Create & Join Company Buttons */}
      <div className="absolute bottom-0 w-full h-16 bg-gray-100 flex items-center justify-center border-t border-gray-200">
        {sidebarOpen && (
          <div className="flex space-x-3">
            <button
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium px-4 py-2 rounded transition-transform duration-200 transform hover:scale-105 active:scale-95"
              onClick={() => setCompanyPopUp(true)}
            >
              Create
            </button>
            <button
              className="bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white font-medium px-4 py-2 rounded transition-transform duration-200 transform hover:scale-105 active:scale-95"
              onClick={() => setJoinPopUp(true)}
            >
              Join
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
