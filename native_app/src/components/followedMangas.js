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
  const navigation = useNavigation();

  return (
    <View style={globalStyles.mangaView}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("MangaChapters", {
            paramKey: id,
            pic: cover,
            heading: title,
          })
        }
      >
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

export default function UserTest(props) {
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(false);
  const [mangaId, setMangaId] = useState(null);
  const [edit, setEdit] = useState(true);
  const [modalDisabled, setModalDisabled] = useState(false);

  const getMangas = async () => {
    try {
      const res = await axios.get(
        `https://ashtomatosauce-api.herokuapp.com/users/${props.user}/mangas`
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

  const renderItem = ({ item }) => (
    <Manga
      title={item.title}
      cover={item.cover}
      id={item.manga_id}
      onSelected={() => {
        console.log(id);
      }}
    />
  );

  return (
    <SafeAreaView
      style={{
        width: "100%",
        alignItems: "center",
      }}
    >
      <Text
        style={
          (style = {
            alignSelf: "center",
            fontSize: 16,
            fontWeight: "bold",
            marginTop: 20,
            marginBottom: 30,
          })
        }
      >
        Followed Mangas
      </Text>
      {data ? (
        <FlatList
          horizontal={true}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        ></FlatList>
      ) : (
        <Text style={(style = { alignSelf: "center" })}>No mangas added </Text>
      )}
    </SafeAreaView>
  );
}
