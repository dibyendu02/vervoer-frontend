import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import React from "react";
import FocusAwareStatusBar from "../../../../components/FocusAwareStatusBar";
import { Colors } from "../../../../global";
import Header from "../../../../components/Header";
import { POSTCALL } from "../../../../global/server";
import CustomButton from "../../../../components/CustomButton";
import { retrieveData } from "../../../../utils/Storage";
import Spinner from "react-native-loading-spinner-overlay";
import { hideMessage, showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "react-native-gesture-handler";

const ParkingMerchantAbout = ({ navigation }) => {
  const [loader, setLoader] = React.useState(false);
  const [about, setAbout] = React.useState("");
  const [parkingSlots, setParkingSlots] = React.useState("");
  const { dryCleanerProfile } = useSelector((state) => state.drycleanerreducer);
  const { parkingMerchant } = useSelector((state) => state.merchantReducer);

  const registerMerchantProfile = async () => {
    setLoader(true);
    let userData = await retrieveData("userdetails");
    let formData = new FormData();
    formData.append("parkingName", parkingMerchant.name);
    formData.append("parkingAddress", parkingMerchant.address);
    formData.append("parkingState", parkingMerchant.state);
    formData.append("parkingCity", parkingMerchant.city);
    formData.append("zipCode", parkingMerchant.zip);
    formData.append("parkingDescription", about);
    formData.append("profileImage", parkingMerchant.image);
    formData.append("parkingSpaceNumber", parkingSlots);

    // console.log("Image", parkingMerchant.image)
    // console.log("FORM DATA", formData);
    console.log(userData);
    const sandipKaka = await POSTCALL(
      "api/register-parking",
      formData,
      userData.token,
      "media"
    );
    console.log("Merchant Data: " + sandipKaka.status);
    setLoader(false);
    if (sandipKaka.status === 200) {
      showMessage({
        message: `Merchant Profile Created Successfully!`,
        type: "success",
        style: {
          alignItems: "center",
        },
        autoHide: false,
      });
      // navigation.navigate("AvailableParkingSlot");

      setTimeout(() => {
        hideMessage();
        navigation.navigate("AvailableParkingSlot");
      }, 500);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#4C4C4C" }}>
      <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
      {/* <Spinner visible={loader} textContent={"Loading..."} /> */}
      <View style={styles.screen}>
        <Header />
        <View style={{ marginTop: 20 }} />
        <View style={{ marginHorizontal: 32 }}>
          <Text style={{ color: "#000", fontSize: 22 }}>About</Text>
          <View style={{ height: 20 }} />
          <TextInput
            style={[styles.textArea, { height: 100 }]}
            value={about}
            onChangeText={(data) => {
              setAbout(data);
            }}
          />
          <View style={{ height: 20 }} />
          <Text style={{ color: "#000", fontSize: 22 }}>
            Number of Parking Spaces
          </Text>
          <View style={{ height: 20 }} />
          <TextInput
            style={[styles.textArea, { height: 50 }]}
            value={parkingSlots}
            keyboardType="numeric"
            onChangeText={(data) => {
              setParkingSlots(data);
            }}
          />
          <View style={{ height: 20 }} />

          <CustomButton
            customStyle={{
              backgroundColor: "#F99025",
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              borderRadius: 25,
              marginHorizontal: 20,
            }}
            buttonText={"Finish"}
            onPress={() => {
              registerMerchantProfile();
              // navigation.navigate('AvailableParkingSlot');
            }}
            textStyle={{
              color: Colors.WHITE,
              fontSize: 20,
              fontWeight: "bold",
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ParkingMerchantAbout;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F7F6F9",
    flex: 1,
  },
  textArea: {
    // height: 100,
    borderRadius: 10,
    borderColor: "#F99025",
    borderWidth: 1,
    textAlignVertical: "top",
    paddingHorizontal: 10,
    color: "black",
  },
});
