import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useCallback } from "react";
import FocusAwareStatusBar from "../../../../components/FocusAwareStatusBar";
import { Colors } from "../../../../global";
import Header from "../../../../components/Header";
import { GETCALL, POSTCALL } from "../../../../global/server";
import CustomButton from "../../../../components/CustomButton";
import { retrieveData } from "../../../../utils/Storage";
import BackArrowIcon from "../../../../assets/back.svg";

import Spinner from "react-native-loading-spinner-overlay";
import { hideMessage, showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";
import { FlatList, TextInput } from "react-native-gesture-handler";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import { useFocusEffect } from "@react-navigation/native";

const ParkingDetails = ({ navigation }) => {
  const [loader, setLoader] = React.useState(false);
  const [about, setAbout] = React.useState("");
  const [parkingSlots, setParkingSlots] = React.useState("");
  const { dryCleanerProfile } = useSelector((state) => state.drycleanerreducer);
  const { parkingMerchant } = useSelector((state) => state.merchantReducer);
  const [parkingDetails, setParKingDetails] = React.useState({});
  const [parkingSlotsList, setParkingSlotsList] = React.useState({});

  const getParkingData = async () => {
    setLoader(true);
    let data = await retrieveData("userdetails");
    GETCALL("api/get-parking-data", data.token)
      .then((res) => {
        // console.log(res.responseData);
        if (res && res.responseData) {
          setParKingDetails(res?.responseData?.data);
          getParkingList(res?.responseData?.data._id);
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  };
  const BASE_URL = "http://165.22.62.238";

  const getParkingList = async (parkingId) => {
    let data = await retrieveData("userdetails");
    GETCALL(
      `parking-space-list?parkingId=${parkingId}&filterType=all`,
      data.token
    )
      .then((res) => {
        setLoader(false);
        setParkingSlotsList(res?.responseData?.data);
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const addParkingSpace = async (parkingId) => {
    setLoader(true);
    let data = await retrieveData("userdetails");
    const postData = {
      parkingId: parkingDetails._id,
    };
    POSTCALL(`create-new-parking-space`, postData, data.token)
      .then((res) => {
        setLoader(false);
        getParkingList(parkingDetails._id);
        // setParkingSlotsList(res?.responseData?.data);
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const setActiveStatus = async (id) => {
    setLoader(true);
    let data = await retrieveData("userdetails");
    const postData = {
      parkingSpaceId: id,
    };
    POSTCALL(`active-inactive-parking-space`, postData, data.token)
      .then((res) => {
        setLoader(false);
        getParkingList(parkingDetails._id);
        // setParkingSlotsList(res?.responseData?.data);
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const ListLastComponent = () => {
    return (
      <TouchableOpacity
        onPress={() => addParkingSpace()}
        style={[
          styles.plotBlock,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ fontSize: 35, fontWeight: "bold", color: "white" }}>
          +
        </Text>
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    useCallback(() => {
      getParkingData();
    }, [])
  );

  useEffect(() => {
    // getParkingData();
    // getParkingList();
  });

  const renderItems = ({ item }) => {
    return (
      <TouchableOpacity
        onLongPress={() => setActiveStatus(item._id)}
        onPress={() => {
          if (item.status === "active") {
            navigation.navigate("SlotDetailPage", item);
          } else if (item.status === "incomplete") {
            navigation.navigate("AvailableParkingSlot");
          }
        }}
        style={
          item.status === "active" || item.status === "incomplete"
            ? styles.plotBlock
            : styles.inactivePlotBlock
        }
      >
        <Text style={{ alignSelf: "center", color: "white" }}>
          {item.parkingSpaceName}
        </Text>
        <Text style={{ alignSelf: "center", color: "white" }}>
          ${item.parkingSpacePrice}
        </Text>
      </TouchableOpacity>
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

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#4C4C4C" }}>
      <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
      {/* <Spinner visible={loader} textContent={"Loading..."} /> */}
      <View style={styles.screen}>
        <Header />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ zIndex: 10, flexDirection: "column", marginTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                alignItems: "center",
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
                  style={{ marginHorizontal: 10 }}
                  onPress={() => navigation.goBack()}
                >
                  <BackArrowIcon height={"30"} />
                </TouchableOpacity>
                <View style={{ marginLeft: 60 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "black",
                      marginBottom: 5,
                      alignSelf: "center",
                      marginLeft: Dimensions.get("window").width / 8,
                    }}
                  >
                    Parking
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("EditParkingMerchant", parkingDetails)
                }
                style={[
                  styles.plotBlock,
                  {
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    // marginVertical: 10,
                  },
                ]}
              >
                <Feather name="edit-2" color={"white"} size={25} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.headerHolder}>
            <Text style={{ color: "white", fontSize: 15 }}>PArking Lot</Text>
          </View>
          <View style={styles.imageHolder}>
            <Image
              style={{ height: "100%", width: "100%" }}
              source={{
                uri: `${BASE_URL}${parkingDetails.parkingImage}`,
              }}
            />
          </View>
          <View
            style={[
              styles.titleHolder,
              {
                width: "90%",
                padding: 15,
                flexDirection: "row",
                alignItems: "center",
              },
            ]}
          >
            <Entypo name="location-pin" size={40} />
            <View>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "black" }}
              >
                {parkingDetails.parkingName}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  marginVertical: 5,
                  color: "black",
                  width: "98%",
                  lineHeight: 24,
                }}
              >
                {parkingDetails.parkingAddress},{parkingDetails.parkingCity},
                {parkingDetails.parkingState}
              </Text>
            </View>
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ marginVertical: 10, fontSize: 20, color: "black" }}>
              Zones/Levels | Spaces Available
            </Text>
            {Object.keys(parkingSlotsList).length > 0 ? (
              <FlatList
                data={
                  Object.keys(parkingSlotsList).length > 0 && parkingSlotsList
                }
                contentContainerStyle={{
                  marginHorizontal: 10,
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItems}
                ListFooterComponent={ListLastComponent}
              />
            ) : (
              <>{ListEmptyComponent()}</>
            )}
          </View>
          <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
            <Text style={{ marginVertical: 10, fontSize: 20, color: "black" }}>
              Parking Info
            </Text>
            <View style={[styles.titleHolder, { width: "100%", padding: 20 }]}>
              <Text style={{ color: "black" }}>About:</Text>
              <Text style={{ color: "black" }}>
                {parkingDetails.parkingDescription}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ParkingDetails;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F7F6F9",
    flex: 1,
  },
  headerHolder: {
    height: Dimensions.get("window").height / 20,
    width: Dimensions.get("window").width / 2.5,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: "#4E5256",
    marginHorizontal: 10,
  },
  imageHolder: {
    height: Dimensions.get("window").height / 4,
    // backgroundColor: 'white',
    marginVertical: 10,
    alignSelf: "center",
    width: "90%",
    borderRadius: 20,
    resizeMode: "contain",
    overflow: "hidden",
  },
  plotBlock: {
    height: Dimensions.get("window").height / 15,
    width: Dimensions.get("window").width / 8,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: Colors.PRIMARY,
    marginHorizontal: 10,
  },
  inactivePlotBlock: {
    height: Dimensions.get("window").height / 15,
    width: Dimensions.get("window").width / 8,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "grey",
    marginHorizontal: 10,
  },
  titleHolder: {
    height: Dimensions.get("window").height / 6.5,
    backgroundColor: "white",
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 20,
  },
  textArea: {
    // height: 100,
    borderRadius: 10,
    borderColor: "#F99025",
    borderWidth: 1,
    textAlignVertical: "top",
    paddingHorizontal: 10,
  },
});
