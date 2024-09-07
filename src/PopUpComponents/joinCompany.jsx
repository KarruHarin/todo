import axios from 'axios';
import React, { useState, useContext } from 'react';
import { popUpContext } from '../Context/PopUpContext'; // Make sure the context import is correct

const JoinCompany = () => {
  const [companyId, setCompanyId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { setJoinPopUp } = useContext(popUpContext);

  const handleJoinCompany = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:8000/company/joinCompany", {
        companyCode:companyId
      }, { withCredentials: true });

      setSuccess(true);
      setCompanyId('');
      setTimeout(() => setJoinPopUp(false), 2000);
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        setError(error.response.data.message || "An error occurred");
      } else if (error.request) {
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
          onClick={() => { setJoinPopUp(false); }}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-black">Join Company</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">Joined Company successfully!</p>}
        <form onSubmit={handleJoinCompany}>
          <label htmlFor="companyCode" className="block text-black mb-1">
            Company Code
          </label>
          <input
            type="text"
            id="companyCode"
            className="w-full p-2 mb-4 border border-black rounded"
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded w-full"
            disabled={loading}
          >
            {loading ? 'Joining...' : 'Join Company'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default JoinCompany;
