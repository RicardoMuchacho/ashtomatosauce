import React, { useState } from "react";
import { TextInput, View, Modal, Text, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ModalContainer from "react-native-modal";
import { globalStyles } from "../styles/global";
import * as ImagePicker from "expo-image-picker";

export default function ModalTester(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [cover, setCover] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    console.log(result);

    if (!result.cancelled) {
      setCover(result.uri);

      console.log(cover);
    }
  };

  const updateManga = async () => {
    if (title == null || cover == null) {
      return alert("Missing Fields");
    }

    let localUri = cover;
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
    formData.append("manga_id", props.mangaId);
    formData.append("description", description);

    console.log(formData);
    // Please change file upload URL

    await fetch("https://ashtomatosauce-api.herokuapp.com/mangas", {
      method: "put",
      body: formData,
      headers: {
        //Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        console.log(jsonRes);
        alert("Manga Updated");
        setCover(null);
        setTitle(null);
        setDescription(null);
        toggleModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View>
      <View style={globalStyles.btnView}>
        <Button
          disabled={props.edit}
          color="crimson"
          title="Update"
          onPress={toggleModal}
        />
      </View>

      <ModalContainer backdropColor="black" isVisible={isModalVisible}>
        <View
          style={
            (style = {
              padding: 20,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
            })
          }
        >
          <Text style={(style = { fontSize: 16, marginBottom: 10 })}>
            Update Manga
          </Text>
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
          <View style={(style = { flexDirection: "row" })}>
            <View style={globalStyles.btnView}>
              <Button color="crimson" title="New Cover" onPress={pickImage} />
            </View>
            <View style={globalStyles.btnView}>
              <Button color="crimson" title="Update" onPress={updateManga} />
            </View>
            <View style={globalStyles.btnView}>
              <Button color="crimson" title="Close" onPress={toggleModal} />
            </View>
          </View>
        </View>
      </ModalContainer>
    </View>
  );
}
