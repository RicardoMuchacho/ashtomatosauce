import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";

async function getValueFor(key) {
  const result = await SecureStore.getItemAsync(key);
  return result;
}

export default function HomeScreen() {
  const [key, setKey] = useState("");

  async function getValueFor(key) {
    const result = await SecureStore.getItemAsync(key);
    if (result) {
      setKey(result);
      return result;
    } else {
      setKey("Read-Only");
      console.log("no user under that key");
    }
  }

  return (
    <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Manga Screen</Text>

      <Text>{key}</Text>
    </TouchableOpacity>
  );
}
