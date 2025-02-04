import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Animated,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import React from "react";
import FocusAwareStatusBar from "../../../../components/FocusAwareStatusBar";
import { Colors } from "../../../../global";
import Header from "../../../../components/Header";
import BackArrowIcon from "../../../../assets/back.svg";
import { GETCALL, POSTCALL } from "../../../../global/server";
import CustomButton from "../../../../components/CustomButton";
import { retrieveData } from "../../../../utils/Storage";
import Spinner from "react-native-loading-spinner-overlay";
import { hideMessage, showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "react-native-gesture-handler";
import DashedLine from "react-native-dashed-line";
import { useFocusEffect } from "@react-navigation/native";
const SlotDetailPage = ({ navigation, route }) => {
  const [loader, setLoader] = React.useState(false);
  const { width } = Dimensions.get("window");
  const [slots, setSlots] = React.useState([]);
  const mainItem = route.params;

  useFocusEffect(
    React.useCallback(() => {
      getParkingData();
    }, [])
  );

  const getParkingData = async () => {
    let data = await retrieveData("userdetails");
    GETCALL(`/car-spot-list?parkingSpaceId=${mainItem._id}`, data.token).then(
      (res) => {
        setSlots(res?.responseData?.data);
        //   if (res && res.responseData) {
        //     setParKingDetails(res?.responseData?.data);
        //     getParkingList(res?.responseData?.data._id);
        //   }
      }
    );
  };

  const formatData = (dataList, numColumns) => {
    const totalRows = Math.floor(dataList.length / numColumns);
    let totalLastRow = dataList.length - totalRows * numColumns;
    while (totalLastRow !== numColumns && totalLastRow !== 0) {
      dataList.push({ key: `blank-${totalLastRow}`, empty: true });
      totalLastRow++;
    }
    return dataList;
  };

  const setActiveStatus = async (id) => {
    setLoader(true);
    let data = await retrieveData("userdetails");
    const postData = {
      carSpotId: id,
    };
    POSTCALL(`active-inactive-car-spot`, postData, data.token)
      .then((res) => {
        setLoader(false);
        getParkingData();
        // setParkingSlotsList(res?.responseData?.data);
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const renderItems = ({ item, index }) => {
    // if(index < slots.length - 1)÷
    if (item.empty) {
      return <></>;
    } else {
      return (
        <TouchableOpacity
          key={index}
          onLongPress={() => {
            if (item.status !== "booked" && index < slots.length - 1) {
              setActiveStatus(item._id);
            }
          }}
          style={
            item.status === "empty" || item.status === "booked"
              ? styles.eachBlock
              : styles.inactiveEachBlock
          }
        >
          {item.status === "booked" ? (
            <View style={{ alignSelf: "center" }}>
              <Image source={require("../../../../assets/Parking.png")} />
            </View>
          ) : (
            <Text style={{ textAlign: "center", color: "#000000" }}>
              {item.spotName}
            </Text>
          )}
        </TouchableOpacity>
      );
    }
  };

  const addParkingSpace = async (parkingId) => {
    setLoader(true);
    let data = await retrieveData("userdetails");
    const postData = {
      parkingSpaceId: mainItem._id,
    };
    POSTCALL(`create-new-car-space`, postData, data.token)
      .then((res) => {
        setLoader(false);
        getParkingData();
        // setParkingSlotsList(res?.responseData?.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
        setLoader(false);
      });
  };

  const ListLastComponent = () => {
    return (
      <TouchableOpacity
        onPress={() => addParkingSpace()}
        style={[
          styles.plotBlock,
          {
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            marginVertical: 10,
          },
        ]}
      >
        <Text style={{ fontSize: 35, fontWeight: "bold", color: "white" }}>
          +
        </Text>
      </TouchableOpacity>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <View style={{alignSelf: 'center', justifyContent: 'center', marginVertical: 20}}>
        <Text>No Items Found</Text>
      </View>
    )
  }

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
                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: Colors.PRIMARY,
                      marginBottom: 5,
                      alignSelf: "center",
                      marginLeft: Dimensions.get("window").width / 8,
                    }}
                  >
                    Available Parking Spaces
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 10,
              }}
            >
              {/* <View style={styles.orangeBox}>
                <Text style={{ color: "#fff", fontSize: 16 }}>
                  {slots.parkingSpaceName}
                </Text>
              </View> */}
              <Text style={{ marginLeft: 20 }}>
                {/* Available Slots : {slot.spaces.length} */}
              </Text>
            </View>
            <FlatList
              data={formatData(slots, 2)}
              contentContainerStyle={{
                marginHorizontal: 10,
              }}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItems}
              ListFooterComponent={ListLastComponent}
              ListEmptyComponent={ListEmptyComponent}
            />
          </View>

          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "90%",
              alignSelf: "center",
              marginVertical: 10,
              //   bottom: 30,
              //   position: 'absolute',
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("ParkingDetails")}
              style={[styles.footerButton, { backgroundColor: "#f99025" }]}
            >
              <Text style={{ color: "#fff", fontSize: 15 }}>
                Additional Charges
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.footerButton, { backgroundColor: "#5e5e60" }]}
            >
              <Text style={{ color: "#fff", fontSize: 15 }}>Scan QR Code</Text>
            </TouchableOpacity>
          </View> */}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SlotDetailPage;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  textArea: {
    height: 100,
    borderRadius: 10,
    borderColor: "#F99025",
    borderWidth: 1,
    textAlignVertical: "top",
    paddingHorizontal: 10,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  subHeader: {
    width: Dimensions.get("window").width / 1.15,
    height: Dimensions.get("window").height / 12,
    borderRadius: 40,
    backgroundColor: "white",
    alignSelf: "center",
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  plotBlock: {
    height: Dimensions.get("window").height / 15,
    width: Dimensions.get("window").width / 8,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: Colors.PRIMARY,
    marginHorizontal: 10,
  },
  selectedFloor: {
    width: Dimensions.get("window").width / 3.75,
    height: Dimensions.get("window").height / 15,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff0e1",
  },
  unselectedFloor: {
    width: Dimensions.get("window").width / 3.75,
    height: Dimensions.get("window").height / 15,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  orangeBox: {
    width: Dimensions.get("window").width / 8,
    height: Dimensions.get("window").height / 16,
    backgroundColor: "#fa9310",
    borderRadius: 15,
    // marginLeft:
    justifyContent: "center",
    alignItems: "center",
  },
  floorBox: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#eceded",
    // backgroundColor: 'red',
    height: Dimensions.get("window").height / 2,
    width: Dimensions.get("window").width / 1.2,
    marginTop: Dimensions.get("window").height / 55,
  },
  eachBlock: {
    flex: 1,
    height: 80,
    alignItems: "center",
    paddingVertical: 5,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "grey",
    marginTop: 10,
  },
  inactiveEachBlock: {
    flex: 1,
    height: 80,
    alignItems: "center",
    paddingVertical: 5,
    backgroundColor: "#a6a6a6",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "grey",
    marginTop: 10,
  },
  leftContainer: {
    borderColor: "#eceded",
    borderWidth: 1,
    borderLeftWidth: 0,
    height: Dimensions.get("window").height / 10,
    width: Dimensions.get("window").width / 2.4,
    justifyContent: "center",
    alignItems: "center",
  },
  rightContainer: {
    borderColor: "#eceded",
    borderWidth: 1,
    borderRightWidth: 0,
    height: Dimensions.get("window").height / 10,
    width: Dimensions.get("window").width / 2.4,
    justifyContent: "center",
    alignItems: "center",
  },
  footerButton: {
    height: Dimensions.get("window").height / 15,
    width: Dimensions.get("window").width / 2.5,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    // right: 30,
    // bottom: 30,
    // position: 'absolute',
  },
});
