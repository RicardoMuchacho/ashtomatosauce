import { View, Text } from 'react-native'
import React from 'react'
import ChaptersList from '../components/ChaptersList'

const MangaChapters = ({route}) => {


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

    
    return (
      
      <View>      
      <Text>Manga Chapters here - id: {id}</Text>
      </View>
      )
    }
    
    export default MangaChapters
    