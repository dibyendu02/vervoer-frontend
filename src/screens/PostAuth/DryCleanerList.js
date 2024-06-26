import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import FocusAwareStatusBar from "../../components/FocusAwareStatusBar";
import { Colors } from "../../global";
import { GETCALL } from "../../global/server";
import { retrieveData } from "../../utils/Storage";
import { useDispatch, useSelector } from "react-redux";
import {
  setDrycleanerList,
  setSelectedDryCleaner,
} from "../../state/reducers/DrycleanerReducer";

const DryCleanerList = ({ navigation }) => {
  const { dryCleaners } = useSelector((state) => state.drycleanerreducer);
  const disPatch = useDispatch();

  const [openStatePicker, setOpenStatePicker] = useState(false);
  const [stateValue, setStateValue] = useState(null);
  const [states, setStates] = useState([]);

  const [openCityPicker, setOpenCityPicker] = useState(false);
  const [cityValue, setCityValue] = useState(null);
  const [cities, setCities] = useState([]);

  const [merchantCity, setMerchantCity] = useState("");
  const [merchantState, setMerchantState] = useState("");

  const fetchCityList = async () => {
    const cities = await GETCALL(
      `api/city-list?country=US&state=${stateValue}`
    );
    if (cities) {
      let temp = [];
      cities.responseData.forEach((city, index) => {
        console.log(city);
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
    const states = await GETCALL("api/state-list?country=US");
    // console.log(JSON.stringify(states, null, 2));
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
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchStateList();
    }, [])
  );

  React.useEffect(() => {
    if (merchantCity) {
      fetchDrycleanerList(merchantCity);
    }
  }, [merchantCity]);

  React.useEffect(() => {
    if (merchantState) {
      fetchCityList();
    }
  }, [merchantState]);

  const fetchDrycleanerList = async (selectedCity) => {
    console.log(selectedCity);
    let data = await retrieveData("userdetails");
    if (data && data.token && selectedCity !== "") {
      let response = await GETCALL(
        `api/search-dry-cleaner?cityName=${selectedCity}`,
        data.token
      );
      console.log(JSON.stringify(response, null, 4));
      if (response.responseData.success) {
        disPatch(setDrycleanerList(response.responseData.data));
      }
    }
  };

  const renderItems = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          disPatch(setSelectedDryCleaner(item));
          navigation.navigate("ItemsYouAccept", { userId: item.userId });
        }}
        style={{
          borderRadius: 10,
          backgroundColor: "#FDF1E5",
          padding: 10,
          borderWidth: 1,
          borderColor: "#F99025",
          // ...styles.shadow
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.circle}>
              <Image
                style={styles.user}
                source={require("../../assets/man.png")}
              />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 10,
              }}
            >
              <Text style={styles.label}>{item.name || "John Doe"}</Text>
              <Text style={styles.label}>
                {"Address : " + (item.address || "USA")}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: 10 }} />
        <View>
          <Text style={styles.label}>Availibility</Text>
        </View>
        <View style={{ height: 10 }} />
        {item?.availability.map((single, index) => {
          return (
            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
                alignItems: "center",
              }}
              key={index}
            >
              <Text style={styles.days}>{single.day} :- </Text>
              <View style={{ width: 10 }} />
              <Image
                style={{
                  width: 15,
                  height: 15,
                  resizeMode: "contain",
                  tintColor: "#F99025",
                }}
                source={require("../../assets/clock.png")}
              />
              <View style={{ width: 10 }} />
              <Text style={styles.days}>{single.startTime}</Text>
              <View style={{ width: 10 }} />
              <Image
                style={{
                  width: 15,
                  height: 15,
                  resizeMode: "contain",
                  tintColor: "#F99025",
                }}
                source={require("../../assets/clock.png")}
              />
              <View style={{ width: 10 }} />
              <Text style={styles.days}>{single.endTime}</Text>
            </View>
          );
        })}
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
      <View style={styles.container}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 10,
            justifyContent: "center",
          }}
        >
          <View style={{ margin: 8, width: "42%" }}>
            <Text style={{ color: "#000", fontSize: 18 }}>Select State</Text>
            <View style={{ height: 20 }} />
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
          <View style={{ margin: 8, width: "42%" }}>
            <Text style={{ color: "#000", fontSize: 18 }}>Select City</Text>
            <View style={{ height: 20 }} />
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
        </View>

        <FlatList
          data={dryCleaners}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  height: 10,
                }}
              />
            );
          }}
          contentContainerStyle={{
            marginHorizontal: 20,
            paddingBottom: 30,
          }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItems}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default DryCleanerList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SMOKEWHITE,
    marginHorizontal: 5,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F99025",
    justifyContent: "center",
    alignItems: "center",
  },
  user: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    tintColor: Colors.WHITE,
  },
  label: {
    fontSize: 16,
    color: Colors.BLACK,
  },
  days: {
    fontSize: 16,
    color: "#F99025",
    textTransform: "capitalize",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
});
