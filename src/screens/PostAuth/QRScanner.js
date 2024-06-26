// Barcode and QR Code Scanner using Camera in React Native
// https://aboutreact.com/react-native-scan-qr-code/

// import React in our code
import React, { useState } from "react";

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  Linking,
  TouchableHighlight,
  PermissionsAndroid,
  Platform,
  StyleSheet,
} from "react-native";

// import CameraScreen
import { CameraScreen } from "react-native-camera-kit";

const VeroverQRScannerComponent = ({ navigation, route }) => {
  const [otpValue, setOtpValue] = useState(route.params.otp);
  const [qrvalue, setQrvalue] = useState("");
  const [opneScanner, setOpneScanner] = useState(false);

  const onBarcodeScan = async (qrvalue) => {
    // Called after te successful scanning of QRCode/Barcode
    setQrvalue(qrvalue);
    setOpneScanner(false);
    if (otpValue === qrvalue) {
      // // update the status of booking from verfied false to true
      // const id = route.params.booking_id;
      // let data = await retrieveData("userdetails");
      // let payload = {
      //   bookingId: id,
      // };
      // if (data && data.token) {
      //   await POSTCALL("api/verify-booking", payload, data.token);
      // }
      alert("order verified");
      navigation.navigate("BookingListMerchant");
    } else {
      alert("scan again");
    }
  };

  const onOpneScanner = () => {
    // To Start Scanning
    if (Platform.OS === "android") {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "Camera Permission",
              message: "App needs permission for camera access",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If CAMERA Permission is granted
            setQrvalue("");
            setOpneScanner(true);
          } else {
            alert("CAMERA permission denied");
          }
        } catch (err) {
          alert("Camera permission err", err);
          console.warn(err);
        }
      }
      // Calling the camera permission function
      requestCameraPermission();
    } else {
      setQrvalue("");
      setOpneScanner(true);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {opneScanner ? (
        <View style={{ flex: 1 }}>
          <CameraScreen
            showFrame={false}
            // Show/hide scan frame
            scanBarcode={true}
            // Can restrict for the QR Code only
            laserColor={"blue"}
            // Color can be of your choice
            frameColor={"yellow"}
            // If frame is visible then frame color
            colorForScannerFrame={"black"}
            // Scanner Frame color
            onReadCode={(event) =>
              onBarcodeScan(event.nativeEvent.codeStringValue)
            }
          />
        </View>
      ) : (
        <View style={styles.container}>
          <TouchableHighlight
            onPress={onOpneScanner}
            style={styles.buttonStyle}
          >
            <Text style={styles.buttonTextStyle}>Open QR Scanner</Text>
          </TouchableHighlight>
        </View>
      )}
    </SafeAreaView>
  );
};

export default VeroverQRScannerComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
  },
  textStyle: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    padding: 10,
    marginTop: 16,
  },
  buttonStyle: {
    fontSize: 16,
    color: "white",
    backgroundColor: "green",
    padding: 5,
    minWidth: 250,
  },
  buttonTextStyle: {
    padding: 5,
    color: "white",
    textAlign: "center",
  },
  textLinkStyle: {
    color: "blue",
    paddingVertical: 20,
  },
});
