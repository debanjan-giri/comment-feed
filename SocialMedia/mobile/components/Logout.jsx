import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/authContextApi";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Logout = () => {
  const [state, setState] = useContext(AuthContext);

  // logout function
  const HandleLogout = async () => {
    try {
      Alert.alert("Logout", "Are you sure?", [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "OK",
          onPress: async () => {
            setState(null); // set state to null
            await AsyncStorage.removeItem("@authApk-1");
            alert("Logout Successful");
          },
        },
      ]);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={HandleLogout} style={styles.container}>
        <MaterialIcons name="logout" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
});
