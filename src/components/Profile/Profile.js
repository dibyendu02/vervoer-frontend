import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../global";

const Profile = ({ item, index, Logout, DeleteUser }) => {
  const navigation = useNavigation();
  const navigte = () => {
    if (typeof item.screen != "undefined") {
      navigation.navigate(item.screen);
    } else {
      if (item.name === "Delete Profile") DeleteUser();
      else Logout();
    }
  };
  return (
    <TouchableOpacity onPress={navigte} style={{ flex: 1 }}>
      <View>
        <View style={styles.align}>
          <View style={{ marginRight: 15 }}>{item.svg}</View>
          <Text
            style={[
              styles.font1,
              { color: index == 7 ? Colors.PRIMARY : Colors.TEXT },
            ]}
          >
            {item.name}
          </Text>
        </View>
      </View>
      <View style={[styles.underLine, { height: index == 7 ? 0 : 1 }]} />
    </TouchableOpacity>
  );
};

export default Profile;

const styles = StyleSheet.create({
  align: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 13,
  },
  font1: {
    fontWeight: "500",
    fontSize: 14,
    color: Colors.BLACK,
  },
  underLine: {
    height: 0.5,
    width: "95%",
    alignSelf: "flex-end",
    backgroundColor: Colors.GRAY_MEDIUM,
  },
});
