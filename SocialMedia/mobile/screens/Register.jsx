import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = ({ navigation }) => {
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
      const { data } = await axios.post("/auth/register", details);
      alert("Successfully registered");

      // local storage
      const loadedData = {
        token: data.data.token, // new data from server
        user: {
          _id: data.data?.user._id, // new data from server
          email: data.data.user.email, // new data from server
        },
      };
      console.log(loadedData);

      // store permanently data in local storage
      await AsyncStorage.setItem("@authApk-1", JSON.stringify(loadedData));
  
      navigation.navigate("Login");
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register</Text>

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
        Already have an account?{" "}
        <Text
          style={{
            color: "green",
            fontSize: 17,
            textDecorationLine: "underline",
          }}
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </Text>
      </Text>
    </View>
  );
};

export default Register;

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
