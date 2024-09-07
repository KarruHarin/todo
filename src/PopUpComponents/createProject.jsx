import axios from 'axios';
import React, { useState, useContext } from 'react';
import { popUpContext } from '../Context/PopUpContext';
import { useParams } from 'react-router-dom';

const CreateProject = () => {
    const {companyId} = useParams()
  const [projectName, setprojectName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { setProjectPopUp } = useContext(popUpContext);
console.log("companyId =", companyId)
  const handleAddCompany = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post("http://localhost:8000/company/createProject", {
        projectName,companyId
      }, { withCredentials: true });
      setSuccess(true);
      setprojectName('');
      setTimeout(() => setCompanyPopUp(false), 2000); // Close modal after 2 seconds
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 2xx
        setError(err.response.data.message || "An error occurred");
      } else if (err.request) {
        // Request was made but no response was received
        setError("No response from server. Please try again later.");
      } else {
        console.log(err)
        // Something else caused the error
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <button
          className="absolute top-2 right-2 text-black text-xl font-bold"
          onClick={() => { setProjectPopUp(false); }}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-black">Add Project</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">Project added successfully!</p>}
        <form onSubmit={handleAddCompany}>
          <label htmlFor="projectName" className="block text-black mb-1">
            Project Name
          </label>
          <input
            type="text"
            id="projectName"
            className="w-full p-2 mb-4 border border-black rounded"
            value={projectName}
            onChange={(e) => setprojectName(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded w-full"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Project'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
