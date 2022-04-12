import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  input: {
    margin: 5,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    width: "70%",
  },

  btnView: {
    marginTop: 5,
    marginRight: 5,
  },

  mangaView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  mangaTitle: {
    alignSelf: "center",
  },
  manga: {
    height: 150,
    width: 150,
    alignSelf: "center",
  },
});
