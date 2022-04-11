import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import store from "./src/app/store";
import { Provider } from "react-redux";

import Navigator from "./src/navigator";

console.log(store.getState());

const selectUserValue = (state) => state.user;

const current = selectUserValue(store.getState());

console.log(current.logged);

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
