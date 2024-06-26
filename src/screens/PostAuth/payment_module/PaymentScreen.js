import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Linking,
  TouchableOpacity,
  Text,
} from "react-native";
import React from "react";

import Header from "../../../components/Header";
import FocusAwareStatusBar from "../../../components/FocusAwareStatusBar";
import { GETCALL, POSTCALL } from "../../../global/server";
import CustomButton from "../../../components/CustomButton";
import { retrieveData } from "../../../utils/Storage";
import { useFocusEffect } from "@react-navigation/native";

const PaymentScreen = ({ navigation, route }) => {
  useFocusEffect(React.useCallback(() => {}, []));
  const [displayStatus, setDisplayStatus] = React.useState("none");
  const [paymentIntent, setPaymentIntent] = React.useState("");
  const onSubmit = async () => {
    const user_tok = await retrieveData("userdetails");
    await POSTCALL(
      "api/stripe/create-checkout-session",
      {
        userId: user_tok.token,
        parkingId: "Vervoer",
        cartItems: [
          {
            id: route.params.booking_details.booking_id,
            name:
              "Parking Space Name : " +
              "Parking Spot Name : " +
              route.params.booking_details.parking_spot_name,
            image: "N?A",
            desc: "Vervoer Inc.",
            price:
              route.params.booking_details.Parking_spot_price +
                (route.params.booking_details.Parking_spot_price * 15) / 100 ||
              0,
            cartQuantity:
              route.params.booking_details.parking_spot_number === 2 ? 1 : 1,
          },
        ],
      },
      user_tok.token
    ).then((result) => {
      setPaymentIntent(result.responseData.payment_intent);
      setDisplayStatus("flex");
      // Linking.openURL(result.responseData.url);
      navigation.navigate("webview", {
        url: result.responseData.url,
        title: "Payment",
      });
    });
  };
  const contPayment = async () => {
    // check payment status is successful or not. If Succ process to next;
    // generate an otp and attatched it to DB.
    const user_tok = await retrieveData("userdetails");
    console.log(paymentIntent);
    await POSTCALL(
      "api/complete-order",
      {
        paymentIntent: paymentIntent,
        ...route.params,
      },
      user_tok.token
    );
    navigation.navigate("BookingListUser");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#4C4C4C" }}>
      <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
      {/* <Spinner visible={loader} textContent={"Loading..."} /> */}
      <View style={styles.screen}>
        <Header />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ margin: 20 }}>
            <CustomButton
              customStyle={{
                backgroundColor: "#F99025",
                marginHorizontal: 16,
                marginBottom: 20,
                height: 50,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              buttonText={"Payment Submit"}
              textStyle={{
                color: "#fff",
                fontSize: 20,
              }}
              onPress={onSubmit}
            />
            {displayStatus === "none" ? (
              <TouchableOpacity
                onPress={contPayment}
                style={{
                  backgroundColor: "#F99025",
                  marginHorizontal: 16,
                  marginBottom: 20,
                  height: 50,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  display: "none",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 20,
                  }}
                >
                  continue
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={contPayment}
                style={{
                  backgroundColor: "#F99025",
                  marginHorizontal: 16,
                  marginBottom: 20,
                  height: 50,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 20,
                  }}
                >
                  continue
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  textArea: {
    height: 100,
    borderRadius: 10,
    borderColor: "#F99025",
    borderWidth: 1,
    textAlignVertical: "top",
    paddingHorizontal: 10,
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
  subHeader: {
    width: Dimensions.get("window").width / 1.15,
    height: Dimensions.get("window").height / 12,
    borderRadius: 40,
    backgroundColor: "white",
    alignSelf: "center",
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  selectedFloor: {
    width: Dimensions.get("window").width / 3.75,
    height: Dimensions.get("window").height / 15,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff0e1",
  },
  unselectedFloor: {
    width: Dimensions.get("window").width / 3.75,
    height: Dimensions.get("window").height / 15,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  orangeBox: {
    width: Dimensions.get("window").width / 8,
    height: Dimensions.get("window").height / 16,
    backgroundColor: "#fa9310",
    borderRadius: 15,
    // marginLeft:
    justifyContent: "center",
    alignItems: "center",
  },
  floorBox: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#eceded",
    // backgroundColor: 'red',
    height: Dimensions.get("window").height / 2,
    width: Dimensions.get("window").width / 1.2,
    marginTop: Dimensions.get("window").height / 55,
  },
  leftContainer: {
    borderColor: "#eceded",
    borderWidth: 1,
    borderLeftWidth: 0,
    height: Dimensions.get("window").height / 10,
    width: Dimensions.get("window").width / 2.4,
    justifyContent: "center",
    alignItems: "center",
  },
  rightContainer: {
    borderColor: "#eceded",
    borderWidth: 1,
    borderRightWidth: 0,
    height: Dimensions.get("window").height / 10,
    width: Dimensions.get("window").width / 2.4,
    justifyContent: "center",
    alignItems: "center",
  },
  footerButton: {
    height: Dimensions.get("window").height / 15,
    width: Dimensions.get("window").width / 2.5,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    // right: 30,
    // bottom: 30,
    // position: 'absolute',
  },
});
