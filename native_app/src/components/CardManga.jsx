import React from "react";
import { StyleSheet, TextPropTypes, View } from "react-native";

export default function CardManga(props) {
  return (
    <View style={styles.cardManga}>
      <View style={styles.cardMangaContent}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardManga: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    elevation: 50,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    width: "100%",
    paddingTop: 10,
  },
  cardMangaContent: {},
});
