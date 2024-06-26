import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { useDispatch, useSelector } from "react-redux";
import FocusAwareStatusBar from "../../components/FocusAwareStatusBar";
import { Colors } from "../../global";
import { GETCALL } from "../../global/server";
import { setDryCleanerProfile } from "../../state/reducers/DrycleanerReducer";
import { retrieveData } from "../../utils/Storage";

const { width, height } = Dimensions.get("screen");
const PER_ROW_ITEM = 3;
const SPACING = 20;
const BOX_WIDTH = width / PER_ROW_ITEM - SPACING * (PER_ROW_ITEM - 1);
const MerchantMenu = ({ navigation }) => {
  const [loader, setLoader] = React.useState(false);
  const [parkingSpacingList, setParkingSpacingList] = React.useState(false);
  const disPatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      getParkingData();
    }, [])
  );

  const getParkingData = async () => {
    setLoader(true);
    let data = await retrieveData("userdetails");
    let parkingData = await GETCALL("api/get-parking-data", data.token);
    let parkingId = parkingData.responseData.data;
    if (parkingId !== null) {
      setParkingSpacingList(true);
    } else {
      setParkingSpacingList(false);
    }
    setLoader(false);
  };

  const getMerchantProfile = async () => {
    let data = await retrieveData("userdetails");
    setLoader(true);
    if (data && data.token) {
      let response = await GETCALL(
        "api/get-my-dry-cleaner-profile",
        data.token
      );
      let resData = response.responseData.data;
      console.log(JSON.stringify(resData, null, 2));
      setLoader(false);
      if (!resData.hasOwnProperty("acceptItems")) {
        disPatch(setDryCleanerProfile({ ...resData, acceptItems: [] }));
      } else {
        disPatch(setDryCleanerProfile(resData));
      }
      navigation.navigate("Availability");
    } else {
      setLoader(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.WHITE, marginTop: 20 }}
    >
      {/* <Spinner visible={loader} textContent={"Loading..."} /> */}
      <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("DryCleanerOrders");
          }}
          style={styles.box}
        >
          <Text style={styles.boxText}>Bookings For Dry Cleaner</Text>
        </TouchableOpacity>
        <View style={{ width: 5 }} />
        <TouchableOpacity onPress={getMerchantProfile} style={styles.box}>
          <Text adjustsFontSizeToFit={true} style={styles.boxText}>
            Dry Cleaner Merchant
          </Text>
        </TouchableOpacity>
        {/* <View style={{ width: 5 }} />
        <TouchableOpacity onPress={getMerchantProfile} style={styles.box}>
          <Text adjustsFontSizeToFit style={styles.boxText}>
            Parking Space
          </Text>
        </TouchableOpacity> */}
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            console.log(parkingSpacingList);
            if (parkingSpacingList) {
              navigation.navigate("ParkingDetails");
            } else {
              navigation.navigate("ParkingMerchant");
            }
          }}
          style={styles.box}
        >
          <Text adjustsFontSizeToFit style={styles.boxText}>
            Parking Merchant
          </Text>
        </TouchableOpacity>

        <View style={{ width: 5 }} />
        <TouchableOpacity
          onPress={() => navigation.navigate("BookingListMerchant")}
          style={styles.box}
        >
          <Text adjustsFontSizeToFit style={styles.boxText}>
            Bookings For Parking Spots
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MerchantMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SMOKEWHITE,
    marginHorizontal: 5,
    flexDirection: "row",
    // justifyContent: 'center',
    // flexWrap:'wrap'
  },
  box: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#F99025",
    justifyContent: "center",
    flex: 1,
    // width: BOX_WIDTH,
    height: 150,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#F99025",
    // marginBottom: 10,
  },
  boxText: {
    color: Colors.WHITE,
    fontSize: 25,
    textAlign: "center",
  },
});
