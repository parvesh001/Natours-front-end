//===========>>> NEED TO FIX <<===========

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
  const initialToken = localStorage.getItem('token')
  const initialUser = localStorage.getItem('user')
  const navigate = useNavigate()
  const [user, setUser] = useState(JSON.parse(initialUser) || {});
  const [token, setToken] = useState(JSON.parse(initialToken));
  const isLoggedIn = !!token;

  const setUserHandler = (user) => {
    localStorage.setItem('user',JSON.stringify(user))
    setUser(user);
  };
  const setTokenHandler = (token) => {
    localStorage.setItem('token', JSON.stringify(token))
    setToken(token);
  };
  const logoutHandler = ()=>{
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setToken('')
    setUser({})
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
