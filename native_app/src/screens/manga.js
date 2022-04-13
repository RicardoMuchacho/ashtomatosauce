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

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [msg, setMsg] = useState("Create Account");
  const [disabledUpload, setDisabledUpdate] = useState(true);
  const [selectedFile, setSelectedFile] = useState(true);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState(null);
  const [cover, setCover] = useState(null);

  useEffect(async () => {
    const checkUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        const storeToken = await AsyncStorage.getItem("token");
        console.log(storedUser);
        setUser(storedUser);
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
    if (user == "" || token == "" || file == null || token == null) {
      setMsg("Create Account");
      setDisabledUpdate(true);
    } else {
      setMsg(null);
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
      setFile(result.uri);
      setCover(result.uri);

      console.log(cover);
    }
  };

  const uploadManga = async () => {
    if (title == null || file == null) {
      return alert("Missing Fields");
    }

    let localUri = file;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    const formData = new FormData();
    formData.append("image", {
      uri: localUri,
      name: filename,
      type: type,
    });
    formData.append("title", title);
    formData.append("username", user);
    formData.append("description", description);

    console.log(formData);
    // Please change file upload URL

    await fetch(mangaUrl, {
      method: "post",
      body: formData,
      headers: {
        //Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        console.log(jsonRes);
        alert("Manga Uploaded");
        setCover(null);
        setTitle(null);
        setDescription(null);
      })
      .catch((error) => {
        console.log(error);
      });
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
          value={title}
          style={globalStyles.input}
          onChangeText={(newText) => setTitle(newText)}
          placeholder={"Manga title"}
        ></TextInput>
        <TextInput
          value={description}
          style={globalStyles.input}
          onChangeText={(newText) => setDescription(newText)}
          placeholder={"Description (optional)"}
        ></TextInput>
      </View>
      <View style={(style = { marginVertical: 15, marginBottom: 15 })}>
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
        disabled={disabledUpload}
        color="crimson"
        title="Upload Manga"
        onPress={uploadManga}
      />
      {msg && (
        <Text
          style={(style = { marginTop: 15, color: "crimson" })}
          onPress={createAccount}
        >
          {msg}
        </Text>
      )}
    </View>
  );
}
