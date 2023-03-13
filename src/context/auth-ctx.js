import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = React.createContext({
  user: {},
  token: "",
  isLoggedIn: false,
  setUser: (user) => {},
  setToken: (token) => {},
  logout:()=>{}
});

export default function AuthContextProvider(props) {
  const navigate = useNavigate()
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const isLoggedIn = !!token;

  const setUserHandler = (user) => {
    setUser(user);
  };
  const setTokenHandler = (token) => {
    setToken(token);
  };
  const logoutHandler = ()=>{
    setToken('')
    navigate('/')
  }

  const authContextValues = {
    user,
    token,
    isLoggedIn,
    setUser: setUserHandler,
    setToken: setTokenHandler,
    logout:logoutHandler
  };

  return (
    <AuthContext.Provider value={authContextValues}>
      {props.children}
    </AuthContext.Provider>
  );
}
