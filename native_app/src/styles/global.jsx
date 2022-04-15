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

  elevation: {
    elevation: 3,
    shadowColor: "black",
    margin: 5,
  },

  mangaView: {
    marginBottom: 10,
    marginHorizontal: 5,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
    elevation: 5,
    shadowColor: "black",
  },
  mangaTitle: {
    alignSelf: "center",
    marginBottom: 5,
  },
  manga: {
    resizeMode: "center",
    height: 200,
    width: 140,
    alignSelf: "center",
    margin: 5,
  },
  pages: {
    resizeMode: "center",
    height: 500,
    width: 350,
    alignSelf: "center",
    marginBottom: 50,
  },
  shareBtn: {
    alignSelf: "center",
    marginTop: 15,
  },

  appTitle: {
    fontSize: 16,
    marginBottom: 20,
    alignSelf: "center",
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 5,
  },
  commentView: {
    flex: 1,
    alignContent: "flex-start",
    borderBottomWidth: 1,
    borderColor: "gray",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  commentUser: {
    margin: 3,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  comment: {
    margin: 10,
    alignSelf: "flex-start",
  },
});
