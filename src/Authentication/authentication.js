import axios from "axios";

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/v1/users/login",
        credentials,
        { withCredentials: true }
      );
      
      console.log(response.data);
      return response.data;
    } catch (error) {
        console.error("Login Failed",error);
        return error;
    }
  };

  const checking = async()=>{
    try {
      const response = await axios.post(
        "http://localhost:8000/v1/users/check",
        {},
        {
          withCredentials:true
        }
      )
console.log("hello");
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      
    }
  }


  export {login,checking}