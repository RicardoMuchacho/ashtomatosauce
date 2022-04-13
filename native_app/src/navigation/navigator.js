import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../redux/user";

import Login from "../screens/login";
import Home from "../screens/home";
import Register from "../screens/register";
import Manga from "../screens/manga";
import Profile from "../screens/profile";
import HomeTabs from "./homeTabs";
import MangaChapters from '../screens/MangaChapters'
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigator() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      try {
        const stored = await AsyncStorage.getItem("user");
        console.log("working useEffect");
        setUser(stored);
        console.log(user);
        //await AsyncStorage.setItem("accessToken", data.accessToken);
        //handleLogin(data.accessToken, data.following);
      } catch ({ response }) {}
    };
    checkUser();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="MangaChapters" component={MangaChapters} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {key == null ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerRight: () => (
                  <Button
                    onPress={async () => {
                      await SecureStore.deleteItemAsync("user");
                      setKey(null);
                    }}
                    title="Sign Out"
                    color="crimson"
                  />
                ),
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
