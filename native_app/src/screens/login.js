import React, { useState, useEffect } from "react";
import { Button, StyleSheet, View, Text, Image, TextInput } from "react-native";
import { globalStyles } from "../styles/global";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useSelector, useDispatch } from "react-redux";
import { changeUser, increment, incrementByAmount } from "../redux/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser, setUser } from "../redux/user";

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [key, setKey] = useState("");
  const [value, onChangeValue] = useState("");
  const [userState, setUserState] = useState("");

  const storeData = async (data) => {
    try {
      const res = JSON.stringify(data);
      await AsyncStorage.setItem("user", res);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        console.log("no user");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const skip = async () => {
    navigation.navigate("HomeTabs");
    await AsyncStorage.setItem("user", "Guest User");
  };

  const login = async () => {
    if (user == "" || pass == "") {
      return alert("Missing fields");
    }
    axios
      .post("https://ashtomatosauce-api.herokuapp.com/auth/login", {
        username: user.toLowerCase(),
        password: pass,
      })
      .then(async (response) => {
        console.log(response.data);
        //await save("user", user);
        await AsyncStorage.setItem("user", user);
        await AsyncStorage.setItem("token", response.data.token);
        //const value = await AsyncStorage.getItem("token");
        //console.log(value);
        return navigation.navigate("HomeTabs");
      })
      .catch((error) => {
        console.log(error);
        return alert("User not found");
      });
  };

  const register = async () => {
    //console.log(gg);
    navigation.navigate("Register");
  };
  //dispatch(setUser("derick"));

  return (
    <View
      style={
        (style = {
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
        })
      }
    >
      <Image
        source={require("../../assets/mangaLogo.png")}
        style={(style = { width: 200, height: 200, marginTop: 70 })}
      ></Image>
      <View
        style={(style = { alignItems: "center", width: "100%", marginTop: 30 })}
      >
        <TextInput
          style={globalStyles.input}
          onChangeText={(newText) => setUser(newText)}
          placeholder={"Username"}
        ></TextInput>
        <TextInput
          secureTextEntry={true}
          style={globalStyles.input}
          onChangeText={(newText) => setPass(newText)}
          placeholder={"Password"}
        ></TextInput>
        <View
          style={
            (style = {
              flexDirection: "row",
              justifyContent: "flex-start",
              width: "100%",
              width: "70%",
            })
          }
        >
          <View style={globalStyles.btnView}>
            <Button color="crimson" title="Login" onPress={login} />
          </View>
          <View style={globalStyles.btnView}>
            <Button color="crimson" title="Skip" onPress={skip} />
          </View>
        </View>
      </View>
      <Text
        style={(style = { color: "blue", marginTop: 15 })}
        onPress={register}
      >
        {" "}
        Don't have an account?
      </Text>
      <Image
        source={require("../../assets/pagoda.png")}
        style={
          (style = {
            width: "100%",
            height: 300,
          })
        }
      ></Image>
    </View>
  );
}
