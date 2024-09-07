import React,{ useState} from "react";

const popUpContext = React.createContext()

const PopUpContextProvider =({children})=>{
    const [companyPopUp,setCompanyPopUp]=useState(false)
    const [projectPopUp,setProjectPopUp]=useState(false)
    const [joinPopUp,setJoinPopUp]=useState(false)
    const [TaskPopUp,setTaskPopUp]=useState(false)

    return (
        <popUpContext.Provider value={{companyPopUp,setCompanyPopUp,projectPopUp,setProjectPopUp,joinPopUp,setJoinPopUp,TaskPopUp,setTaskPopUp}}>
            {children}
        </popUpContext.Provider>
    )
}


export  {PopUpContextProvider,popUpContext};