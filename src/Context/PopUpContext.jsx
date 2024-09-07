import React,{ useState} from "react";

const popUpContext = React.createContext()

const PopUpContextProvider =({children})=>{
    const [companyPopUp,setCompanyPopUp]=useState(false)
    const [projectPopUp,setProjectPopUp]=useState(false)

    return (
        <popUpContext.Provider value={{companyPopUp,setCompanyPopUp,projectPopUp,setProjectPopUp}}>
            {children}
        </popUpContext.Provider>
    )
}


export  {PopUpContextProvider,popUpContext};