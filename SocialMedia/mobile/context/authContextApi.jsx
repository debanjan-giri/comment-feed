import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

const AuthContext = createContext();

// create auth provider
function AuthProvider({ children }) {
  // create global state
  const [state, setState] = useState({});

  // set axios base url
  axios.defaults.baseURL = "http://192.168.223.153:8080/api";

  // initial getting data from storage
  useEffect(() => {
    const getData = async () => {
      const Data = await AsyncStorage.getItem("@authApk-1");
      const loginData = JSON.parse(Data);
      setState(loginData);
    };
    getData();
  }, []);

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
