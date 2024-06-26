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
import React, { useCallback, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Formik, validateYupSchema } from "formik";
import * as yup from "yup";
import BackArrowIcon from "../../../../../assets/back.svg";
import MyProfile from "../../../../../assets/myProfile/imageprofile.svg";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Header from "../../../../../components/Header";
import FocusAwareStatusBar from "../../../../../components/FocusAwareStatusBar";
import { Colors } from "../../../../../global";
import { globalStyles } from "../../../../../global/globalStyles";
import CountryPicker from "react-native-country-picker-modal";
import DownArrow from "../../../../../assets/svg/DropDown.svg";
import { retrieveData } from "../../../../../utils/Storage";
import { GETCALL, POSTCALL } from "../../../../../global/server";
import { showMessage } from "react-native-flash-message";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Spinner from "react-native-loading-spinner-overlay";
import { filter, isEmpty } from "lodash";
import {
  setMerchantAddress,
  setMerchantCity,
  setMerchantImage,
  setMerchantName,
  setMerchantState,
  setMerchantZip,
} from "../../../../../redux/actions/merchantActions";
import { useDispatch, useSelector } from "react-redux";
import { setParkingMerchantName } from "../../../../../state/reducers/MerchantReducer";
const { width } = Dimensions.get("window");

const EditParkingMerchant = (props) => {
  const parkingSpacingList = props.route.params;

  const [selectedCountryCode, setSelectedCountryCode] = React.useState("91");
  const [selectedCountry, setSelectedCountry] = React.useState("IN");
  const [countryCodeVisible, setCountryCodeVisible] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const navigation = useNavigation();
  const { parkingMerchant } = useSelector((state) => state.merchantReducer);

  // const [openStatePicker, setOpenStatePicker] = useState(false);
  // const [stateValue, setStateValue] = useState(
  //   parkingSpacingList.parkingState ? parkingSpacingList.parkingState : null
  // );
  const [stateList, setStateList] = React.useState([]);
  const [stateCityList, setStateCityList] = React.useState([]);
  const [fullData, setFullData] = useState([]);
  let commonStateList = [];

  // const [openCityPicker, setOpenCityPicker] = useState(false);
  // const [cityValue, setCityValue] = useState(
  //   parkingSpacingList.parkingCity ? parkingSpacingList.parkingCity : null
  // );
  const [cityList, setCityList] = React.useState([]);
  // const [parkingSpacingList, setParkingSpacingList] = React.useState({});
  const dispatch = useDispatch();

  const [openStatePicker, setOpenStatePicker] = useState(false);
  const [stateValue, setStateValue] = useState(null);
  const [states, setStates] = useState([]);

  const [openCityPicker, setOpenCityPicker] = useState(false);
  const [cityValue, setCityValue] = useState(null);
  const [cities, setCities] = useState([]);

  const country = "US";
  const [merchantCity, setMerchantCity] = useState("");
  const [merchantState, setMerchantState] = useState("");

  const AddMerchant = yup.object().shape({
    name: yup.string().required("Please enter merchant name"),
    address: yup.string().required("Please enter merchant address"),
    // state: yup.string().required('Please enter merchant state'),
    // city: yup.string().required('Please enter merchant city'),
    zip: yup.string().required("Please enter merchant zip"),
    // address: yup.string().required('Please enter Product Name'),
  });

  const onSelect = (country) => {
    setSelectedCountry(country.cca2);
    setSelectedCountryCode(country.callingCode[0]);
  };

  useFocusEffect(
    useCallback(() => {
      fetchStateList();
    }, [])
  );

  const initialValues = {
    name: "",
    address: "",
    zip: "",
  };

  let newInitialValues = Object.assign(initialValues, {
    name:
      Object.keys(parkingSpacingList).length > 0
        ? parkingSpacingList.parkingName
        : "",
    address:
      Object.keys(parkingSpacingList).length > 0
        ? parkingSpacingList.parkingAddress
        : "",
    // state: '',
    // city: '',
    zip:
      Object.keys(parkingSpacingList).length > 0
        ? parkingSpacingList.zipCode
        : "",
  });

  const addMerchantDetails = (values, actions) => {
    if (stateValue !== null) {
      if (cityValue !== null) {
        const postData = {
          name: values.name,
          address: values.address,
          state: stateValue,
          city: cityValue,
          zip: values.zip,
        };
        dispatch(setParkingMerchantName(postData));
        props.navigation.navigate("EditParkingImage", parkingSpacingList);
      }
    }
  };

  const fetchCityList = async () => {
    const cities = await GETCALL(
      `api/city-list?country=US&state=${stateValue}`
    );
    console.log("cities");
    if (cities) {
      let temp = [];
      cities.responseData.forEach((city, index) => {
        let obj = {
          label: city.city,
          value: city.city,
        };
        temp.push(obj);
      });
      setCities(temp);
    }
  };

  const fetchStateList = async () => {
    console.log("states");
    const states = await GETCALL("api/state-list?country=US");
    console.log("states");
    if (states) {
      let temp = [];
      states.responseData.forEach((state, index) => {
        let obj = {
          label: state.states[0],
          value: state.states[0],
        };
        temp.push(obj);
      });
      setStates(temp);
      console.log(states);
    }
  };

  React.useEffect(() => {
    if (merchantState) {
      fetchCityList();
    }
  }, [merchantState]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.MERCHANT_BG }}
    >
      {/* <Spinner visible={loader} textContent={"Loading..."} /> */}
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
                        color: "#ffffff",
                        marginBottom: 5,
                      }}
                    >
                      Parking Merchant Details
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <Formik
              validationSchema={AddMerchant}
              initialValues={newInitialValues}
              onSubmit={addMerchantDetails}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
                touched,
                setFieldValue,
              }) => (
                <>
                  <View
                    style={{
                      marginVertical: 10,
                      backgroundColor: "#ffffff",
                      width: "100%",
                      borderRadius: 15,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{ fontSize: 18, color: "#000000", margin: 15 }}
                    >
                      Parking Merchant Info
                    </Text>

                    <View style={styles.textArea}>
                      <Text style={styles.title}>Name of Parking Merchant</Text>
                      <TextInput
                        value={values.name}
                        style={styles.textInput}
                        name="name"
                        placeholder={
                          "Please enter the name of your dry cleaner"
                        }
                        // onChangeText={value => {
                        //   let data = {...profileDetails};
                        //   data.firstName = value;
                        //   setProfileDeatils(data);
                        // }}
                        onChangeText={handleChange("name")}
                        autoCapitalize={"none"}
                      />
                    </View>
                    <View style={styles.textArea}>
                      <Text style={styles.title}>Street Address</Text>
                      <TextInput
                        value={values.address}
                        name="address"
                        style={styles.textInput}
                        placeholder={"Please enter street number and name"}
                        // onChangeText={value => {
                        //   let data = {...profileDetails};
                        //   data.lastName = value;
                        //   setProfileDeatils(data);
                        // }}
                        onChangeText={handleChange("address")}
                        autoCapitalize={"none"}
                      />
                    </View>
                    {/* <View style={styles.textArea}>
                  <Text style={styles.title}>City</Text>
                  <TextInput
                    value={profileDetails.email}
                    style={styles.textInput}
                    placeholder={'Enter City Name'}
                    onChangeText={(value) => {
                      let data = { ...profileDetails };
                      data.email = value;
                      setProfileDeatils(data)
                    }}
                    autoCapitalize={'none'}
                    keyboardType={'email-address'}
                  />
                </View> */}
                    <View style={styles.textArea}>
                      <Text style={styles.title}>State</Text>
                      <View style={{ height: 10 }} />
                      <DropDownPicker
                        open={openStatePicker}
                        value={stateValue}
                        setValue={setStateValue}
                        items={states}
                        setItems={setStates}
                        setOpen={setOpenStatePicker}
                        placeholder={"Select State"}
                        placeholderStyle={{ color: Colors.BLACK }}
                        onSelectItem={async (item) => {
                          setMerchantState(item?.value);
                          // await fetchCityList();
                        }}
                      />
                    </View>
                    <View style={styles.textArea}>
                      <Text style={styles.title}>City</Text>
                      <View style={{ height: 10 }} />
                      <DropDownPicker
                        open={openCityPicker}
                        value={cityValue}
                        setValue={setCityValue}
                        items={cities}
                        setItems={setCities}
                        setOpen={setOpenCityPicker}
                        placeholder={"Select City"}
                        placeholderStyle={{ color: Colors.BLACK }}
                        onSelectItem={(item) => {
                          setMerchantCity(item?.value);
                        }}
                      />
                    </View>
                    <View style={styles.textArea}>
                      <Text style={styles.title}>ZIP Code</Text>
                      <View style={{ width: width - 40 }}>
                        <TextInput
                          value={values.zip}
                          style={styles.textInput}
                          name="zip"
                          placeholder={"Zip Code"}
                          // onChangeText={value => {
                          //   let data = {...profileDetails};
                          //   data.pinCode = value;
                          //   setProfileDeatils(data);
                          // }}
                          onChangeText={handleChange("zip")}
                          keyboardType={"numeric"}
                        />
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={handleSubmit}
                      // onPress={() =>
                      //   props.navigation.navigate('ParkingMerchantImage')
                      // }
                      style={{
                        backgroundColor: Colors.PRIMARY,
                        height: 50,
                        borderRadius: 25,
                        justifyContent: "center",
                        alignItems: "center",
                        width: "90%",
                        marginVertical: 10,
                        alignSelf: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#fff",
                          fontWeight: "600",
                        }}
                      >
                        Next
                      </Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                onPress={updateProfile}
                style={{
                  backgroundColor: Colors.MERCHANT_BG,
                  height: 50,
                  borderRadius: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '90%',
                  marginVertical: 10,
                  alignSelf: 'center',
                }}>
                <Text style={{fontSize: 16, color: '#fff', fontWeight: '600'}}>
                  Cancel
                </Text>
              </TouchableOpacity> */}
                  </View>
                </>
              )}
            </Formik>
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

export default EditParkingMerchant;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.MERCHANT_BG,
    flex: 1,
  },
  textArea: {
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    color: "#000000",
    marginLeft: width / 15,
  },
  textInput: {
    height: Platform.OS === "android" ? "auto" : 47,
    borderBottomWidth: 1,
    //   borderRadius: 8,
    borderColor: Colors.GRAY_MEDIUM,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingLeft: 8,
    color: Colors.BLACK,
  },
});
