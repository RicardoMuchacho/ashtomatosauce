import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import MangaList from "../components/mangaList";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <MangaList />
    </View>
  );
}
