import React, { useState, useEffect } from "react";
import {
  Platform,
  Button,
  TextInput,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyles } from "../styles/global";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
//import { ImageBrowser } from "expo-image-picker-multiple";

export default function HomeScreen() {
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [msg, setMsg] = useState("Create Account");
  const [disabledUpload, setDisabledUpdate] = useState(false);
  const [selectedFile, setSelectedFile] = useState(true);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState(null);
  const [cover, setCover] = useState(null);

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

  useEffect(() => {
    if (file != null) {
      setSelectedFile(false);
    }
  }, [file]);

  const createAccount = async () => {
    navigation.navigate("Login");
  };

  const mangaUrl = "https://ashtomatosauce-api.herokuapp.com/mangas";

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    console.log(result);

    if (!result.cancelled) {
      setFile(result);
      setCover(result.uri);
      console.log(cover);
    }
  };

  const uploadManga = async () => {
    if (title == null || file == null) {
      return alert("Missing Fields");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("username", "rick");
    formData.append("description", description);
    formData.append("image", {
      uri: file.uri,
      name: title,
      type: `image/jpg`,
    });

    console.log(formData);
    // Please change file upload URL

    await fetch(mangaUrl, {
      method: "post",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data; ",
      },
    })
      .then((res) => res.json())
      .then((jsonRes) => console.log(jsonRes))
      .catch((error) => console.log(error));
  };

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    setFile(result);

    console.log(file);
    console.log(file);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View
        style={(style = { alignItems: "center", width: "100%", marginTop: 25 })}
      >
        <Text>User: {user}</Text>
        <TextInput
          style={globalStyles.input}
          onChangeText={(newText) => setTitle(newText)}
          placeholder={"Manga title"}
        ></TextInput>
        <TextInput
          secureTextEntry={true}
          style={globalStyles.input}
          onChangeText={(newText) => setDescription(newText)}
          placeholder={"Description (optional)"}
        ></TextInput>
      </View>
      <View style={(style = { marginTop: 15 })}>
        <Button color="crimson" title="Select Document" onPress={pickImage} />
      </View>
      {cover && (
        <View
          style={
            (style = {
              margin: 20,
              alignItems: "center",
              justifyContent: "center",
            })
          }
        >
          <Image source={{ uri: cover }} style={globalStyles.manga} />
          <Text style={globalStyles.mangaTitle}>{title}</Text>
        </View>
      )}
      <Button
        disabled={selectedFile}
        color="crimson"
        title="Upload Manga"
        onPress={uploadManga}
      />
      <Text
        style={(style = { marginTop: 15, color: "crimson" })}
        onPress={createAccount}
      >
        {msg}
      </Text>
    </View>
  );
}
