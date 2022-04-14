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
import React, { useState, useEffect } from "react";
import axios from "axios";

import { globalStyles } from "../styles/global";

import { useNavigation } from "@react-navigation/native";

const MangaChapters = ({ route }) => {
  const navigation = useNavigation();
  const id = route.params.paramKey;
  const cover = route.params.pic;
  const title = route.params.heading;
  const [chapters, setChapters] = useState(null);

  const getMangasChapters = async () => {
    try {
      const res = await axios.get(
        "http://ashtomatosauce-api.herokuapp.com/mangas/chapters/" + id
      );
      //console.log(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    getMangasChapters().then((response) => {
      if (isMounted) {
        if (response == "No Chapters found") {
          setChapters(null);
        } else {
          setChapters(response);
        }
        console.log(chapters);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  _renderItem = ({ item }) => {
    return (
      <View>
        <TouchableOpacity
          style={
            (style = {
              padding: 5,
              margin: 5,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "gray",
              width: "70%",
              alignSelf: "center",
            })
          }
          onPress={() => navigation.navigate("ChapterPages", { paramKey: id })}
        >
          <Text style={styles.chapterNumber}>{item.number}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <Text
        style={
          (style = {
            alignSelf: "center",
            fontSize: 16,
            fontWeight: "bold",
            margin: 15,
          })
        }
      >
        {title.toUpperCase()}
      </Text>
      <Image source={{ uri: cover, height: 350 }} />
      <Text
        style={
          (style = {
            alignSelf: "center",
            fontSize: 16,
            fontWeight: "bold",
            margin: 15,
          })
        }
      >
        Chapters
      </Text>
      <View>
        {chapters ? (
          <FlatList
            data={chapters}
            renderItem={_renderItem}
            keyExtractor={(item) => item._id}
          />
        ) : (
          <Text style={(style = { alignSelf: "center", marginTop: 20 })}>
            No Chapters Added Yet. Sorry!
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chapterNumber: {
    color: "black",
    fontWeight: "bold",
    marginStart: 10,
    fontSize: 32,
    textAlign: "center",
  },
});

export default MangaChapters;
