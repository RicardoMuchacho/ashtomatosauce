import React, { useState } from "react";
import { TextInput, View, Modal, Text, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ModalContainer from "react-native-modal";
import { globalStyles } from "../styles/global";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileModal(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [newUser, setNewUser] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [updateDisabled, setUpdateDisabled] = useState(true);

  const updateUser = async () => {
    if (newUser == "" || newPass == "" || oldPass == "") {
      return alert("Missing fields");
    }
    console.log(props.user);
    axios
      .put(`https://ashtomatosauce-api.herokuapp.com/users/${props.user}`, {
        username: newUser.toLowerCase(),
        password: newPass,
      })
      .then(async (response) => {
        console.log(response.data);
        await AsyncStorage.setItem("user", newUser);
        await alert("User updated");
        toggleModal();
        //navigation.navigate("Login");
        //await AsyncStorage.setItem("token", response.data.token);
        //const value = await AsyncStorage.getItem("token");
        //console.log(value);
        //return navigation.navigate("HomeTabs");
      })
      .catch((error) => {
        console.log(error);
        return alert("User not found");
      });
  };

  const deleteUser = async () => {
    axios
      .delete(`https://ashtomatosauce-api.herokuapp.com/users/${user}`)

      .then(async (response) => {
        console.log(response.data);

        await AsyncStorage.removeItem("user", null);
        await AsyncStorage.removeItem("token", null);

        //navigation.navigate("Login");
        //await AsyncStorage.setItem("token", response.data.token);
        //const value = await AsyncStorage.getItem("token");
        //console.log(value);
        //return navigation.navigate("HomeTabs");
      })
      .catch((error) => {
        console.log(error);
        return alert("User not found");
      });
  };

  const confirmDeletion = () => {
    Alert.alert(
      "Delete user",
      "This action cannot be undone",
      [
        {
          text: "YES",
          onPress: () => {
            deleteUser();
          },
          style: "destructive",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View>
      <View style={globalStyles.btnView}>
        <Button
          disabled={props.disabled}
          color="crimson"
          title="Edit Profile"
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
            Edit Profile
          </Text>
          .
          <TextInput
            style={globalStyles.input}
            onChangeText={(newText) => setNewUser(newText)}
            placeholder={"New Username"}
          ></TextInput>
          <TextInput
            secureTextEntry={true}
            style={globalStyles.input}
            onChangeText={(newText) => setOldPass(newText)}
            placeholder={"Old Password"}
          ></TextInput>
          <TextInput
            secureTextEntry={true}
            style={globalStyles.input}
            onChangeText={(newText) => setNewPass(newText)}
            placeholder={"New Password"}
          ></TextInput>
          <View style={(style = { flexDirection: "row" })}>
            <View style={globalStyles.btnView}>
              <Button color="crimson" title="Update" onPress={updateUser} />
            </View>
            <View style={globalStyles.btnView}>
              <Button
                color="crimson"
                title="Delete"
                onPress={confirmDeletion}
              />
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
