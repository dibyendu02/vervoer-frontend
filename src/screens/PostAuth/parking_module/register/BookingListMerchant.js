import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import FocusAwareStatusBar from "../../../../components/FocusAwareStatusBar";
import { Colors } from "../../../../global";
import BackArrowIcon from "../../../../assets/back.svg";
import { useFocusEffect } from "@react-navigation/native";
import { retrieveData } from "../../../../utils/Storage";
import { GETCALL, POSTCALL } from "../../../../global/server";

const BookingMerchantList = ({ navigation }) => {
  const [loader, setLoader] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  const [otps, setOtps] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchOrders();
    }, [])
  );

  const fetchOrders = async () => {
    // setLoader(true);
    let data = await retrieveData("userdetails");
    if (data && data.token) {
      let response = await GETCALL(
        "api/list-booked-parkings?filterType=merchant",
        data.token
      );
      let otps = await GETCALL("api/get_all_otps", data.token);
      setOtps(otps.responseData.otps);
      // console.log(
      //   "Booking deetails" + JSON.stringify(response.responseData.data[0])
      // );
      // setLoader(false);
      if (response.responseData.success) {
        setOrders(response.responseData.data);
      }
    }
  };

  const releaseSpot = async (item) => {
    setLoader(true);
    let data = await retrieveData("userdetails");
    let payload = {
      bookingId: item._id,
      parkingCarSpotId: item.bookingDetails.parkingCarSpotId,
    };
    if (data && data.token) {
      let response = await POSTCALL("api/release-spot", payload, data.token);
      setLoader(false);
      if (response.responseData.success) {
        fetchOrders();
      }
    }
  };

  const renderItems = ({ item, cartIndex }) => {
    console.log(item);
    return (
      <View
        style={{
          margin: 15,
          borderRadius: 5,
          overflow: "hidden",
          backgroundColor: Colors.WHITE,
          padding: 10,
          ...styles.shadow,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{ color: Colors.BLACK, fontSize: 16, fontWeight: "bold" }}
          >
            Parking Name
          </Text>
          <Text
            style={{
              color: Colors.BLACK,
              fontSize: 16,
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {item.parkingAddress.parkingName}
          </Text>
        </View>
        <View style={{ height: 10 }} />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{ color: Colors.BLACK, fontSize: 16, fontWeight: "bold" }}
          >
            Customer Ph
          </Text>
          <Text
            style={{
              color: Colors.BLACK,
              fontSize: 16,
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            -
            {/* {item.parkingAddress.parkingName} */}
          </Text>
        </View>
        <View style={{ height: 10 }} />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{ color: Colors.BLACK, fontSize: 16, fontWeight: "bold" }}
          >
            Parking Address
          </Text>
          <Text
            style={{
              color: Colors.BLACK,
              fontSize: 16,
              fontWeight: "bold",
              textTransform: "capitalize",
              width: Dimensions.get("window").width / 2,
              right: -30,
            }}
          >
            {item.parkingAddress.parkingAddress}
          </Text>
        </View>
        <View style={{ height: 10 }} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{ color: Colors.BLACK, fontSize: 16, fontWeight: "bold" }}
          >
            Parking Slot
          </Text>
          <Text
            style={{
              color: Colors.BLACK,
              fontSize: 16,
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {item.bookingDetails.carSpotPlaceName}
          </Text>
        </View>
        <View style={{ height: 10 }} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{ color: Colors.BLACK, fontSize: 16, fontWeight: "bold" }}
          >
            Parking Price
          </Text>
          <Text
            style={{
              color: Colors.BLACK,
              fontSize: 16,
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            ${item.bookingDetails.price}
          </Text>
        </View>
        <View style={{ height: 10 }} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{ color: Colors.BLACK, fontSize: 16, fontWeight: "bold" }}
          >
            User
          </Text>
          <Text
            style={{
              color: Colors.BLACK,
              fontSize: 16,
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {item.carOwnerDetails.firstName !== ""
              ? item.carOwnerDetails.firstName
              : `User-${item._id}`}
          </Text>
        </View>
        <View style={{ height: 10 }} />
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{ color: Colors.GREEN, fontSize: 18, fontWeight: "bold" }}
          >
            verfied
          </Text>
          <Text
            style={{
              color: Colors.GREEN,
              fontSize: 18,
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {item._id}
          </Text>
        </View> */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            onPress={() =>
              navigation.navigate({
                name: "QRCodeScanner",
                params: {
                  otp:
                    otps.length > 0
                      ? otps.find((otp) => otp.order_id === item._id)?.otp
                      : "4231",
                  booking_id: `${item._id}`,
                },
              })
            }
            style={{
              color: "red",
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "right",
            }}
          >
            SCAN
          </Text>
        </View>

        <View style={{ height: 10 }} />
        {item.bookingStatus == "booked" && (
          <>
            <View style={{ height: 1, backgroundColor: Colors.BORDER }} />
            <View style={{ height: 10 }} />
            <Text
              onPress={() => {
                releaseSpot(item);
              }}
              style={{
                color: "red",
                fontWeight: "bold",
                fontSize: 20,
                textAlign: "right",
              }}
            >
              Release
            </Text>
          </>
        )}
      </View>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <View
        style={{
          alignSelf: "center",
          justifyContent: "center",
          marginVertical: 20,
        }}
      >
        <Text>No Items Found</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#4C4C4C" }}>
      <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
      {/* <Spinner visible={loader} /> */}
      <View style={styles.screen}>
        <View
          style={{
            backgroundColor: Colors.WHITE,
            flexDirection: "row",
            paddingHorizontal: 16,
            position: "absolute",
            zIndex: 9999,
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{}}
              onPress={() => navigation.goBack()}
            >
              <BackArrowIcon height={"30"} />
            </TouchableOpacity>
            <Text
              style={{
                color: Colors.BLACK,
                fontSize: 22,
                marginVertical: 10,
                marginLeft: 15,
              }}
            >
              Order Summary
            </Text>
          </View>
        </View>

        <View style={{ minHeight: 200 }}>
          <FlatList
            data={orders}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItems}
            contentContainerStyle={{
              paddingBottom: 100,
              paddingTop: 50,
            }}
            ListEmptyComponent={ListEmptyComponent}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default BookingMerchantList;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F7F6F9",
    flex: 1,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
});
