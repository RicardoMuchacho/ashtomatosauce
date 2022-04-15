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
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";
import ShareBtn from "../components/ShareBtn";
import { globalStyles } from "../styles/global";
import Comment from "../components/comment";

const ChapterPages = ({ route }) => {
  const navigation = useNavigation();

  const mangaId = route.params.mangaId;
  const chapterNumber = route.params.chapter;
  const title = route.params.title;
  const [pages, setPages] = useState(null);
  const [comments, setComments] = useState(null);

  const getMangasChapters = async () => {
    try {
      const res = await axios.get(
        "http://ashtomatosauce-api.herokuapp.com/mangas/chapter/" + mangaId
      );
      //console.log(res.data.chapter.pages);
      //console.log(res.data.comments);
      console.log(res.data);
      setPages(res.data.chapter.pages);
      setComments(res.data.comments);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    getMangasChapters().then((response) => {
      if (isMounted) {
        //setPages(response);
        console.log(pages);
        console.log(comments);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View
      style={
        (style = {
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
        })
      }
    >
      <Text
        style={
          (style = {
            alignSelf: "center",
            marginTop: 10,
            fontSize: 16,
            fontWeight: "bold",
          })
        }
      >
        CHAPTER {chapterNumber}
      </Text>
      <View
        style={
          (style = {
            flex: 1,
          })
        }
      >
        <ScrollView
          style={
            (style = {
              width: "100%",
              padding: 10,
              marginVertical: 10,
            })
          }
        >
          {pages &&
            pages.map((item) => (
              <Image style={globalStyles.pages} source={{ uri: item }}></Image>
            ))}
          <ShareBtn title={title} chapter={chapterNumber} />

          <Text
            style={
              (style = {
                fontSize: 16,
                marginVertical: 20,
                alignSelf: "center",
              })
            }
          >
            Comments
          </Text>
          <View style={globalStyles.commentContainer}>
            {comments &&
              comments.map((item) => (
                <Comment
                  username={item.username}
                  description={item.description}
                ></Comment>
              ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ChapterPages;
