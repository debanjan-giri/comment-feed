import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContextApi";
import Footer from "../components/Footer";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Account = () => {
  const [state, setState] = useContext(AuthContext);

  const [details, setDetails] = useState({
    name: state?.user?.name || "",
    address: state?.user?.address || "",
    password: state?.user?.password || "",
  });

  const handleSubmit = async () => {
    try {
      // validation
      if (!details.name || !details.address || !details.password) {
        return alert("All fields are required ");
      }

      // axios
      const { data } = await axios.put("/auth/update", details, {
        headers: {
          Authorization: state?.token,
        },
      });

      // local storage
      const loadedData = {
        token: state?.token, // old data from state
        user: {
          _id: state?.user._id, // old data from state
          email: state?.user.email, // old data from state
          name: data.data.user.name, // new data from server
          address: data.data.user.address, // new data from server
          password: details.password, // from input field
        },
      };
      // store in local storage
      await AsyncStorage.setItem("@authApk-1", JSON.stringify(loadedData));

      // set state for passing temporary data accross components
      setState(loadedData);
      alert("Successfully updated");
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.mainContainer}>
          {/* image and details */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* image */}
            <Image
              source={{
                uri: "https://media.istockphoto.com/id/846730696/photo/portrait-teenager.jpg?b=1&s=170667a&w=0&k=20&c=PNz3dsppr_Q0s_dNI_LaZdoY0oQtH812tvwZ13n-ods=",
              }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginVertical: 10,
                alignSelf: "flex-start",
              }}
            />

            {/* group of details */}
            <View>
              <Text>Name : {state?.user?.name}</Text>
              <Text>Email : {state?.user?.email}</Text>
              <Text>ID: {state?.user?._id}</Text>
            </View>
          </View>

          {/* input Heading */}
          <Text style={styles.InputHeading}>Update Details</Text>
          <Text style={styles.title}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={state?.user?.email}
            editable={false}
          />
          <Text style={styles.title}>Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(e) => {
              setDetails({ ...details, name: e });
            }}
            value={details?.name}
            placeholder="Name"
            autoComplete="additional-name"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
          />
          <Text style={styles.title}>Address</Text>
          <TextInput
            style={styles.input}
            onChangeText={(e) => {
              setDetails({ ...details, address: e });
            }}
            value={details?.address}
            placeholder="Address"
            multiline={true}
            autoComplete="street-address"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
          />
          <Text style={styles.title}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={(e) => {
              setDetails({ ...details, password: e });
            }}
            value={details?.password}
            placeholder="Type New Password"
            autoComplete="password"
            keyboardType="phone-pad"
            secureTextEntry={true}
          />
          {/* submit button */}
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={styles.button}>Update</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1, // by default flex direction is column
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  mainContainer: {
    marginVertical: 3,
    marginHorizontal: 20, // center
  },
  InputHeading: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 3,
    backgroundColor: "#f0f0f0",
    borderColor: "#f0f0f0",
  },
  button: {
    backgroundColor: "green",
    padding: 6,
    borderRadius: 5,
    color: "white",
    textAlign: "center",
    fontSize: 17,
    marginTop: 10,
  },
  title: {
    marginVertical: 5,
    marginLeft: 5,
  },
});
