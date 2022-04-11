import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import store from "./src/app/store";
import { Provider } from "react-redux";

import Navigator from "./src/navigator";

//    <Provider store={store}>
//<Navigator />
//</Provider>

export default function App() {
  return <Navigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
