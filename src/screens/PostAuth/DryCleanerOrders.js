import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
  Image,
  Alert,
} from "react-native";
import Octicons from "react-native-vector-icons/Octicons";
import FocusAwareStatusBar from "../../components/FocusAwareStatusBar";
import { Colors } from "../../global";
import BackArrowIcon from "../../assets/back.svg";
import { useFocusEffect } from "@react-navigation/native";
import { retrieveData } from "../../utils/Storage";
import { GETCALL, POSTCALL } from "../../global/server";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { DeliveryModal, DeliveryBoyShowModal } from "./DeliveryModel";

const UserItem = ({ user, order_id }) => {
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        borderRadius: 5,
      }}
    >
      <View style={styles.userItem}>
        <Image
          source={{
            uri: "https://st5.depositphotos.com/1915171/64699/v/450/depositphotos_646996546-stock-illustration-user-profile-icon-avatar-person.jpg",
          }}
          style={styles.avatar}
        />
        <Text style={styles.phoneNumber}>{order_id}</Text>
      </View>
    </TouchableOpacity>
  );
};

const DryCleanerOrders = ({ navigation }) => {
  const [loader, setLoader] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  const [otpMap, setOtpMap] = React.useState();
  const [zipCodeMap, setZipCodeMap] = React.useState();
  const [selectedZipCode, setSelectedZipCode] = React.useState();
  const [filteredOrders, setFilteredOrders] = React.useState([]);
  const pickerRef = useRef();
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [allUsers, setAllUsers] = React.useState([]);
  const [currentSelectedOrder, setCurrentSelectedOrder] = React.useState([]);
  const [allDeliveryDetails, setAllDeliveryDetails] = React.useState([]);
  const [paymentStatus, setPaymentStatus] = React.useState([]);
  const [selectedDeliveryBoyModal, setSelectedDeliveryBoyModal] =
    React.useState(null);

  const showModal = (item) => {
    setSelectedItem(item);
  };

  const openModal = () => {
    return selectedItem != null;
  };

  const hideModal = () => {
    setSelectedItem(null);
  };

  const showDeliveryBoyModal = (item) => {
    setSelectedDeliveryBoyModal(item);
  };

  const openDeliveryBoyModal = () => {
    return selectedDeliveryBoyModal != null;
  };

  const hideDeliveryBoyModal = () => {
    setSelectedDeliveryBoyModal(null);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchOrders();
      fetchAllUsers();
      fetchAllDeliveryBoyDetails();
    }, [])
  );

  const fetchAllUsers = async () => {
    const allUser = await retrieveData("userdetails");
    if (allUser && allUser.token) {
      const users = await GETCALL("api/get-all-profile");
      const userArray = users.responseData.data;
      setAllUsers(userArray);
    }
  };

  const fetchOrders = async () => {
    setLoader(true);
    let data = await retrieveData("userdetails");
    if (data && data.token) {
      let response = await GETCALL("api/dry-cleaner/orders", data.token);
      setLoader(false);
      if (response.responseData.success) {
        console.log(JSON.stringify(response, null, 2));
        setPaymentStatus(response.responseData.data.paymentStatus);
        setOtpMap(response.responseData.data.otpMap);
        setZipCodeMap(response.responseData.data.zipCodeMap);
        setOrders(response.responseData.data.model);
        setFilteredOrders(response.responseData.data.model);
        setData(orders.map((order) => order._id));
      }
    }
  };

  const fetchAllDeliveryBoyDetails = async () => {
    let data = await retrieveData("userdetails");
    if (data && data.token) {
      let response = await POSTCALL("api/delivery/fetch-delivery-all");
      if (response.responseData.success) {
        setAllDeliveryDetails(response?.responseData?.data?.model);
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

  const acceptOrder = async (item) => {
    setLoader(true);
    let data = await retrieveData("userdetails");
    let payload = {
      orderId: item._id,
    };
    if (data && data.token) {
      let response = await POSTCALL("api/order/confirm", payload, data.token);
      setLoader(false);
      if (response.responseData.success) {
        fetchOrders();
      }
    }
  };

  const renderItems = ({ item, cartIndex }) => {
    return (
      paymentStatus?.find((payment) => {
        return payment.bookingId === item._id;
      })?.paymentStatus && (
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
              Order From
            </Text>
            <Text
              style={{
                color: Colors.BLACK,
                fontSize: 16,
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              {item.bookingByUserName}
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
              Customer Mobile No.
            </Text>
            <Text
              style={{
                color: Colors.BLACK,
                fontSize: 12,
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
              Vendor Mobile No.
            </Text>
            <Text
              style={{
                color: Colors.BLACK,
                fontSize: 12,
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              {item.bookingByVendorMobile}
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
              {paymentStatus?.find((payment) => {
                return payment.bookingId === item._id;
              })?.paymentStatus || "Pending"}
            </Text>
          </View>

          <View style={{ height: 10 }} />
          <View
            style={{
              flexDirection: "row",
              // alignItems: "center",
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
                fontWeight: "bold",
                textAlign: "right",
                width: "60%",
              }}
            >
              {item?.bookingByUserAddress || (
                <Octicons name="dash" size={24} color="black" />
              )}
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
              {otpMap.find((otpMapObj) => otpMapObj.bookingId === item._id)
                ? otpMap.find((otpMapObj) => otpMapObj.bookingId === item._id)
                    .otp
                : "2134"}
            </Text>
          </View>

          <View style={{ height: 10 }} />
          <View style={{ height: 1, backgroundColor: Colors.BORDER }} />
          <View style={{ height: 10 }} />
          <Text
            style={{ color: Colors.BLACK, fontSize: 16, fontWeight: "bold" }}
          >
            Booked Items
          </Text>
          <View style={{ height: 10 }} />
          {item.bookingItems.map((single, index) => {
            return (
              <View key={index} style={{ marginBottom: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
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
          <View style={{ height: 10 }} />
          <View style={{ height: 1, backgroundColor: Colors.BORDER }} />
          <View style={{ height: 10 }} />

          <View style={{ height: 10 }} />

          <TouchableOpacity
            onPress={() => {
              showDeliveryBoyModal(item._id);
              setCurrentSelectedOrder(item._id);
            }}
            style={styles.ButtonContainer}
          >
            <Text style={styles.ButtonText}>Delivery Boy List</Text>
          </TouchableOpacity>

          <View style={{ height: 10 }} />
          <View style={{ height: 10 }} />

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Booking Status",
                  "Booking Confirmed",
                  [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                  { cancelable: false }
                );
                acceptOrder(item);
              }}
              style={styles.ButtonContainer}
              disabled={item.bookingStatus === "confirmed"}
            >
              <Text style={styles.ButtonText}>Approve</Text>
            </TouchableOpacity>
            <View style={{ width: 30 }} />
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Booking Status",
                  "Booking Cancelled",
                  [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                  { cancelable: false }
                );
                cancelOrder(item);
              }}
              disabled={item.bookingStatus === "cancelled"}
              style={[styles.ButtonContainer, { backgroundColor: "red" }]}
            >
              <Text style={styles.ButtonText}>Cancel</Text>
            </TouchableOpacity>
            <View style={{ width: 30 }} />
            <TouchableOpacity
              onPress={() => {
                showModal(item._id);
                setCurrentSelectedOrder(item._id);
              }}
              style={styles.ButtonContainer}
            >
              <Text style={styles.ButtonText}>Delivery Boy</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
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

        <View
          style={{
            marginTop: 80,
            marginLeft: 30,
            marginRight: 30,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: Colors.BLACK,
            }}
          >
            Zip Code
          </Text>
          <TouchableOpacity
            onPress={() => {
              pickerRef.current.focus();
            }}
            style={{
              borderColor: Colors.GRAY_MEDIUM,
              borderWidth: 1,
              width: "100%",
              color: "#000000",
              fontSize: 15,
              // width: width - 40,
              borderRadius: 8,
              marginTop: 5,
            }}
          >
            <Picker
              selectedValue={selectedZipCode}
              mode={"dropdown"}
              ref={pickerRef}
              onValueChange={(itemValue, itemIndex) => {
                const zipCodeDetails = zipCodeMap?.find(
                  (z) => z.zipCode === selectedZipCode
                );
                const selectedOrder = zipCodeDetails
                  ? orders?.filter((order) => {
                      return order._id === zipCodeDetails?.bookingId && order;
                    })
                  : orders;
                setFilteredOrders(selectedOrder);
                console.log(selectedOrder);
                setSelectedZipCode(itemValue);
              }}
              style={{ color: "#000" }}
            >
              {zipCodeMap?.map((zipCode, index) => {
                return (
                  <Picker.Item
                    style={{
                      color: Colors.BLACK,
                    }}
                    key={index}
                    label={zipCode.zipCode}
                    value={zipCode.zipCode}
                  />
                );
              })}
            </Picker>
          </TouchableOpacity>
        </View>

        <ScrollView style={{ minHeight: 200 }}>
          <FlatList
            data={
              filteredOrders.length == 0
                ? orders?.filter((order) => {
                    return (
                      order._id !==
                        zipCodeMap?.find((z) => z.zipCode === selectedZipCode)
                          ?.bookingId && order
                    );
                  })
                : filteredOrders
            }
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItems}
            contentContainerStyle={{
              paddingBottom: 100,
              paddingTop: 50,
            }}
          />
        </ScrollView>
      </View>
      {/* delivery Modal  */}
      {selectedItem === null ? (
        <></>
      ) : (
        <DeliveryModal
          order_id={currentSelectedOrder}
          closeModal={hideModal}
          openModal={openModal}
          allUsers={allUsers}
        />
      )}
      {/* delivery Modal  */}
      {selectedDeliveryBoyModal === null ? (
        <></>
      ) : (
        <DeliveryBoyShowModal
          order_id={currentSelectedOrder}
          closeModal={hideDeliveryBoyModal}
          openModal={openDeliveryBoyModal}
          allUsers={allUsers}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default DryCleanerOrders;

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
  ButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 0,
  },
  ButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
