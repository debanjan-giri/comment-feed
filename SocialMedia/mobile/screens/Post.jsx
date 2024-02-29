import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContextApi";
import Footer from "../components/Footer";
import axios from "axios";

const Post = ({ navigation }) => {
  const [state] = useContext(AuthContext);
  const [details, setDetails] = useState({
    title: "",
    description: "",
  });

  // handle submit
  const handleSubmit = async () => {
    try {
      // validation
      if (!details.title || !details.description) {
        return alert("All fields are required ");
      }
      // title length validation
      if (details.title.length > 10) {
        return alert("Title should be at least 10 characters");
      }
      // length of data validation
      if (details.description.length > 50) {
        return alert("Description should be at least 50 characters");
      }

      // axios
      const { data } = await axios.post("/curd/create", details, {
        headers: {
          Authorization: state?.token,
        },
      });
      alert(data.message);
      setDetails({});
      navigation.navigate("Home");
      console.log(data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.tilte}>Create Post</Text>
        <TextInput
          style={styles.input}
          value={details.title}
          placeholder="Title"
          placeholderTextColor="black"
          onChangeText={(text) => setDetails({ ...details, title: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="description"
          value={details.description}
          multiline={true}
          numberOfLines={5}
          placeholderTextColor="black"
          onChangeText={(text) => setDetails({ ...details, description: text })}
        />
        {/* submit button */}
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.button}>Submit</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  mainContainer: {
    marginVertical: 3,
    marginHorizontal: 30, // center
  },
  tilte: {
    fontSize: 15,
    marginVertical: 5,
    fontWeight: "normal",
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
    marginBottom: 10,
    textAlignVertical: "top", // top placeholder
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
