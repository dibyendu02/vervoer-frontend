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
import React, { useEffect } from "react";
import FocusAwareStatusBar from "../../../../components/FocusAwareStatusBar";
import { Colors } from "../../../../global";
import Header from "../../../../components/Header";
import { GETCALL, POSTCALL } from "../../../../global/server";
import CustomButton from "../../../../components/CustomButton";
import { retrieveData, storeData } from "../../../../utils/Storage";
import BackArrowIcon from "../../../../assets/back.svg";

import Spinner from "react-native-loading-spinner-overlay";
import { hideMessage, showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";
import { FlatList, TextInput } from "react-native-gesture-handler";
import Entypo from "react-native-vector-icons/Entypo";

const UserParkingDetails = (props) => {
  const [loader, setLoader] = React.useState(false);
  const [about, setAbout] = React.useState("");
  const [parkingSlots, setParkingSlots] = React.useState("");
  const { dryCleanerProfile } = useSelector((state) => state.drycleanerreducer);
  const { parkingMerchant } = useSelector((state) => state.merchantReducer);
  const [parkingDetails, setParKingDetails] = React.useState({});
  const [parkingSlotsList, setParkingSlotsList] = React.useState({});
  const slotData = props.route.params;

  const getParkingData = async () => {
    setLoader(true);
    let data = await retrieveData("userdetails");
    GETCALL(`api/view-parking?parkingId=${slotData.id}`, data.token)
      .then((res) => {
        setLoader(false);
        if (res && res.responseData) {
          setParKingDetails(res?.responseData?.data);
          // getParkingList(res?.responseData?.data._id);
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const bookSpot = async () => {
    setLoader(true);
    let data = await retrieveData("userdetails");
    let payload = {
      parkingCarSpotId: slotData.spaceId,
    };
    if (data && data.token) {
      let response = await POSTCALL(
        "api/book-parking-spot",
        payload,
        data.token
      );
      setLoader(false);
      if (response.responseData.success) {
        console.log(response.responseData);
        const bookingDetails = {
          booking_id: response.responseData.parking_booking_id,
          parkingCarSpotId: response.responseData.booking_details._id,
          parking_id: response.responseData.booking_details.parkingId,
          parking_spot_id: response.responseData.booking_details.parkingSpaceId,
          parking_spot_number: response.responseData.booking_details.spotNumber,
          Parking_spot_price: response.responseData.booking_details.spotPrice,
          user_id: response.responseData.booking_details.userId,
          parking_spot_name: response.responseData.booking_details.spotName,
          bookingType: "prk",
        };
        // console.log(bookingDetails);
        props.navigation.navigate({
          name: "PaymentScreen",
          params: { booking_details: bookingDetails },
        });
      }
    }
  };

  const BASE_URL = "http://165.22.62.238";

  useEffect(() => {
    getParkingData();
    // getParkingList();
  }, []);

  const renderItems = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          item.status !== "incomplete" &&
          props.navigation.navigate("SlotDetailPage", item._id)
        }
        style={styles.plotBlock}
      >
        <Text style={{ alignSelf: "center", color: "white" }}>
          {item.parkingSpaceName}
        </Text>
        <Text style={{ alignSelf: "center", color: "white" }}>
          ${item.parkingSpacePrice}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#4C4C4C" }}>
      <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
      {/* <Spinner visible={loader} textContent={"Loading..."} /> */}
      <View style={styles.screen}>
        <Header />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ zIndex: 10, flexDirection: "column", marginTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  zIndex: -1,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{ marginHorizontal: 10 }}
                  onPress={() => props.navigation.goBack()}
                >
                  <BackArrowIcon height={"30"} />
                </TouchableOpacity>
                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "black",
                      marginBottom: 5,
                      alignSelf: "center",
                      marginLeft: Dimensions.get("window").width / 8,
                    }}
                  >
                    Parking
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.headerHolder}>
            <Text style={{ color: "white", fontSize: 15 }}>Parking Lot</Text>
          </View>
          <View style={styles.imageHolder}>
            <Image
              style={{ height: "100%", width: "100%" }}
              source={{
                uri: `${BASE_URL}${parkingDetails.parkingImage}`,
              }}
            />
          </View>
          <View
            style={[
              styles.titleHolder,
              {
                width: "90%",
                padding: 15,
                flexDirection: "row",
                alignItems: "center",
              },
            ]}
          >
            <Entypo name="location-pin" size={40} />
            <View>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "black" }}
              >
                {parkingDetails.parkingName}
              </Text>
              <View style={{ width: 280 }}>
                <Text
                  style={{ fontSize: 15, color: "black", marginVertical: 5 }}
                >
                  {parkingDetails.parkingAddress},{parkingDetails.parkingCity},
                  {parkingDetails.parkingState}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
            <Text style={{ marginVertical: 10, fontSize: 20, color: "black" }}>
              Parking Info
            </Text>
            <View style={[styles.titleHolder, { width: "100%", padding: 20 }]}>
              <Text style={{ color: "black" }}>About:</Text>
              <Text style={{ color: "black" }}>
                {parkingDetails.parkingDescription}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 20,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "black" }}>Book </Text>
            <Text style={{ fontWeight: "bold", color: "black" }}>Slot </Text>
            <Text style={{ color: Colors.PRIMARY, fontWeight: "bold" }}>
              {slotData.name}{" "}
            </Text>
            <Text style={{ fontWeight: "bold", color: "black" }}>for </Text>
            <Text style={{ color: Colors.PRIMARY, fontWeight: "bold" }}>
              ${slotData.price + (slotData.price * 15) / 100 + " "}
            </Text>
            <Text style={{ fontWeight: "bold", color: "black", fontSize: 8 }}>
              (including 15% Tax){" "}
            </Text>
          </View>
          <CustomButton
            customStyle={{
              backgroundColor: "#F99025",
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              borderRadius: 25,
              marginHorizontal: 20,
              marginVertical: 10,
            }}
            buttonText={"Book this slot"}
            onPress={() => bookSpot()}
            textStyle={{
              color: Colors.WHITE,
              fontSize: 20,
              fontWeight: "bold",
            }}
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default UserParkingDetails;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F7F6F9",
    flex: 1,
  },
  headerHolder: {
    height: Dimensions.get("window").height / 20,
    width: Dimensions.get("window").width / 2.5,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: "#4E5256",
    marginHorizontal: 10,
  },
  imageHolder: {
    height: Dimensions.get("window").height / 4,
    // backgroundColor: 'white',
    marginVertical: 10,
    alignSelf: "center",
    width: "90%",
    borderRadius: 20,
    resizeMode: "contain",
    overflow: "hidden",
  },
  plotBlock: {
    height: Dimensions.get("window").height / 15,
    width: Dimensions.get("window").width / 8,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: Colors.PRIMARY,
    marginHorizontal: 10,
  },
  titleHolder: {
    height: Dimensions.get("window").height / 6.5,
    backgroundColor: "white",
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 20,
  },
  textArea: {
    // height: 100,
    borderRadius: 10,
    borderColor: "#F99025",
    borderWidth: 1,
    textAlignVertical: "top",
    paddingHorizontal: 10,
  },
});
