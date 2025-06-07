
import { createContext, useContext, useState,  } from "react";
import axios from "axios";


const AuthContext = createContext();

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
    return null;
  });
 

  const login = async (email, password) => {
    try {
        const res = await axios.post(`${BACKEND_URL}/login`, {
            email,
            password,
        });

        if (res.data.success === false) {
          throw new Error(res.data.message || "Email Not Found");
        }
        if (!res.data?.token) {
            throw new Error("Server response missing token");
        }
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
        return res.data;
    } catch (error) { throw new Error(error.response?.data?.message ||   "Login failed.");
    }
      
};

  const Logout = () => {
   
    localStorage.removeItem("user");
    setUser(null);
  <a href="/login"></a>
  };

  return (
    <AuthContext.Provider value={{ user ,login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
