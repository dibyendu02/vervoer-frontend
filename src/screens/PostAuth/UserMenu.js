import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
} from "react-native";
import FocusAwareStatusBar from "../../components/FocusAwareStatusBar";
import CustomButton from "../../components/CustomButton";
import { Colors } from "../../global";

const UserMenu = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pinCode, setPinCode] = useState(false);

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />

      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("UserOrders");
          }}
          style={styles.box}
        >
          <Text style={styles.boxText}>My Booking List - Dry Cleaning</Text>
        </TouchableOpacity>
        <View style={{ width: 5 }} />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("DryCleanerList");
          }}
          style={styles.box}
        >
          <Text style={styles.boxText}>Book Dry Cleaner</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("BookingListUser")}
          style={styles.box}
        >
          <Text adjustsFontSizeToFit style={styles.boxText}>
            My Booking List - Car Parking
          </Text>
        </TouchableOpacity>
        <View style={{ width: 5 }} />

        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          style={styles.box}
        >
          <Text style={styles.boxText}>Book a Parking</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("MyDeliveryList")}
          style={styles.box}
        >
          <Text adjustsFontSizeToFit style={styles.boxText}>
            My Delivery List
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            alignItems: "center",
            width: "100%",
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
          }}
        >
          <View
            style={{ padding: 20, backgroundColor: "#fff", borderRadius: 20 }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontWeight: "bold",
                fontSize: 20,
                marginVertical: 20,
                color: "black",
              }}
            >
              Please enter your desirable pincode
            </Text>
            <TextInput
              placeholder="Enter the Zip Code"
              placeholderTextColor="black"
              style={{
                height: 50,
                borderWidth: 1,
                borderColor: "gray",
                color: "#000",
                marginBottom: 10,
                padding: 16,
                borderRadius: 10,
              }}
              onChangeText={(text) => setPinCode(text)}
            />
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
              buttonText={"Proceed"}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("BookingUserList", pinCode);
              }}
              textStyle={{
                color: Colors.WHITE,
                fontSize: 20,
                fontWeight: "bold",
              }}
            />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default UserMenu;

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
});
