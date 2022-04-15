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
import UserMangas from "../components/userMangas";

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState("");
  const [token, setToken] = useState(null);
  const [msg, setMsg] = useState("Create Account");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState(null);
  const [cover, setCover] = useState(null);
  const [coverShown, setCoverShown] = useState(
    "https://www.google.com/search?q=empty+image&sxsrf=APq-WBsSOqL0_txBfUiKonN1O_ZFmBpJtA:1649921902675&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjA5amHhpP3AhVeSjABHVDpDG4Q_AUoAXoECAEQAw&biw=1331&bih=576&dpr=1#imgrc=_nSF3mLJdxRvdM"
  );

  const [chapterN, setChapterN] = useState(null);
  const [chapterImages, setChapterImages] = useState(null);

  const [disabledUpload, setDisabledUpdate] = useState(true);
  const [selectedFile, setSelectedFile] = useState(true);
  const [disabledChapter, setDisabledChapter] = useState(true);

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
    if (user == "" || token == null || user == "Guest User") {
      setMsg("Create Account");
      console.log(token);
      setDisabledUpdate(true);
    } else {
      setMsg(null);
    }
  }, [user, token]);

  // DISABLE/ENABLE BUTTONS
  useEffect(() => {
    if (file != null) {
      setSelectedFile(false);
    }
    if (file && title && token) {
      setDisabledUpdate(false);
    }
  }, [file, title]);

  useEffect(() => {
    if (file != null) {
      setSelectedFile(false);
    }
  }, [chapterN, chapterImages]);

  useEffect(() => {
    if (cover) {
      setCoverShown(cover);
    }
  }, [cover]);

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

  return (
    <View
      style={{
        padding: 15,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={
          (style = {
            flex: 0.7,
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
          })
        }
      >
        <View
          style={
            (style = {
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
            })
          }
        >
          <View
            style={
              (style = {
                marginRight: 15,
                alignItems: "center",
                justifyContent: "center",
                width: "60%",
              })
            }
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

          {cover ? (
            <View
              style={
                (style = {
                  flex: 0.5,

                  margin: 10,
                  alignItems: "center",
                  justifyContent: "flex-end",
                })
              }
            >
              <Image
                source={{ uri: coverShown }}
                style={
                  (style = {
                    resizeMode: "center",
                    height: 150,
                    width: 100,
                    alignSelf: "center",
                    margin: 5,
                  })
                }
              />
              <Text style={globalStyles.mangaTitle}>{title}</Text>
            </View>
          ) : (
            <View
              style={
                (style = {
                  flex: 0.5,

                  margin: 10,
                  alignItems: "center",
                  justifyContent: "flex-end",
                })
              }
            >
              <Image
                source={require("../../assets/emptyImage.png")}
                style={
                  (style = {
                    resizeMode: "center",
                    height: 150,
                    width: 100,
                    alignSelf: "center",
                    margin: 5,
                  })
                }
              />
            </View>
          )}
        </View>
        <View>
          <View style={(style = { marginBottom: 10 })}>
            <Button color="crimson" title="Select Cover" onPress={pickImage} />
          </View>
          <View>
            <Button
              disabled={disabledUpload}
              color="crimson"
              title="Upload Manga"
              onPress={uploadManga}
            />
          </View>
          {msg && (
            <Text
              style={(style = { marginTop: 15, color: "crimson" })}
              onPress={createAccount}
            >
              {msg}
            </Text>
          )}
        </View>
      </View>
      <View
        style={{
          borderBottomColor: "crimson",
          borderBottomWidth: 2,
          alignSelf: "stretch",
        }}
      />
      <View
        style={
          (style = {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            marginTop: 15,
          })
        }
      >
        <TextInput
          value={title}
          style={globalStyles.input}
          keyboardType="numeric"
          onChangeText={(number) => setChapterN(number)}
          placeholder={"Chapter Number"}
        ></TextInput>
        <View style={(style = { margin: 5 })}>
          <Button
            color="crimson"
            title="Select Chapters"
            onPress={() => console.log(chapterN)}
          />
        </View>
      </View>
      {token && (
        <UserMangas
          chapterImages={chapterImages}
          chapterNumber={chapterN}
          disabled={disabledChapter}
          user={user}
        ></UserMangas>
      )}
    </View>
  );
}
