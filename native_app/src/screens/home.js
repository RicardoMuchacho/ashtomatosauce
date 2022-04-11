import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import MangaList from "../components/manga";

async function getValueFor(key) {
  if (key) {
    const result = await SecureStore.getItemAsync(key);
    return result;
  } else {
    return "Read-Only";
  }
}

export default function HomeScreen() {
  const [key, setKey] = useState("");

  const user = getValueFor("user").then((res) => {
    setKey(res);
  });

  const getMangas = async () => {
    axios
      .get("https://ashtomatosauce-api.herokuapp.com/mangas")
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    /*
      if (res) {
        console.log("user logged");
        return navigation.navigate("Home");
      } else {
        console.log("User not found");
      }*/
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <MangaList />
    </View>
  );
}
