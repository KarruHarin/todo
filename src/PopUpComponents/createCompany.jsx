import axios from 'axios';
import React, { useState, useContext } from 'react';
import { popUpContext } from '../Context/PopUpContext';

const CreateCompany = () => {
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { setCompanyPopUp } = useContext(popUpContext);

  const handleAddCompany = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post("http://localhost:8000/company/createCompany", {
        companyName
      }, { withCredentials: true });
      setSuccess(true);
      setCompanyName('');
      setTimeout(() => setCompanyPopUp(false), 2000); // Close modal after 2 seconds
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 2xx
        setError(err.response.data.message || "An error occurred");
      } else if (err.request) {
        // Request was made but no response was received
        setError("No response from server. Please try again later.");
      } else {
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
          onClick={() => { setCompanyPopUp(false); }}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-black">Add Company</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">Company added successfully!</p>}
        <form onSubmit={handleAddCompany}>
          <label htmlFor="companyName" className="block text-black mb-1">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            className="w-full p-2 mb-4 border border-black rounded"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded w-full"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Company'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCompany;
