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
import { globalStyles } from "../styles/global";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./login";
import ProfileModal from "../components/profileModal";
import FollowedMangas from "../components/followedMangas";

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [disabledUpdate, setDisabledUpdate] = useState(false);
  const [msg, setMsg] = useState("Create Account");

  useEffect(() => {
    const checkUser = async () => {
      try {
        const stored = await AsyncStorage.getItem("user");
        const storeToken = await AsyncStorage.getItem("token");
        console.log(stored);
        setUser(stored);
        setToken(storeToken);
      } catch (error) {
        console.log(error);
      }
    };
    checkUser();
  }, []);

  // AUTH OR READ-ONLY USE EFFECT HOOK
  useEffect(() => {
    if (user == "Guest User" || token == "" || user == null || token == null) {
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
        style={(style = { width: 150, height: 150, marginTop: 30 })}
      ></Image>
      <View
        style={(style = { alignItems: "center", width: "100%", marginTop: 25 })}
      >
        <Text
          style={
            (style = {
              alignSelf: "center",
              fontSize: 14,
              fontWeight: "bold",
            })
          }
        >
          {user.toUpperCase()}
        </Text>
      </View>
      {token ? (
        <FollowedMangas user={user}></FollowedMangas>
      ) : (
        <Text>No Mangas Followed</Text>
      )}
      <View
        style={
          (style = {
            marginTop: 30,
            justifyContent: "center",
            width: "40%",
          })
        }
      >
        <ProfileModal disabled={disabledUpdate} user={user}></ProfileModal>
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
