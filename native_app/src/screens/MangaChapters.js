import {
  SafeAreaView,
  Image,
  Button,
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity
} from "react-native";
import React, { useState, useEffect } from 'react'
import axios from "axios";

import { globalStyles } from "../styles/global";

import { useNavigation } from '@react-navigation/native';


const MangaChapters = ({route}) => {
  
  
  const navigation = useNavigation()
  const id = route.params.paramKey;
  const cover = route.params.pic;
  const title = route.params.heading;
  
  //1
  const getMangasData = async () => {
    var data = null;
    try {
      const res = await axios.get(
        "http://ashtomatosauce-api.herokuapp.com/mangas?id="+ id 
        );
        
        return res.data;
        
      } catch (error) {
        console.error(error);
      }
      //console.log(data);
    };
    
    const [key, setKey] = useState("");
    const [data, setData] = useState(null);
    
    useEffect(() => {
      let isMounted = true; // note mutable flag
      getMangasData().then((data) => {
        if (isMounted) setData(data); // add conditional check
      });
      return () => {
        isMounted = false;
      }; // cleanup toggles value, if unmounted
    }, []); // adjust dependencies to your needs
    
    //console.log(data);
    


    
    //2
    const getMangasChapters = async () => {
      var data = null;
      try {
        const res = await axios.get(
          "http://ashtomatosauce-api.herokuapp.com/mangas/chapters/"+ id 
          );
          
          return res.data;
          
        } catch (error) {
          console.error(error);
        }
        //console.log(data);
      };
      
      const [chapters, setChapters] = useState(null);
      
      useEffect(() => {
        let isMounted = true; // note mutable flag
        getMangasChapters().then((chapters) => {
          if (isMounted) setChapters(chapters); // add conditional check
        });
        return () => {
          isMounted = false;
        }; // cleanup toggles value, if unmounted
      }, []); // adjust dependencies to your needs
      
      
      
      _renderItem = ({ item }) => {
        return (
          <View ><Text></Text>
          
          
          <TouchableOpacity>
          <Text style={styles.chapterNumber}>{item.number}</Text>
          </TouchableOpacity>
       
          
          </View>
          )
        }
        
        
        return (      
          
          <View>
          <Text></Text>
          <Text>                                            Title: {title}</Text>
          <Text/>
          <Image source={{ uri: cover, height: 350 }} />
          <Text/>
          <Text>                                               Chapters</Text>
          
          <FlatList
          data={chapters}
          renderItem={_renderItem}
          keyExtractor={(item) => item._id}        
          />      
          <Text></Text>
          </View>
          
          )
          
          
        }
        
        
        const styles = StyleSheet.create({
  
          chapterNumber: {
            color: 'black',
            fontWeight: 'bold',
            marginStart: 10,
            fontSize: 40,
            textAlign: 'center'
          },
      
          
        })
        
        export default MangaChapters;
        
        
        
        
        
        
        
        