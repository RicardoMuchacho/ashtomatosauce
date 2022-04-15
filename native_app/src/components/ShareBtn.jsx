import React from "react";
import { Share, View, Button } from "react-native";
import { globalStyles } from "../styles/global";

const ShareBtn = (props) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Hey there! Checkout my progress using the AshTomatoSauce App, known as "the best manga reader ever". I am reading the manga called "${props.title}" and I am at the chapter number #${props.chapter}. It is awesome!`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={globalStyles.shareBtn}>
      <Button
        onPress={onShare}
        title="Share your progress (Socials)"
        color="crimson"
      />
    </View>
  );
};

export default ShareBtn;
