import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import MangaList from "../components/mangaList";

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

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <MangaList />
    </View>
  );
}
