import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import FocusAwareStatusBar from "../../../../components/FocusAwareStatusBar";
import { Colors } from "../../../../global";
import { retrieveData } from "../../../../utils/Storage";
import { GETCALL, POSTCALL } from "../../../../global/server";
import { useFocusEffect } from "@react-navigation/native";
import BackArrowIcon from "../../../../assets/back.svg";

const RenderBookingCard = ({ item }) => {
  const [deliveryStatus, setDeliveryStatus] = React.useState(
    item?.bookingStatus
  );
  const [address, setAddress] = React.useState("");
  const [details, setDetails] = React.useState();
  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");

  const fetchAddress = async () => {
    let data = await retrieveData("userdetails");
    if (data && data.token) {
      let response = await GETCALL(
        "api/dry-clean-booking/" + item.orderId,
        data.token
      );
      console.log(
        JSON.stringify(response?.responseData?.data?.details, null, 2)
      );
      setDetails(response?.responseData?.data?.details);
      setAddress(response?.responseData?.data?.bookingByUserAddress);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchAddress();
    }, [])
  );

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
        <Text style={{ color: Colors.BLACK, fontSize: 16, fontWeight: "bold" }}>
          User Id :
        </Text>
        <Text
          style={{
            color: Colors.BLACK,
            fontSize: 16,
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {item?.assignedTo}
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
        <Text style={{ color: Colors.BLACK, fontSize: 16, fontWeight: "bold" }}>
          Order Id :
        </Text>
        <Text
          style={{
            color: Colors.BLACK,
            fontSize: 16,
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {item?.orderId}
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
        <Text style={{ color: Colors.BLACK, fontSize: 16, fontWeight: "bold" }}>
          Delivery Status :
        </Text>
        <Text
          style={{
            color: "blue",
            fontSize: 16,
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {deliveryStatus}
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
        <Text style={{ color: Colors.BLACK, fontSize: 16, fontWeight: "bold" }}>
          Cleaner Address :
        </Text>

        <Text
          style={{
            color: "blue",
            fontSize: 16,
            fontWeight: "bold",
            width: "60%",
            // textTransform: "capitalize",
          }}
        >
          {item?.bookingTo[0]?.bookingByUserAddress || "No Address"}
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
        <Text style={{ color: Colors.BLACK, fontSize: 16, fontWeight: "bold" }}>
          Vendor Mobile :
        </Text>

        <Text
          style={{
            color: "blue",
            fontSize: 16,
            fontWeight: "bold",
            width: "60%",
            // textTransform: "capitalize",
          }}
        >
          {details?.vendor?.phoneNumber || "-"}
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
        <Text style={{ color: Colors.BLACK, fontSize: 16, fontWeight: "bold" }}>
          Customer Mobile :
        </Text>

        <Text
          style={{
            color: "blue",
            fontSize: 16,
            fontWeight: "bold",
            width: "60%",
            // textTransform: "capitalize",
          }}
        >
          {details?.user?.phoneNumber || "-"}
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
        <Text style={{ color: Colors.BLACK, fontSize: 16, fontWeight: "bold" }}>
          Pickup Address :
        </Text>
        <Text
          style={{
            color: "blue",
            fontSize: 16,
            fontWeight: "bold",
            width: "60%",
            // textTransform: "capitalize",
          }}
        >
          {`${address || "No Address"} ${city ? city + "," : ""} ${
            state || ""
          }` || "No Address"}
        </Text>
      </View>

      <View style={{ height: 10 }} />
      <View style={{ height: 1, backgroundColor: Colors.BORDER }} />
      <View style={{ height: 10 }} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          style={[styles.button, { marginRight: 10 }]}
          onPress={async () => {
            await POSTCALL("api/delivery/accept-delivery", {
              assignedTo: item?.assignedTo,
              orderId: item?.orderId,
            });
            setDeliveryStatus("Confirmed");
          }}
        >
          <Text style={styles.buttonText}>ACCEPT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "red" }]}
          onPress={async () => {
            await POSTCALL("api/delivery/reject-delivery", {
              assignedTo: item?.assignedTo,
              orderId: item?.orderId,
            });
            setDeliveryStatus("Cancelled");
          }}
        >
          <Text style={styles.buttonText}>REJECT</Text>
        </TouchableOpacity>
      </View>
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

const MyDeliveryList = ({ navigation }) => {
  const [deliveryDetails, setDeliveryDetails] = React.useState();

  useFocusEffect(
    React.useCallback(() => {
      fetchDeliveryDetails();
    }, [])
  );

  const fetchDeliveryDetails = async () => {
    let data = await retrieveData("userdetails");
    let bookingData = await POSTCALL("api/delivery/fetch-delivery-assignto", {
      assignedTo: data?.user._id,
    });
    // console.log(JSON.stringify(
    //   bookingData?.responseData?.data?.model,
    //   null,2
    // ));
    setDeliveryDetails(bookingData?.responseData?.data?.model);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
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
                fontSize: 22,
                marginVertical: 10,
                marginLeft: 15,
              }}
            >
              Delivery List
            </Text>
          </View>
        </View>
      </View>
      <ScrollView style={{ minHeight: 200, marginTop: 50 }}>
        {deliveryDetails?.map((deliveryDetail) => {
          return <RenderBookingCard item={deliveryDetail} />;
        })}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MyDeliveryList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SMOKEWHITE,
    marginHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#F99025",
    justifyContent: "center",
    flex: 1,
    height: 150,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#F99025",
  },
  boxText: {
    color: Colors.WHITE,
    fontSize: 25,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  section: {
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  button: {
    backgroundColor: "#007AFF", // Customize the background color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF", // Customize the text color
    fontSize: 16,
    fontWeight: "bold",
  },
});
