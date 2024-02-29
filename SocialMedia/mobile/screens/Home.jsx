import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContextApi";
import Footer from "../components/Footer";

const Home = () => {
  // global state
  const [state] = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View  style={styles.mainContainer}>
        <Text>{JSON.stringify(state, null, 4)}</Text>
      </View>
      <Footer />
    </View>
  );
};

export default Home;

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
