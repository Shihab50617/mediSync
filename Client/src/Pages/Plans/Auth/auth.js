import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
const navigate = useNavigate();
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/users/login",
        {
          email,
          password,
        }
      );

    
      if (response.data.success && response.data.user) {
        setUser(response.data.user);
       navigate("/")

      } else {
        throw new Error("Invalid Email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
