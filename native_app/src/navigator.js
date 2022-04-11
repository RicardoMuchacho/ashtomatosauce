import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { createContext, useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import Login from "./screens/login";
import Home from "./screens/home";
import Register from "./screens/register";
import Manga from "./screens/manga";
import Profile from "./screens/profile";
import * as SecureStore from "expo-secure-store";
import LoginScreen from "./screens/login";
import HomeScreen from "./screens/home";

const Stack = createNativeStackNavigator();
const UserContext = createContext();
const Tab = createBottomTabNavigator();

function HomeTabs({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={() => ({
        headerRight: () => (
          <Button
            onPress={async () => {
              await SecureStore.deleteItemAsync("user")
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
      })}
    >
      <Tab.Screen
        name="Manga"
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
        name="Profile"
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
export default function Navigator() {
  const [key, setKey] = useState(null);
  const updateKey = async (username) => {
    setKey(username);
  };

  async function getValueFor(key) {
    const result = await SecureStore.getItemAsync(key);
    if (result) {
      return result;
    } else {
      return null;
    }
  }
  const user = getValueFor("user").then((res) => {
    setKey(res);
  });

  console.log(key);

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
