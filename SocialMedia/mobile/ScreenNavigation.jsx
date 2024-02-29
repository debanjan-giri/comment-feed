import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import About from "./screens/About";
import Account from "./screens/Account";
import Post from "./screens/Post";

import { AuthContext } from "./context/authContextApi";
import Logout from "./components/Logout";

const ScreenNavigation = () => {
  const Stack = createNativeStackNavigator();
  const [state] = useContext(AuthContext);

  // check if user is authenticated
  const authenticatedUser = state?.user && state?.token;

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      {!authenticatedUser ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Home",
              headerStyle: { backgroundColor: "white" },
              headerTitleStyle: { color: "black", fontWeight: "normal" },
              headerBackVisible: false,
              headerShown: true,
              headerRight: () => <Logout />,
            }}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={{
              title: "About",
              headerStyle: { backgroundColor: "white" },
              headerTitleStyle: { color: "black", fontWeight: "normal" },
              headerBackVisible: false,
              headerShown: true,
              headerRight: () => <Logout />,
            }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              title: "Account",
              headerStyle: { backgroundColor: "white" },
              headerTitleStyle: { color: "black", fontWeight: "normal" },
              headerBackVisible: false,
              headerShown: true,
              headerRight: () => <Logout />,
            }}
          />

          <Stack.Screen
            name="Post"
            component={Post}
            options={{
              title: "Post",
              headerStyle: { backgroundColor: "white" },
              headerTitleStyle: { color: "black", fontWeight: "normal" },
              headerBackVisible: false,
              headerShown: true,
              headerRight: () => <Logout />,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenNavigation;
