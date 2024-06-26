import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Linking,
  Image,
  Alert,
  TextInput,
} from "react-native";
import FocusAwareStatusBar from "../../components/FocusAwareStatusBar";
import { Colors } from "../../global";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../state/reducers/CartReducer";
import CustomButton from "../../components/CustomButton";
import CheckBox from "../../components/CheckBox";
import BackArrowIcon from "../../assets/back.svg";
import { showMessage } from "react-native-flash-message";
import { POSTCALL } from "../../global/server";
import { retrieveData } from "../../utils/Storage";
import Spinner from "react-native-loading-spinner-overlay";
import { setSelectedDryCleaner } from "../../state/reducers/DrycleanerReducer";
import { ScrollView } from "react-native-gesture-handler";

const Cart = ({ navigation }) => {
  const [displayStatus, setDisplayStatus] = React.useState("none");
  const [paymentIntent, setPaymentIntent] = React.useState("");
  const [response, setResponse] = React.useState();
  const [zipCode, setZipCode] = React.useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");

  const { cartList } = useSelector((state) => state.cartReducer);
  const { selectedDryCleaner } = useSelector(
    (state) => state.drycleanerreducer
  );
  const dispatch = useDispatch();
  const [loader, setLoader] = React.useState(false);

  // console.log(JSON.stringify(selectedDryCleaner,null,4));

  const increment = (item) => {
    let temp = JSON.parse(JSON.stringify(cartList));
    let index = temp.findIndex(
      (single, index) => single.itemName == item.itemName
    );
    if (index != -1) {
      temp[index].count += 1;
      dispatch(setCart(temp));
    }
  };

  const decrement = (item) => {
    let temp = JSON.parse(JSON.stringify(cartList));
    let index = temp.findIndex(
      (single, index) => single.itemName == item.itemName
    );
    if (index != -1 && temp[index].count > 1) {
      temp[index].count -= 1;
      dispatch(setCart(temp));
    }
  };

  const deleteCartItem = (item) => {
    let temp = JSON.parse(JSON.stringify(cartList));
    temp = temp.filter((single, index) => single.itemName != item.itemName);
    dispatch(setCart(temp));
  };

  const openPrompt = (item) => {
    Alert.alert("Remove From Cart?", "", [
      {
        text: "Remove",
        onPress: () => {
          deleteCartItem(item);
        },
        style: "default",
      },
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
    ]);
  };

  const toggleAttribute = (itemName, attributeIndex) => {
    let temp = JSON.parse(JSON.stringify(cartList));
    let index = temp.findIndex((single, index) => single.itemName == itemName);
    let selectedLength = temp[index].attributes.filter(
      (single, index) => single.status == true
    ).length;
    if (
      selectedLength == 1 &&
      temp[index].attributes[attributeIndex].status == true
    ) {
      showMessage({
        message: "One attribute should be selected!",
        type: "danger",
        style: {
          alignItems: "center",
        },
        autoHide: true,
        duration: 1500,
      });
    } else {
      temp[index].attributes[attributeIndex].status =
        !temp[index].attributes[attributeIndex].status;
      dispatch(setCart(temp));
    }
  };

  React.useEffect(() => {
    calculateTotalPrice();
  }, [cartList]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    let temp = JSON.parse(JSON.stringify(cartList));
    temp.forEach((cartItem, index) => {
      let singlePrice = 0;
      cartItem.attributes.forEach((attribute, index) => {
        if (attribute.status) {
          singlePrice += parseFloat(attribute.price);
        }
      });
      totalPrice += singlePrice * cartItem.count;
    });
    return (totalPrice * 15) / 100 + totalPrice;
  };

  const calculateIndividualPrice = (item) => {
    let singlePrice = 0;
    item.attributes.forEach((attribute, index) => {
      if (attribute.status) {
        singlePrice += parseFloat(attribute.price);
      }
    });
    return singlePrice;
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
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "60%" }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  color: Colors.BLACK,
                  fontSize: 18,
                  textTransform: "capitalize",
                }}
              >
                {item.itemName}
              </Text>
              <Text
                style={{
                  color: "#F99025",
                  fontSize: 18,
                  textTransform: "capitalize",
                }}
              >
                ${calculateIndividualPrice(JSON.parse(JSON.stringify(item)))}
              </Text>
            </View>
            <View style={{ height: 20 }} />
            <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
              {item.attributes.map((attribute, attributeIndex) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginRight: 10,
                      marginBottom: 10,
                    }}
                    key={attributeIndex}
                  >
                    <CheckBox
                      label={attribute.name}
                      selected={attribute.status}
                      onPress={() => {
                        toggleAttribute(item.itemName, attributeIndex);
                      }}
                    />
                    <View style={{ width: 20 }} />
                    <Text
                      style={{ fontWeight: "400", fontSize: 16, color: "#000" }}
                    >
                      Price : {attribute.price}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={{ width: "40%", alignItems: "flex-end" }}>
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  height: 100,
                  width: 50,
                  backgroundColor: Colors.WHITE,
                  ...styles.shadow,
                  borderRadius: 10,
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 5,
                }}
              >
                <TouchableOpacity onPress={() => increment(item)}>
                  <Image
                    source={require("../../assets/plus.png")}
                    style={{ width: 15, height: 15, resizeMode: "contain" }}
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    color: Colors.BLACK,
                    fontSize: 18,
                    textTransform: "capitalize",
                  }}
                >
                  {item.count}
                </Text>
                <TouchableOpacity onPress={() => decrement(item)}>
                  <Image
                    source={require("../../assets/minus.png")}
                    style={{ width: 15, height: 15, resizeMode: "contain" }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ height: 20 }} />
              <TouchableOpacity
                onPress={() => openPrompt(item)}
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 15,
                  backgroundColor: "#F99025",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/trash.png")}
                  style={{
                    tintColor: Colors.WHITE,
                    width: 15,
                    height: 15,
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const handlePayemnt = async () => {
    // sending other details for a success order and booking placement .
    console.log(response);
    // {"dry_cleaning_booking_by_id": "63b926c5092e9b6fbc3845ea", "dry_cleaning_booking_id": "63b9ab477ebea46abb29bbae", "dry_cleaning_booking_total_price": "6", "msg": "Order placed successfully", "success": true}
    const bookingDetails = {
      booking_id: response.dry_cleaning_booking_id,
      Parking_spot_price: response.dry_cleaning_booking_total_price,
      user_id: response.dry_cleaning_booking_by_id,
      parking_spot_name: "dry cleaning",
      bookingType: "dryc",
      address,
      name,
    };

    const user_tok = await retrieveData("userdetails");
    const successfullBooking = await POSTCALL(
      "api/complete-order",
      {
        zipCode: zipCode,
        paymentIntent: paymentIntent,
        booking_details: bookingDetails,
      },
      user_tok.token
    );
    console.log(successfullBooking.responseData);
    navigation.navigate("UserOrders");
  };

  const bookOrder = async () => {
    let data = await retrieveData("userdetails");
    let order = {};
    let bookingItems = [];
    order.dryCleanerId = selectedDryCleaner.userId;
    let tempCartList = JSON.parse(JSON.stringify(cartList));
    const user_tok = await retrieveData("userdetails");

    tempCartList.forEach((single, index) => {
      let obj = {};
      obj.itemName = single.itemName;
      obj.itemQuantity = single.count;
      obj.itemPrice = 0;
      obj.itemAttributes = {};
      single.attributes.forEach((attribute, index) => {
        if (attribute.status) {
          obj.itemAttributes[attribute.name] = "yes";
          obj.itemPrice += parseInt(attribute.price);
        }
      });
      bookingItems.push(obj);
    });
    order.bookingItems = bookingItems;
    order.address = address;
    order.totalPrice = calculateTotalPrice();
    // console.log("Payload:-",JSON.stringify(order, null, 4))
    if (data && data.token) {
      let resposne = await POSTCALL(
        "api/booking/dry-cleaner",
        order,
        data.token
      );
      setResponse(resposne.responseData);
      console.log("resposne:-", JSON.stringify(resposne.responseData, null, 4));
      if (resposne.responseData.success == true) {
        // dispatch(setCart([]));
        // dispatch(setSelectedDryCleaner({}));
        showMessage({
          message: "checkout successful",
          type: "success",
          style: {
            alignItems: "center",
          },
          autoHide: true,
          duration: 1500,
        });

        // sendinding minimum details to baackend in order to get the stripe URL for continuing payment.
        await POSTCALL(
          "api/stripe/create-checkout-session",
          {
            userId: user_tok.token,
            parkingId: "Vervoer",
            cartItems: [
              {
                id: resposne.responseData._id,
                name: "Dry Cleaning : ",
                image: "N?A",
                desc: "Vervoer Inc.",
                price: calculateTotalPrice() || 0,
                cartQuantity: 1,
              },
            ],
          },
          user_tok.token
        ).then((result) => {
          // console.log(result.responseData.url);
          setPaymentIntent(result.responseData.payment_intent);
          setDisplayStatus("flex");
          navigation.navigate("webview", {
            url: result.responseData.url,
            title: "Payment",
          });
          // Linking.openURL(result.responseData.url);
        });
      } else {
        showMessage({
          message: "Error while booking!",
          type: "warning",
          style: {
            alignItems: "center",
          },
          autoHide: true,
          duration: 1500,
        });
      }
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#4C4C4C" }}>
      <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
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
                fontSize: 16,
                marginVertical: 10,
                marginLeft: 15,
              }}
            >
              Order Summary
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: Colors.BLACK,
                fontSize: 18,
                color: "#F99025",
                fontWeight: "bold",
                marginEnd: 8,
              }}
            >
              Total: $ {calculateTotalPrice()}
            </Text>
            <Text
              style={{
                color: Colors.BLACK,
                fontSize: 8,
                fontWeight: "bold",
                color: "#F99025",
              }}
            >
              (including 15% tax)
            </Text>
          </View>
        </View>

        <View style={{ top: 70 }}>
          <TextInput
            style={styles.textInput}
            onChangeText={(value) => {
              setZipCode(value);
            }}
            placeholder="Enter your phone number here"
            placeholderTextColor="#000"
          />

          {/* <TextInput
            style={styles.textInput}
            onChangeText={(value) => {
              setName(value);
            }}
            placeholder="Enter your name here"
            placeholderTextColor="#000"
          /> */}

          <TextInput
            style={styles.textInput}
            onChangeText={(value) => {
              setAddress(value);
            }}
            placeholder="Enter your address here"
            placeholderTextColor="#000"
          />

          <TextInput
            style={styles.textInput}
            placeholder="Time duration (parking) "
            placeholderTextColor="#000"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Lisense plate (parking) "
            placeholderTextColor="#000"
          />
        </View>

        <ScrollView style={{ top: 40 }}>
          <FlatList
            style={{ minHeight: 200 }}
            data={cartList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItems}
            contentContainerStyle={{
              paddingBottom: 100,
              paddingTop: 50,
            }}
          />
        </ScrollView>

        <View
          style={{
            position: "absolute",
            zIndex: 999,
            width: "100%",
            bottom: 50,
          }}
        >
          {displayStatus === "none" ? (
            <TouchableOpacity
              onPress={handlePayemnt}
              style={{
                backgroundColor: "#F99025",
                marginHorizontal: 16,
                marginBottom: 20,
                height: 50,
                borderRadius: 30,
                justifyContent: "center",
                alignItems: "center",
                display: "none",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                continue
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handlePayemnt}
              style={{
                backgroundColor: "#F99025",
                marginHorizontal: 16,
                marginBottom: 20,
                height: 50,
                borderRadius: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                continue
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View
          style={{
            position: "absolute",
            zIndex: 999,
            width: "100%",
            bottom: 10,
          }}
        >
          {displayStatus === "none" ? (
            <TouchableOpacity
              onPress={bookOrder}
              style={{
                backgroundColor: "#F99025",
                marginHorizontal: 16,
                marginBottom: 20,
                height: 50,
                borderRadius: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                Confirm Checkout
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={bookOrder}
              style={{
                backgroundColor: "#F99025",
                marginHorizontal: 16,
                marginBottom: 20,
                height: 50,
                borderRadius: 30,
                justifyContent: "center",
                display: "none",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                Confirm Checkout
              </Text>
            </TouchableOpacity>
          )}

          {/* <CustomButton
            buttonText={"Confirm Checkout"}
            onPress={bookOrder}
            customStyle={{
              backgroundColor: "#F99025",
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              borderRadius: 25,
              marginHorizontal: 16,
            }}
            textStyle={{
              color: Colors.WHITE,
              fontSize: 20,
              fontWeight: "bold",
            }}
          /> */}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Cart;

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
  textInput: {
    // height: Platform.OS === "android" ? "auto" : 47,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.GRAY_MEDIUM,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8,
    color: Colors.BLACK,
    marginHorizontal: 16,
    marginBottom: 20,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});
