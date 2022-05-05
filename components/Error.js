import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import Images from "../assets/no.png";

const Error = ({ reload }) => {
  return (
    <View style={styles.loadingWrapper}>
      <Image source={Images} style={{ width: 200, height: 150 }}></Image>
      <Text style={styles.offlineMain}>Whoops!!</Text>
      <Text style={styles.offline}>
        You are offline please check your connection
      </Text>
      <TouchableOpacity style={styles.tryAgainBtn} onPress={reload}>
        <Text style={styles.netErrorText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  loadingWrapper: {
    flex: 1,
    justifyContent: "center",
    bottom: 0,
    left: 0,
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "white",
    alignItems: "center",
  },

  tryAgainBtn: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    width: "50%",
    backgroundColor: "tomato",
    marginVertical: 10,
    borderRadius: 10,
  },
  netErrorText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "500",
  },
  offlineMain: {
    fontSize: 30,
    color: "black",
    fontWeight: "700",
  },
  offline: {
    fontSize: 18,
    color: "black",
    fontWeight: "500",
  },
});
export default Error;
