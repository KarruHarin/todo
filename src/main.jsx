import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import SignUpPage from "./Components/SignUp.jsx";
import "./index.css";
import LoginPage from "./Components/Login.jsx";
import HomePage from "./Pages/HomePage.jsx";
import NavBar from "./AppComponenets/NavBar.jsx";
import { PopUpContextProvider } from "./Context/PopUpContext.jsx";
import { AuthProvider } from "./Context/authContext.jsx";
import CompanyProjects from "./Pages/CompanyPage.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [  
      {
        path:"/company",
        element:<CompanyProjects/>
      }
    ],
  },
  {
    path:"/login",
    element:<LoginPage/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>

    <PopUpContextProvider>
        <RouterProvider router={router} />
      </PopUpContextProvider>

    </AuthProvider>
     
 
  </React.StrictMode>
);
