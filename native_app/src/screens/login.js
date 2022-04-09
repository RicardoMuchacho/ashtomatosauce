import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, StyleSheet, View, Text, Image, TextInput } from "react-native";
import { globalStyles } from "../styles/global";

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [status, setStatus] = useState("");

  const skip = () => {
    navigation.navigate("Home");
  };

  const login = async () => {
    var res = await axios.post("/", {
      username: "",
      password: "",
    });

    if (res) {
      console.log("user logged");
      return navigation.navigate("Home");
    } else {
      console.log("User not found");
    }
  };

  const register = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={(style = { flex: 1, alignItems: "center" })}>
      <Image
        source={require("../../assets/mangaLogo.png")}
        style={(style = { width: 200, height: 200, marginTop: 100 })}
      ></Image>
      <View
        style={(style = { alignItems: "center", width: "100%", marginTop: 25 })}
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
          <Button color="crimson" title="Login" onPress={register} />
        </View>
        <View style={globalStyles.btnView}>
          <Button color="crimson" title="Skip" onPress={skip} />
        </View>
      </View>
      <Text
        style={(style = { color: "blue", marginTop: 15 })}
        onPress={register}
      >
        {" "}
        Don't have an account?
      </Text>
    </View>
  );
}
