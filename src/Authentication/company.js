import axios from "axios"

const getAllCompanies = async(credentials)=>{
    try {
        const res = await axios.post("http://localhost:8000/v1/users/getAllCompanies",credentials,{withCredentials:true});
        console.log(res);
        return res;
        
    } catch (error) {
        console.log(error);
    }
}

export {getAllCompanies}