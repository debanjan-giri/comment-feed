import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";

const Footer = () => {
  // hooks
  const navigation = useNavigation();
  const route = useRoute();

  // Function to determine whether the button is active
  const isActive = (screenName) => {
    return route.name === screenName;
  };

  return (
    <View style={style.container}>
      <TouchableOpacity
        style={style.button}
        onPress={() => navigation.navigate("Home")}
      >
        <View style={style.buttonContent}>
          <AntDesign
            name="home"
            size={24}
            color={isActive("Home") ? "red" : "black"}
          />
          <Text
            style={[
              style.buttonText,
              { color: isActive("Home") ? "red" : "black" },
            ]}
          >
            Home
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={style.button}
        onPress={() => navigation.navigate("Post")}
      >
        <View style={style.buttonContent}>
          <AntDesign
            name="pluscircleo"
            size={24}
            color={isActive("Post") ? "red" : "black"}
          />
          <Text
            style={[
              style.buttonText,
              { color: isActive("Post") ? "red" : "black" },
            ]}
          >
            Post
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={style.button}
        onPress={() => navigation.navigate("About")}
      >
        <View style={style.buttonContent}>
          <AntDesign
            name="hearto"
            size={24}
            color={isActive("About") ? "red" : "black"}
          />
          <Text
            style={[
              style.buttonText,
              { color: isActive("About") ? "red" : "black" },
            ]}
          >
            About
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={style.button}
        onPress={() => navigation.navigate("Account")}
      >
        <View style={style.buttonContent}>
          <AntDesign
            name="user"
            size={24}
            color={isActive("Account") ? "red" : "black"}
          />
          <Text
            style={[
              style.buttonText,
              { color: isActive("Account") ? "red" : "black" },
            ]}
          >
            Account
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 15,
    justifyContent: "space-between",
    borderTopColor: "#f0f0f0",
    borderTopWidth: 1,
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  buttonContent: {
    alignItems: "center",
  },
  buttonText: {
    marginTop: 2,
  },
});
