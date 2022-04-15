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
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../styles/global";
import axios from "axios";
import CardManga from "./CardManga";
import { useNavigation } from "@react-navigation/native";

const getMangas = async () => {
  try {
    const res = await axios.get(
      "https://ashtomatosauce-api.herokuapp.com/mangas"
    );
    //console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
  //console.log(data);
};

const Manga = ({ title, cover, id }) => {
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

export default function MangaList() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getMangas().then((data) => {
      if (isMounted) setData(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  console.log(data);

  const renderItem = ({ item }) => (
    <Manga title={item.title} cover={item.cover} id={item._id} />
  );

  return (
    <SafeAreaView
      style={{
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CardManga>
        <FlatList
          horizontal={false}
          numColumns={2}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        ></FlatList>
      </CardManga>
    </SafeAreaView>
  );
}
