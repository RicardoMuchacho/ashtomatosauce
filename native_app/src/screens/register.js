import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, StyleSheet, View, Text, Image, TextInput } from "react-native";
import { globalStyles } from "../styles/global";

export default function RegisterScreen({ navigation }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const skip = () => {
    navigation.navigate("Home");
  };

  const register = async () => {
    if (user == "" || pass == "" || name == "") {
      return console.log("No data");
    }
    var res = await axios.post(
      "https://ashtomatosauce-api.herokuapp.com/auth/register",
      {
        name: name,
        username: user,
        password: pass,
      }
    );

    if (res) {
      console.log("user registered");
      console.log(res.data);
      return navigation.navigate("Login");
    } else {
      console.log("User not found");
    }
  };

  const route = () => {
    navigation.navigate("Register");
  };
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
          <Button color="crimson" title="Register" onPress={register} />
        </View>
        <View style={globalStyles.btnView}>
          <Button color="crimson" title="Skip" onPress={skip} />
        </View>
      </View>
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
