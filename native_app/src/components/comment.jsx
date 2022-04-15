import React from "react";
import { Share, View, Text } from "react-native";
import { globalStyles } from "../styles/global";

export default function Comment(props) {
  return (
    <View style={globalStyles.commentView}>
      <Text style={globalStyles.commentUser}>{props.username}</Text>
      <Text style={globalStyles.comment}>{props.description}</Text>
    </View>
  );
}
