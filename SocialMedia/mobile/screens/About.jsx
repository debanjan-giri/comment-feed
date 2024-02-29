import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/authContextApi";
import Footer from "../components/Footer";

const About = () => {
  const [state] = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text>{JSON.stringify(state, null, 4)}</Text>
      </View>

      <Footer />
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  mainContainer: {
    marginVertical: 3,
    marginHorizontal: 10, // center
  },
});
