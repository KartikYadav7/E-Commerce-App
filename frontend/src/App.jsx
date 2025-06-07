import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedPage from "./Pages/ProtectedPage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import EmailVerification from "./Pages/EmailVerification";
import Error from "./Pages/Error";
import  {AuthProvider}  from "../context/AuthContext";
import ProtectedRoute from "../context/ProtectedRoute";
const App = () =>  {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
        
            <Routes>
              <Route path="/" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/verification" element={<EmailVerification />} />
               <Route path="/*" element={<Error />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<ProtectedPage />} />
              </Route>
             
            </Routes>
         
        </AuthProvider>
        </BrowserRouter>
     
    </>
  );
};

export default App;
