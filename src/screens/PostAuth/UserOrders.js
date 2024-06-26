import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import FocusAwareStatusBar from "../../components/FocusAwareStatusBar";
import { Colors } from "../../global";
import BackArrowIcon from "../../assets/back.svg";
import Spinner from "react-native-loading-spinner-overlay";
import { useFocusEffect } from "@react-navigation/native";
import { retrieveData } from "../../utils/Storage";
import { GETCALL, POSTCALL } from "../../global/server";

const UserOrders = ({ navigation }) => {
  const [loader, setLoader] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  const [otpMap, setOtpMap] = React.useState();

  useFocusEffect(
    React.useCallback(() => {
      fetchOrders();
      console.log(orders);
    }, [])
  );

  const fetchOrders = async () => {
    setLoader(true);
    let data = await retrieveData("userdetails");

    if (data && data.token) {
      try {
        const response = await GETCALL("api/users/orders", data.token);
        console.log("response ", response);
        setLoader(false);
        console.log(response.responseData.data);
        // if (response.responseData.success) {
        //   setOtpMap(response.responseData.data.otpMap);
        //   const booking_ids = response.responseData.data.otpMap.map(
        //     (item) => item.bookingId
        //   );
        //   const filteredOrders = response.responseData.data.model.filter(
        //     (item) => booking_ids.includes(item._id)
        //   );
        //   setOrders(filteredOrders);
        // }
        setOrders(response.responseData.data);
      } catch (err) {
        console.log("err ", err);
      }
    }
  };

  const cancelOrder = async (item) => {
    setLoader(true);
    let data = await retrieveData("userdetails");
    let payload = {
      orderId: item._id,
    };
    if (data && data.token) {
      let response = await POSTCALL("api/order/cancel", payload, data.token);
      setLoader(false);
      if (response.responseData.success) {
        fetchOrders();
      }
    }
  };

  const renderItems = ({ item, cartIndex }) => {
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
            Dry Cleaner Name
          </Text>
          <Text
            style={{
              color: Colors.BLACK,
              fontSize: 16,
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {item.bookingToDryCleanerName}
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
            Mobile No.
          </Text>
          <Text
            style={{
              color: Colors.BLACK,
              fontSize: 16,
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {item.bookingByUserMobile}
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
            Total Price
          </Text>
          <Text
            style={{
              color: Colors.BLACK,
              fontSize: 16,
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {item.totalPrice}
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
            Payment Type
          </Text>
          <Text
            style={{
              color: Colors.BLACK,
              fontSize: 16,
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {item.paymentBy}
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
            Booking Status
          </Text>
          <Text
            style={{
              color: Colors.BLACK,
              fontSize: 16,
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {item.bookingStatus}
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
            Payment Status
          </Text>
          <Text
            style={{
              color: Colors.BLACK,
              fontSize: 16,
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            Paid
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
            Pickup Address
          </Text>
          <Text
            style={{
              color: Colors.BLACK,
              fontSize: 16,
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {item.bookingByUserAddress}
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
            style={{ color: Colors.GREEN, fontSize: 20, fontWeight: "bold" }}
          >
            OTP
          </Text>
          <Text
            style={{
              color: Colors.GREEN,
              fontSize: 20,
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {/* {otpMap.find((otpMapObj) => otpMapObj.bookingId === item._id)
              ? otpMap.find((otpMapObj) => otpMapObj.bookingId === item._id).otp
              : "2134"} */}
          </Text>
        </View>

        <View style={{ height: 10 }} />
        <View style={{ height: 1, backgroundColor: Colors.BORDER }} />
        <View style={{ height: 10 }} />
        <Text style={{ color: Colors.BLACK, fontSize: 16, fontWeight: "bold" }}>
          Booking Items
        </Text>
        <View style={{ height: 10 }} />
        {item.bookingItems.map((single, index) => {
          return (
            <View key={index} style={{ marginBottom: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: Colors.BLACK,
                    fontSize: 16,
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  {index + 1}. {single.itemName}
                </Text>
                <View style={{ width: 20 }} />
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "#F99025",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: Colors.WHITE,
                      fontSize: 16,
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                  >
                    {single.itemQuantity}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    color: Colors.BLUE,
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  {"" + Object.keys(single.itemAttributes)}
                </Text>
              </View>
            </View>
          );
        })}
        {item.bookingStatus == "pending" && (
          <Text
            onPress={() => {
              cancelOrder(item);
            }}
            style={{
              color: "red",
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "right",
            }}
          >
            Cancel
          </Text>
        )}
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
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>No Orders Found</Text>
                </View>
              );
            }}
            renderItem={renderItems}
            contentContainerStyle={{
              paddingBottom: 100,
              paddingTop: 50,
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default UserOrders;

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
