import React,{ useState} from "react";

const popUpContext = React.createContext()

const PopUpContextProvider =({children})=>{
    const [companyPopUp,setCompanyPopUp]=useState(false)
    const [projectPopUp,setProjectPopUp]=useState(false)
    const [joinPopUp,setJoinPopUp]=useState(false)
    const [TaskPopUp,setTaskPopUp]=useState(false)
    const [companyId,setCompanyId]=useState("")
    const [projectId,setProjectId]=useState("")
    const [updated,setUpdated]=useState(false)

    return (
        <popUpContext.Provider value={{companyPopUp,setCompanyPopUp,projectPopUp,setProjectPopUp,joinPopUp,setJoinPopUp,TaskPopUp,setTaskPopUp,companyId,setCompanyId,projectId,setProjectId,updated,setUpdated}}>
            {children}
        </popUpContext.Provider>
    )
}


export  {PopUpContextProvider,popUpContext};