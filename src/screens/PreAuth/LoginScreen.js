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
  ToastAndroid,
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

const LoginScreen = ({ navigation }) => {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const disPatch = useDispatch();

  const loginHandler = async () => {
    if (number !== "" && password !== "") {
      setError(false);
      setLoading(true);
      const params = {
        phoneNumber: number,
        password: password,
      };
      try {
        let response = await POSTCALL("auth/login", params);
        setError(false);
        setLoading(false);
        if (response.responseData.success == true) {
          await storeData("userdetails", {
            token: response.responseData.data.token,
            user: response.responseData.data.user,
          });
          disPatch(changeAuthStatus(true));
        } else if (response.responseData.success == false) {
          showMessage({
            message: response.responseData.error,
            type: "danger",
          });
        } else {
          const msg = JSON.parse(response.responseData.msg);
          console.log(msg);
          showMessage({
            message: msg?.error || "Something went wrong",
            type: "danger",
          });
          return false;
        }
      } catch (error) {
        setError(false);
        setLoading(false);
        alert(error.message);
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
            <View style={{ marginTop: 15 }}>
              <View style={{ marginBottom: 10 }}>
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

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text
                  style={{
                    color: Colors.PRIMARY,
                    fontSize: 14,
                    fontWeight: "bold",
                    alignSelf: "flex-end",
                  }}
                >
                  Forgot Password ?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={loginHandler}
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
                  Login
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
              <Text
                style={{ color: "#808080", fontSize: 11, textAlign: "center" }}
              >
                Or Login with
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginVertical: 20,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: "white",
                    borderRadius: 100,
                    padding: 10,
                    elevation: 5,
                  }}
                >
                  <AntDesign name="google" size={24} color="#808080" />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: "white",
                    borderRadius: 100,
                    padding: 10,
                    paddingHorizontal: 15,
                    elevation: 5,
                    marginHorizontal: 20,
                  }}
                >
                  <FontAwesome name="facebook" size={24} color="#808080" />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: "white",
                    borderRadius: 100,
                    padding: 10,
                    elevation: 5,
                  }}
                >
                  <AntDesign name="apple1" size={24} color="#808080" />
                </TouchableOpacity>
              </View>
              {loading && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator size="small" color="#000000" />
                  <Text
                    style={{ fontSize: 15, color: "#000000", marginLeft: 10 }}
                  >
                    Please Wait!
                  </Text>
                </View>
              )}
              {error && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 15, color: "red", marginLeft: 10 }}>
                    User Not Registered!
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
        {/* <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
          <Image
            source={require('../../assets/Curve.png')}
            style={{ height: 240, width: 370, resizeMode: 'contain' }}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Registration')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              position: 'absolute',
              zIndex: 100,
              bottom: 20,
              right: 20,
            }}>
            <Text
              style={{
                fontSize: 15,
                color: '#FFFFFF',
                fontWeight: 'bold',
                marginRight: 5,
              }}>
              Sign Up
            </Text>
            <MaterialIcons name="arrow-forward-ios" size={14} color="#FFFFFF" />
          </TouchableOpacity>
        </View> */}
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
});
