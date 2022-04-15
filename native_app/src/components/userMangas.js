import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Image,
  Button,
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../styles/global";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import UpdateModal from "./updateModal";

const Manga = ({ title, cover, id, onSelected }) => {
  return (
    <View style={globalStyles.mangaView}>
      <TouchableOpacity onPress={onSelected}>
        <Image
          mangaId={id}
          style={globalStyles.manga}
          source={{
            uri: cover,
          }}
        ></Image>
      </TouchableOpacity>
      <Text style={globalStyles.mangaTitle}>{title}</Text>
    </View>
  );
};

export default function UserMangas(props) {
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(false);
  const [mangaId, setMangaId] = useState(null);
  const [edit, setEdit] = useState(true);
  const [modalDisabled, setModalDisabled] = useState(false);

  const getMangas = async () => {
    try {
      const res = await axios.get(
        `https://ashtomatosauce-api.herokuapp.com/mangas?author=${props.user}`
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(async () => {
    let isMounted = true;
    getMangas().then((data) => {
      if (isMounted) setData(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    console.log(mangaId);
    console.log(props.chapterImages);
    console.log(props.chapterNumber);
  }, [mangaId]);

  useEffect(() => {
    if (selected == true) {
      setEdit(false);
    }
  }, [selected]);

  const deleteManga = async () => {
    console.log(mangaId);
    axios
      .delete("https://ashtomatosauce-api.herokuapp.com/mangas/", {
        data: { id: mangaId },
      })
      .then(async (response) => {
        console.log(response.data);

        alert("Manga Deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const confirmDeletion = () => {
    Alert.alert(
      "Delete Selected Manga",
      "This action cannot be undone",
      [
        {
          text: "YES",
          onPress: () => {
            deleteManga();
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

  const uploadChapter = async () => {
    //setSelected(true);
  };
  console.log(data);

  const renderItem = ({ item }) => (
    <Manga
      title={item.title}
      cover={item.cover}
      id={item._id}
      onSelected={() => {
        setMangaId(item._id);
        setSelected(true);
      }}
    />
  );

  return (
    <SafeAreaView
      style={{
        width: "100%",
        flex: 0.5,
        alignItems: "center",
        justifyContent: "flex-end",
        margin: 20,
      }}
    >
      <Text style={globalStyles.appTitle}>
        Select Manga To Add Chapters or Edit
      </Text>
      {data && (
        <FlatList
          horizontal={true}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        ></FlatList>
      )}
      <View style={(style = { flexDirection: "row" })}>
        <View style={globalStyles.btnView}>
          <Button
            disabled={props.disabled}
            color="crimson"
            title="Upload"
            onPress={uploadChapter}
          />
        </View>
        <UpdateModal mangaId={mangaId} edit={edit}></UpdateModal>

        <View style={globalStyles.btnView}>
          <Button
            disabled={edit}
            color="crimson"
            title="Delete"
            onPress={confirmDeletion}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
