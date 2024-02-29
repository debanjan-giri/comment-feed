import React from "react";
import { AuthProvider } from "./context/authContextApi";
import ScreenNavigation from "./ScreenNavigation";
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <ScreenNavigation />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
