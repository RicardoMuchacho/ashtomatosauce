import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Login from "../screens/login";
import Home from "../screens/home";
import Register from "../screens/register";
import Manga from "../screens/manga";
import Profile from "../screens/profile";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function HomeTabs({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={() => ({
        headerRight: () => (
          <Button
            onPress={async () => {
              await AsyncStorage.removeItem("user");
              await AsyncStorage.removeItem("token")
                .then((res) => navigation.navigate("Login"))
                .catch((error) => console.log(error));
            }}
            title="Sign Out"
            color="crimson"
          />
        ),
        //headerRightContainerStyle: {
        //  marginRight: 10,
        //},
        tabBarActiveTintColor: "crimson",
        tabBarInactiveTintColor: "gray",
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name="Add a Manga"
        component={Manga}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="pluscircleo" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="User Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
