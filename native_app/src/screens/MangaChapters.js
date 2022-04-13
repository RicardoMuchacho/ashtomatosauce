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


const MangaChapters = ({route, number}) => {
  
  
  const navigation = useNavigation()
  const id = route.params.paramKey;
  console.log(id);   
  
  
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
    
    
    
    
    
    _renderItem = ({ item }) => {
      return (
        <View>
        <TouchableOpacity>
        <Text>{item.number}</Text>
        </TouchableOpacity>
        </View>
        )
      }
      
      
      return (      
        
        <View>
        <Text></Text>
        <Text>                       id: {id}</Text>
        <FlatList
        data={data}
        renderItem={this._renderItem}
        keyExtractor={(item) => item._id}        
        />      
        <Text></Text>
        </View>
        
        
        
        
        
        
        
        )
        
        
      }
      
      
      
      export default MangaChapters;
      
      
      
      
      
      
      
      