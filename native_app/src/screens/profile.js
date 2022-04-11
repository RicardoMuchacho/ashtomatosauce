import React, { useState, useEffect } from "react";
import { Image, Button, TextInput, StyleSheet, View, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import { globalStyles } from "../styles/global";
import axios from "axios";

async function getValueFor(key) {
  const result = await SecureStore.getItemAsync(key);
  return result;
}

export default function HomeScreen() {
  const [user, setUser] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const update = async () => {
    try {
      if (user == "" || pass == "" || name == "") {
        return alert("Missing fields");
      }
      var res = await axios.post(
        "https://ashtomatosauce-api.herokuapp.com/auth/register",
        {
          name: name,
          username: user.toLowerCase(),
          password: pass,
        }
      );

      if (res) {
        console.log("user registered");
        console.log(res.data);
        console.log(res.status);
        return navigation.navigate("Login");
      }
    } catch (error) {
      console.log(error);
      alert("User already exists");
    }
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
        <TextInput
          style={globalStyles.input}
          onChangeText={(newText) => setName(newText)}
          placeholder={"Name"}
        ></TextInput>
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
          <Button color="crimson" title="Update" onPress={update} />
        </View>
      </View>
    </View>
  );
}
