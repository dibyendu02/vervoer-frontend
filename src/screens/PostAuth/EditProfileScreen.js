/* eslint-disable react-native/no-inline-styles */
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  Image,
  Dimensions,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import BackArrowIcon from "../../assets/back.svg";
import MyProfile from "../../assets/myProfile/imageprofile.svg";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import FocusAwareStatusBar from "../../components/FocusAwareStatusBar";
import { Colors } from "../../global";
import { globalStyles } from "../../global/globalStyles";
import CountryPicker from "react-native-country-picker-modal";
import DownArrow from "../../assets/svg/DropDown.svg";
import { retrieveData } from "../../utils/Storage";
import { GETCALL, POSTCALL } from "../../global/server";
import { showMessage } from "react-native-flash-message";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Spinner from "react-native-loading-spinner-overlay";
const { width } = Dimensions.get("window");

const EditProfileScreen = () => {
  const [selectedCountryCode, setSelectedCountryCode] = React.useState("91");
  const [selectedCountry, setSelectedCountry] = React.useState("IN");
  const [countryCodeVisible, setCountryCodeVisible] = React.useState(false);
  const [loader, setLoader] = React.useState(true);
  const navigation = useNavigation();

  const [stateList, setStateList] = React.useState([]);
  const [stateCityList, setStateCityList] = React.useState([]);

  const [cityList, setCityList] = React.useState([]);

  const onSelect = (country) => {
    setSelectedCountry(country.cca2);
    setSelectedCountryCode(country.callingCode[0]);
  };

  const toggleCountryCodeVisibility = () => {
    setCountryCodeVisible(!countryCodeVisible);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserDetails();
    }, [])
  );

  const [profileDetails, setProfileDeatils] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "India",
    state: "",
    city: "",
    pinCode: "",
    image: "",
  });

  const BASE_URL = "https://vervoer-backend.herokuapp.com/";

  const fetchUserDetails = async () => {
    setLoader(true);
    let data = await retrieveData("userdetails");
    console.log(data);
    if (data && data.token) {
      let response = await GETCALL("api/get-my-profile", data.token);
      setLoader(false);
      let userDetails = response.responseData.data.user;
      console.log(response.responseData);
      fetchStateList(userDetails.state, userDetails.city);
      console.log(JSON.stringify(userDetails, null, 4));
      setProfileDeatils({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber,
        country: userDetails.country,
        state: userDetails.state,
        city: userDetails.city,
        pinCode: userDetails.pinCode,
        image: userDetails.image,
      });
    }
  };

  // const fetchStateList = async (state, city) => {
  //   let response = await GETCALL("state-list");
  //   let stateCityList = response.responseData;
  //   setStateCityList(stateCityList);
  //   if (state) {
  //     setStateValue(state);
  //     let temp = [...response.responseData];
  //     let index = temp.findIndex((single, index) => single.stateSlug == state);
  //     let filteredCity = temp[index].city;
  //     let tempCity = [];
  //     filteredCity.forEach((singleCity, index) => {
  //       let obj = {
  //         label: singleCity.cityName,
  //         value: singleCity.citySlug,
  //       };
  //       tempCity.push(obj);
  //     });
  //     setCityList(tempCity);
  //   }
  //   if (city) {
  //     setCityValue(city);
  //   }
  //   let temp = [];
  //   stateCityList.forEach((state, index) => {
  //     let obj = {
  //       label: state.stateName,
  //       value: state.stateSlug,
  //     };
  //     temp.push(obj);
  //   });
  //   setStateList(temp);
  // };

  const updateProfile = async () => {
    setLoader(true);
    let data = await retrieveData("userdetails");

    let profile = { ...profileDetails };
    if (data && data.token) {
      let response = await POSTCALL(
        "api/update-my-profile",
        profile,
        data.token
      );
      setLoader(false);
      if (response.responseData.success == true) {
        showMessage({
          message: response.responseData.msg,
          description: "",
          type: "success",
        });
      }
    }
  };

  const openPrompt = () => {
    Alert.alert("Upload Image", "Upload Image From Camera Or Gallery", [
      {
        text: "Camera",
        onPress: async () => {
          let result = await launchCamera({
            mediaType: "photo",
            quality: 1,
          });
          uploadFile({
            uri: result.assets[0].uri,
            name: result.assets[0].fileName,
            type: result.assets[0].type,
          });
        },
        style: "default",
      },
      {
        text: "Gallery",
        onPress: async () => {
          let result = await launchImageLibrary({
            mediaType: "photo",
            quality: 1,
          });
          uploadFile({
            uri: result.assets[0].uri,
            name: result.assets[0].fileName,
            type: result.assets[0].type,
          });
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

  const uploadFile = async (imageData) => {
    setLoader(true);
    let formData = new FormData();

    let data = await retrieveData("userdetails");
    formData.append("profileImage", imageData);
    console.log(formData);
    try {
      console.log(formData);
      let fileResponse = await POSTCALL(
        "api/update-profile-image",
        formData,
        data.token,
        "media"
      );
      setLoader(false);
      fetchUserDetails();
    } catch (error) {
      setLoader(false);
      showMessage({
        message: `${error.message}`,
        type: "danger",
        style: {
          alignItems: "center",
        },
        autoHide: true,
        duration: 1500,
      });
    }
  };

  const [openStatePicker, setOpenStatePicker] = useState(false);
  const [stateValue, setStateValue] = useState(null);
  const [states, setStates] = useState([]);

  const [openCityPicker, setOpenCityPicker] = useState(false);
  const [cityValue, setCityValue] = useState(null);
  const [cities, setCities] = useState([]);

  const country = "US";
  const [merchantCity, setMerchantCity] = useState("");
  const [merchantState, setMerchantState] = useState("");

  const fetchCityList = async () => {
    const cities = await GETCALL(
      `api/city-list?country=US&state=${stateValue}`
    );
    console.log(cities);
    if (cities) {
      let temp = [];
      cities.responseData.forEach((city, index) => {
        let obj = {
          label: city.cityName,
          value: city.cityName,
        };
        temp.push(obj);
      });
      setCities(temp);
    }
  };

  const fetchStateList = async () => {
    const states = await GETCALL("api/state-list?country=US");
    if (states) {
      let temp = [];
      states.responseData.forEach((state, index) => {
        let obj = {
          label: state.stateName,
          value: state.stateName,
        };
        temp.push(obj);
      });
      setStates(temp);
      console.log(states);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchStateList();
    }, [])
  );

  React.useEffect(() => {
    if (merchantState) {
      fetchCityList();
    }
  }, [merchantState]);
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      {/* <Spinner
        visible={loader}
        textContent={'Loading...'}
      /> */}
      <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
      <View style={styles.screen}>
        <Header />
        <ScrollView
          keyboardShouldPersistTaps={"always"}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginHorizontal: 20 }}>
            <View
              style={{ zIndex: 10, flexDirection: "column", marginTop: 20 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    zIndex: -1,
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{}}
                    onPress={() => navigation.goBack()}
                  >
                    <BackArrowIcon height={"30"} />
                  </TouchableOpacity>
                  <View style={{ marginLeft: 10 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#000000",
                        marginBottom: 5,
                      }}
                    >
                      My Profile
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ marginVertical: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  openPrompt();
                }}
              >
                {profileDetails.image == "" && (
                  <MyProfile style={{ alignSelf: "center" }} />
                )}
                {profileDetails.image != "" && (
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      alignSelf: "center",
                    }}
                    source={{ uri: `${BASE_URL}${profileDetails.image}` }}
                  />
                )}
              </TouchableOpacity>

              <View style={styles.textArea}>
                <Text style={styles.title}>First Name</Text>
                <TextInput
                  value={profileDetails.firstName}
                  style={styles.textInput}
                  placeholder={"First Name"}
                  onChangeText={(value) => {
                    let data = { ...profileDetails };
                    data.firstName = value;
                    setProfileDeatils(data);
                  }}
                  autoCapitalize={"none"}
                />
              </View>
              <View style={styles.textArea}>
                <Text style={styles.title}>Last Name</Text>
                <TextInput
                  value={profileDetails.lastName}
                  style={styles.textInput}
                  placeholder={"Last Name"}
                  onChangeText={(value) => {
                    let data = { ...profileDetails };
                    data.lastName = value;
                    setProfileDeatils(data);
                  }}
                  autoCapitalize={"none"}
                />
              </View>
              <View style={styles.textArea}>
                <Text style={styles.title}>Email</Text>
                <TextInput
                  value={profileDetails.email}
                  style={styles.textInput}
                  placeholder={"Email"}
                  onChangeText={(value) => {
                    let data = { ...profileDetails };
                    data.email = value;
                    setProfileDeatils(data);
                  }}
                  autoCapitalize={"none"}
                  keyboardType={"email-address"}
                />
              </View>
              <View style={styles.textArea}>
                <Text style={styles.title}>Mobile Number</Text>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={toggleCountryCodeVisibility}
                    style={[
                      globalStyles.TextInput,
                      { padding: 6, alignItems: "center" },
                    ]}
                  >
                    <CountryPicker
                      visible={countryCodeVisible}
                      withCallingCode
                      withFilter
                      withFlag
                      withEmoji
                      countryCode={selectedCountry}
                      // withFlagButton={false}
                      withCallingCodeButton
                      onSelect={onSelect}
                      // containerButtonStyle={{ marginRight: 5 }}
                      withCloseButton
                    />
                    <DownArrow />
                  </TouchableOpacity>
                  <View style={{ left: 8, flex: 1 }}>
                    <TextInput
                      value={profileDetails.phoneNumber}
                      style={{ ...styles.textInput, color: "#000000" }}
                      placeholder={"Phone number"}
                      editable={false}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.textArea}>
                <Text style={styles.title}>ZIP Code</Text>
                <View style={{ width: width - 40 }}>
                  <TextInput
                    value={profileDetails.pinCode}
                    style={styles.textInput}
                    placeholder={"Zip Code"}
                    onChangeText={(value) => {
                      let data = { ...profileDetails };
                      data.pinCode = value;
                      setProfileDeatils(data);
                    }}
                    keyboardType={"numeric"}
                  />
                </View>
              </View>

              <TouchableOpacity
                onPress={updateProfile}
                style={{
                  backgroundColor: Colors.PRIMARY,
                  height: 50,
                  borderRadius: 25,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 16, color: "#fff", fontWeight: "600" }}
                >
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      {/* <RBSheet
        ref={bottomCitySheetRef}
        height={height * .5}
        openDuration={250}

        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
          }
        }}
      >
        <ScrollView>
          {cityList.map((city, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedCity(city.citySlug);
                  let data = { ...profileDetails };
                  data.city = city.citySlug;
                  setProfileDeatils(data)
                  bottomCitySheetRef.current.close()
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  paddingVertical: 16
                }}
                key={index}>
                <Text style={{ color: Colors.BLACK, fontSize: 22 }}>{city.cityName}</Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </RBSheet> */}
      {/* <RBSheet
        ref={bottomStateSheetRef}
        height={height * .5}
        openDuration={250}

        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
          }
        }}
      >
        <ScrollView>
          {stateList.map((state, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedState(state.stateSlug);
                  setCityList(stateList[index].city);
                  let data = { ...profileDetails };
                  data.state = state.stateSlug;
                  setProfileDeatils(data);
                  bottomStateSheetRef.current.close()
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  paddingVertical: 16
                }}
                key={index}>
                <Text style={{ color: Colors.BLACK, fontSize: 22 }}>{state.stateName}</Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </RBSheet> */}
    </KeyboardAvoidingView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "whitesmoke",
    flex: 1,
  },
  textArea: {
    marginBottom: 8,
  },
  title: {
    fontSize: 10,
    color: Colors.GRAY_DARK,
  },
  textInput: {
    height: Platform.OS === "android" ? "auto" : 47,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.GRAY_MEDIUM,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingLeft: 8,
    color: Colors.BLACK,
  },
});
