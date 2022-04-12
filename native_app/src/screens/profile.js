import React, { useState, useEffect } from "react";
import {
  Alert,
  Image,
  Button,
  TextInput,
  StyleSheet,
  View,
  Text,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { globalStyles } from "../styles/global";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./login";

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState("");
  const [newUser, setNewUser] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [disabledUpdate, setDisabledUpdate] = useState(false);
  const [msg, setMsg] = useState("Create Account");

  useEffect(async () => {
    const checkUser = async () => {
      try {
        const stored = await AsyncStorage.getItem("user");
        const storeToken = await AsyncStorage.getItem("token");
        console.log("working useEffect");
        console.log(stored);
        setUser(stored);
        setToken(storeToken);
        //await AsyncStorage.setItem("accessToken", data.accessToken);
        //handleLogin(data.accessToken, data.following);
      } catch (error) {
        console.log(error);
      }
    };
    await checkUser();
  }, []);

  // AUTH OR READ-ONLY USE EFFECT HOOK
  useEffect(() => {
    if (user == "" || token == "" || user == null || token == null) {
      setDisabledUpdate(true);
      setMsg("Create Account");
    } else {
      setDisabledUpdate(false);
      setMsg("");
    }
  }, [user, token]);

  const createAccount = async () => {
    navigation.navigate("Login");
  };

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const update = async () => {
    const value = await AsyncStorage.getItem("token");
    console.log(value);

    if (user == "" || newPass == "" || oldPass == "" || name == "") {
      return alert("Missing fields");
    }
    axios
      .put(`https://ashtomatosauce-api.herokuapp.com/users/${user}`, {
        name: name,
        username: newUser.toLowerCase(),
        password: newPass,
      })
      .then(async (response) => {
        console.log(response.data);

        await AsyncStorage.setItem("user", newUser);
        setUser(newUser);
        await alert("User updated");
        navigation.navigate("Login");
        //await AsyncStorage.setItem("token", response.data.token);
        //const value = await AsyncStorage.getItem("token");
        //console.log(value);
        //return navigation.navigate("HomeTabs");
      })
      .catch((error) => {
        console.log(error);
        return alert("User not found");
      });
  };

  const deleteUser = async () => {
    axios
      .delete(`https://ashtomatosauce-api.herokuapp.com/users/${user}`)

      .then(async (response) => {
        console.log(response.data);

        await AsyncStorage.removeItem("user", null);
        await AsyncStorage.removeItem("token", null);

        navigation.navigate("Login");
        //await AsyncStorage.setItem("token", response.data.token);
        //const value = await AsyncStorage.getItem("token");
        //console.log(value);
        //return navigation.navigate("HomeTabs");
      })
      .catch((error) => {
        console.log(error);
        return alert("User not found");
      });
  };

  const confirmDeletion = () => {
    Alert.alert(
      "Delte user",
      "This action cannot be undone",
      [
        {
          text: "YES",
          onPress: () => {
            deleteUser();
          },
          style: "destructive",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <View
      style={
        (style = {
          flex: 1,
          alignItems: "center",
        })
      }
    >
      <Image
        source={require("../../assets/mangaLogo.png")}
        style={(style = { width: 200, height: 200, marginTop: 100 })}
      ></Image>
      <View
        style={(style = { alignItems: "center", width: "100%", marginTop: 25 })}
      >
        <Text>User: {user}</Text>
        <TextInput
          style={globalStyles.input}
          onChangeText={(newText) => setName(newText)}
          placeholder={"New Name"}
        ></TextInput>
        <TextInput
          style={globalStyles.input}
          onChangeText={(newText) => setNewUser(newText)}
          placeholder={"New Username"}
        ></TextInput>
        <TextInput
          secureTextEntry={true}
          style={globalStyles.input}
          onChangeText={(newText) => setOldPass(newText)}
          placeholder={"Old Password"}
        ></TextInput>
        <TextInput
          secureTextEntry={true}
          style={globalStyles.input}
          onChangeText={(newText) => setNewPass(newText)}
          placeholder={"New Password"}
        ></TextInput>
      </View>
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
          <Button
            disabled={disabledUpdate}
            color="crimson"
            title="Update"
            onPress={update}
          />
        </View>
        <View style={globalStyles.btnView}>
          <Button
            disabled={disabledUpdate}
            color="crimson"
            title="Delete"
            onPress={confirmDeletion}
          />
        </View>
      </View>
      <Text
        style={(style = { marginTop: 15, color: "crimson" })}
        onPress={createAccount}
      >
        {msg}
      </Text>
    </View>
  );
}
