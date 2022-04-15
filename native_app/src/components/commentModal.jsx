import React, { useState } from "react";
import { TextInput, View, Modal, Text, Button } from "react-native";
import ModalContainer from "react-native-modal";
import { globalStyles } from "../styles/global";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export default function CommentModal(props) {
  const [isModalVisible, setModalVisible] = useState(false);

  const [description, setDescription] = useState("");

  const token = props.token;
  const postComment = async () => {
    console.log(props.mangaId);
    console.log(props.user);
    console.log(description);
    console.log(token);
    if (description == "") {
      return alert("Missing fields");
    }
    console.log(props.user);
    axios
      .post(
        `https://ashtomatosauce-api.herokuapp.com/mangas/comment/${props.chapterId}`,
        {
          username: props.user,
          description: description,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response.data);
        alert("Comment Posted");
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
    <View
      style={
        (style = {
          alignItems: "center",
          justifyContent: "center",
        })
      }
    >
      <View
        style={
          (style = {
            marginBottom: 30,
          })
        }
      >
        <Button
          disabled={props.edit}
          color="crimson"
          title="Add Comment"
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
            Comment
          </Text>
          <TextInput
            value={description}
            style={globalStyles.input}
            onChangeText={(newText) => setDescription(newText)}
            placeholder={"Description"}
          ></TextInput>
          <View style={(style = { flexDirection: "row" })}>
            <View style={globalStyles.btnView}>
              <Button color="crimson" title="Post" onPress={postComment} />
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
