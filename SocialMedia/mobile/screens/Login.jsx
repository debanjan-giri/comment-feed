import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/authContextApi";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  // global state
  const [state, setState] = useContext(AuthContext);

  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  // handle submit
  async function handleSubmit() {
    try {
      // validation
      if (!details.email || !details.password) {
        return alert("All fields are required");
      }

      // axios
      const { data } = await axios.post("/auth/login", details);

      // local storage
      const loadedData = {
        token: data.data.token, // new data from server
        user: {
          _id: data.data?.user._id, // new data from server
          email: data.data.user.email, // new data from server
          name: data.data.user.name,
          address: data.data.user.address,
          password: details.password,
        },
      };

      // set state for passing temporary data accross components
      setState(loadedData);

      // store permanently data in local storage
      await AsyncStorage.setItem("@authApk-1", JSON.stringify(loadedData));

      setDetails({});
      alert(data && data.message);
      navigation.navigate("Home");
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>

      {/*  email input */}
      <TextInput
        value={details.email}
        onChangeText={(e) => setDetails({ ...details, email: e })}
        style={styles.input}
        placeholder="Enter your email"
        autoComplete="email"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
      />

      {/* password input */}
      <TextInput
        value={details.password}
        onChangeText={(e) => setDetails({ ...details, password: e })}
        style={styles.input}
        placeholder="Enter your password"
        autoComplete="password"
        // secureTextEntry={true} // for password
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="phone-pad"
      />

      {/* submit button */}
      <TouchableOpacity onPress={handleSubmit}>
        <Text style={styles.button}>Submit</Text>
      </TouchableOpacity>

      {/* login text */}
      <Text style={{ marginTop: 7 }}>
        Already have an account? {/* navigate to register */}
        <Text
          style={{
            color: "green",
            fontSize: 17,
            textDecorationLine: "underline",
          }}
          onPress={() => {
            return navigation.navigate("Register");
          }}
        >
          Register
        </Text>
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 40,
  },
  heading: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 20,
    marginVertical: 15,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 3,
    backgroundColor: "#f0f0f0",
    borderColor: "#f0f0f0",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "green",
    padding: 6,
    borderRadius: 5,
    color: "white",
    textAlign: "center",
    fontSize: 17,
  },
});
