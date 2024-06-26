/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View, Alert, ScrollView, Image, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { profileData } from "../../components/Dummy/Dummy";
import Profile from "../../components/Profile/Profile";
import FocusAwareStatusBar from "../../components/FocusAwareStatusBar";
import { Colors } from "../../global";
import { changeAuthStatus } from "../../state/reducers/AuthReducer";
import { useDispatch } from "react-redux";
import { POSTCALL } from "../../global/server";
import { retrieveData } from "../../utils/Storage";

const ProfileScreen = ({ name, dispatch, email, profileimg, userId }) => {
  const navigation = useNavigation();
  const disPatch = useDispatch();
  const Logout = async () => {
    Alert.alert("Alert", "Are you sure, you want to logout ?", [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Yes", onPress: () => onLogout() },
    ]);
  };

  const onLogout = async () => {
    await AsyncStorage.clear();
    disPatch(changeAuthStatus(false));
    // navigation.dispatch(resetStackAndGoToHome);
    // dispatch(UserAction.clearSession());
  };

  const DeleteUser = async () => {
    Alert.alert("Alert", "Are you sure, you want to delete ?", [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Yes", onPress: () => onDeleteUser() },
    ]);
  };
  const onDeleteUser = async () => {
    const user_tok = await retrieveData("userdetails");
    const userPhoneNumber = user_tok.user.phoneNumber;
    const params = {
      phoneNumber: userPhoneNumber,
    };
    let response = await POSTCALL("auth/delete", params);
    await onLogout();
  };

  const renderProfile = (item, index) => (
    <Profile
      item={item}
      index={index}
      Logout={Logout}
      DeleteUser={DeleteUser}
    />
  );

  //UseEffect

  //UI
  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        isLightBar={false}
        isTopSpace={true}
        isTransparent={true}
      />
      <ScrollView>
        {/* <View style={{flex: 1}}>
          <View>{profileData.map(renderProfile)}</View>
        </View> */}
        <View style={{ flex: 1 }}>
          <View style={styles.profileContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={
                  profileimg
                    ? { uri: profileimg }
                    : require("../../assets/Logo.png")
                }
                style={{ height: 73, width: 73, borderRadius: 100 }}
              />
              <View style={styles.userDetail}>
                <Text style={styles.font1}>{name}</Text>
                <Text style={styles.font2}>{email}</Text>
              </View>
            </View>
          </View>
          <View>{profileData.map(renderProfile)}</View>
        </View>
      </ScrollView>
      {/* <MapModal /> */}
      {/* <GuestModal /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  userDetail: {
    marginLeft: 20,
  },
  container: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  edit: {
    marginBottom: 40,
  },
  font1: {
    fontSize: 15,
    color: Colors.BLACK,
  },
  font2: {
    fontSize: 12,
    color: Colors.GRAY_DARK,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 20,
  },
});

export default ProfileScreen;
