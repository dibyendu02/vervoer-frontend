import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  ImageBackground,
  Image,
  Keyboard,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import BackArrowIcon from "../../assets/back.svg";
import { BASE_URL, POSTCALL } from "../../global/server";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Phone from "../../assets/svg/phone2.svg";
import Lock from "../../assets/svg/lock.svg";
import { useDispatch } from "react-redux";
import { Colors } from "../../global";
import FocusAwareStatusBar from "../../components/FocusAwareStatusBar";
import TextInputGlobal from "../../components/TextInputGlobal";
import { globalStyles } from "../../global/globalStyles";
import { showMessage, hideMessage } from "react-native-flash-message";
import DatePicker from "react-native-date-picker";
import moment from "moment";

const { height, width } = Dimensions.get("window");

const RegistrationScreen = ({ navigation }) => {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const disPatch = useDispatch();

  const registrationHandler = async () => {
    Keyboard.dismiss();
    if (number !== "" && password !== "" && dob !== "") {
      let error = [];

      // checking the dob format. If wrong give them an alert
      const dobCheckingPattern =
        /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
      let checkingDob = dobCheckingPattern.test(dob);
      if (!checkingDob) {
        error.push(
          "Please Enter the Date Of Birth correctly(format in DD/MM/YYYY)."
        );
      }
      if (error.length > 0) {
        let errorMessage = "Error Happened: \n";
        error.map((err, index) => {
          errorMessage += index + 1 + "." + err + "\n";
        });
        alert(errorMessage);
        error.length = 0;
      } else {
        const params = {
          phoneNumber: number,
          password,
          dob: dob,
        };
        try {
          let response = await POSTCALL("api/signup", params);

          setError(false);
          setLoading(false);

          if (response.responseData.success == true) {
            showMessage({
              message: response.responseData.msg,
              description: "Please Login",
              type: "success",
            });
            setTimeout(() => {
              hideMessage();
              navigation.navigate("Login");
            }, 1000);
          } else if (response.responseData.success == false) {
            showMessage({
              message: response.responseData.error,
              description: "Please Login",
              type: "danger",
            });
          } else {
            return false;
          }
        } catch (error) {
          console.log(error);
          setError(false);
          setLoading(false);
          alert(error.message);
        }
      }
    } else {
      Alert.alert("Please Fill All the Details");
    }
  };

  useEffect(() => {
    console.log(dob);
  }, [dob]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.WHITE }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
      <View style={styles.screen}>
        <View style={{ paddingHorizontal: 10, paddingTop: 20 }}>
          <ImageBackground
            source={require("../../assets/Background.png")}
            style={{ width: width, height: height, position: "absolute" }}
          />
          <View style={{ padding: 20 }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}
            >
              <BackArrowIcon height={"30"} />
            </TouchableOpacity>
            <Image
              source={require("../../assets/Heading.png")}
              style={{
                height: 48,
                width: 192,
                resizeMode: "contain",
                alignSelf: "center",
                marginVertical: 50,
              }}
            />
            <View style={{ marginTop: 10 }}>
              <View style={{ marginBottom: 5 }}>
                <Text
                  style={{
                    fontSize: 10,
                    color: Colors.GRAY_DARK,
                    marginBottom: 5,
                  }}
                >
                  Phone Number
                </Text>
                <TextInputGlobal
                  Svg={<Phone />}
                  placeHolder="Enter Number"
                  setState={setNumber}
                  state={number}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    fontSize: 10,
                    color: Colors.GRAY_DARK,
                    marginBottom: 5,
                  }}
                >
                  Password
                </Text>
                <TextInputGlobal
                  Svg={<Lock />}
                  placeHolder="Enter Password"
                  setState={setPassword}
                  state={password}
                  secureTextEntry={true}
                />
              </View>
              <View style={{ marginBottom: 15 }}>
                <Text
                  style={{
                    fontSize: 10,
                    color: Colors.GRAY_DARK,
                    marginBottom: 5,
                  }}
                >
                  Date Of Birth
                </Text>
                <Pressable
                  onPress={() => {
                    setOpen(true);
                  }}
                >
                  <TextInputGlobal
                    Svg={<Lock />}
                    placeHolder="DD/MM/YYYY"
                    state={dob}
                    editable={false}
                  />
                </Pressable>
              </View>
              <TouchableOpacity
                onPress={registrationHandler}
                style={[
                  globalStyles.button,
                  { marginHorizontal: 10, marginVertical: 20 },
                ]}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 15,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  Register
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Login")}
                style={{
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{
                    color: Colors.PRIMARY,
                    fontSize: 14,
                    fontWeight: "bold",
                    alignSelf: "center",
                  }}
                >
                  Already a user ? Signin
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <DatePicker
        modal
        open={open}
        date={new Date()}
        mode="date"
        onConfirm={(date) => {
          setOpen(false);
          setDob(moment(date).format("DD/MM/YYYY"));
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
});
