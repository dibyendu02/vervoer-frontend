import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Alert,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Phone from "../../assets/svg/phone2.svg";
import Lock from "../../assets/svg/lock.svg";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import BackArrowIcon from "../../assets/back.svg";
import axios from "axios";
import { BASE_URL, POSTCALL } from "../../global/server";
import { Colors, ScreenNames } from "../../global";
import FocusAwareStatusBar from "../../components/FocusAwareStatusBar";
//   import { Set_Encrypted_AsyncStorage } from 'react-native-encrypted-asyncstorage';
import TextInputGlobal from "../../components/TextInputGlobal";
import { globalStyles } from "../../global/globalStyles";
import * as UserAction from "../../redux/actions/userActions";
import { connect } from "react-redux";
import { storeData, retrieveData } from "../../utils/Storage";
import { useDispatch } from "react-redux";
import { changeAuthStatus } from "../../state/reducers/AuthReducer";
import { showMessage } from "react-native-flash-message";
const { height, width } = Dimensions.get("window");

const ForgotPasswordScreen = ({ navigation }) => {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const disPatch = useDispatch();

  const passwordResetHandler = async () => {
    Keyboard.dismiss();
    if (
      number !== "" &&
      passwordConfirm !== "" &&
      password !== "" &&
      dob !== ""
    ) {
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
      if (passwordConfirm !== password) {
        error.push("Password and Confirm Password didn't match");
      }

      if (error.length > 0) {
        let errorMessage = "Error Happened: \n";
        error.map((err, index) => {
          errorMessage += index + 1 + "." + err + "\n";
        });
        alert(errorMessage);
        error.length = 0;
      }

      const params = {
        phoneNumber: number,
        password: password,
        dob: dob,
      };
      try {
        let response = await POSTCALL("api/resetpassword", params);
        if (response.responseData.success === true) {
          showMessage({
            message: JSON.stringify(response.responseData.msg),
            type: "success",
          });
        } else {
          showMessage({
            message: JSON.stringify(response.responseData.msg),
            type: "danger",
          });
        }
      } catch (error) {
        showMessage({
          message: JSON.stringify("Error Happonod"),
          type: "danger",
        });
      }
    } else {
      Alert.alert("Please Fill All the Details");
    }
  };

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

            <View style={{ marginTop: 5 }}>
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
                  Password Confirmation
                </Text>
                <TextInputGlobal
                  Svg={<Lock />}
                  placeHolder="Confirm Password"
                  setState={setPasswordConfirm}
                  state={passwordConfirm}
                  secureTextEntry={true}
                />
              </View>

              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    fontSize: 10,
                    color: Colors.GRAY_DARK,
                    marginBottom: 5,
                  }}
                >
                  Date Of Birth
                </Text>
                <TextInputGlobal
                  Svg={<Lock />}
                  placeHolder="DD/MM/YYYY"
                  setState={setDob}
                  state={dob}
                />
              </View>

              <TouchableOpacity
                onPress={passwordResetHandler}
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
                  Change Password
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Registration")}
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
                  Not a registered user ? Signup
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
});
