
import {useNavigate } from 'react-router-dom'

function JoinedCompanyList({companyName,companyId}) {
    const navigate = useNavigate();
    const onClick=()=>{
        console.log("click  ")
        navigate(`/work/company/${companyId}`)
      }
    return (
        
        <li
        className="bg-gray-100 p-2 rounded shadow-sm cursor-pointer hover:bg-blue-900 hover:text-white truncate"
        onClick={onClick}
      >
        {companyName} {/* Adjust according to your company object structure */}
      </li>
    )
}

export default JoinedCompanyList
