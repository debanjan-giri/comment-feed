import React from "react";
import { View, Text, TextInput } from "react-native";
import { AuthProvider } from "./context/authContextApi";
import ScreenNavigation from "./ScreenNavigation";
import { NavigationContainer } from "@react-navigation/native";
import Register from "./screens/Register";

const MainApp = () => {
  return (
    // <NavigationContainer>
    //   <AuthProvider>
    //     <ScreenNavigation />
    //   </AuthProvider>
    // </NavigationContainer>
    <View style={{marginTop:40,marginHorizontal:20}}>
      <Text>hello</Text>
      <TextInput placeholder="hello"/>
    </View>
  );
};

export default MainApp;
