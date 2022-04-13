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
import * as SecureStore from "expo-secure-store";
import CardManga from "./CardManga";
import { TabRouter, useNavigation } from '@react-navigation/native';

// <Image style={globalStyles.manga} src={props.src}></Image>



const getMangasChapters = async () => {
  var data = null;
  try {
    const res = await axios.get(
      "https://ashtomatosauce-api.herokuapp.com/mangas/chapters/"+ id
    );
    //console.log(res.data);
    return res.data;
    
  } catch (error) {
    console.error(error);
  }
  //console.log(data);
};


const Manga = ({ title, cover, id }) => {

  const navigation = useNavigation()

  return (
    

    <View style={globalStyles.mangaView}>
      <TouchableOpacity 
      onPress={() => navigation.navigate('MangaEpisodes', { title, cover, id })}>
        <Image
          style={globalStyles.manga}
          source={{
            uri: cover,
          }}
        ></Image>
      </TouchableOpacity>
      <Text style={globalStyles.mangaTitle}>{title}</Text>
      <Text></Text>
    </View>
    
    
  );
};

export default function ChaptersList() {
  const [key, setKey] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true; // note mutable flag
    getMangasChapters().then((data) => {
      if (isMounted) setData(data); // add conditional check
    });
    return () => {
      isMounted = false;
    }; // cleanup toggles value, if unmounted
  }, []); // adjust dependencies to your needs

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
