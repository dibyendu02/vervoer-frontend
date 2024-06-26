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
  Modal,
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
import { useFocusEffect } from "@react-navigation/native";
import CheckBox from "../../../../components/CheckBox";
const AvailableParkingSlot = ({ navigation }) => {
  const [loader, setLoader] = React.useState(false);
  const { width } = Dimensions.get("window");
  const [slots, setSlots] = React.useState([]);
  const [pushData, setPushData] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [bulkCapacity, setBulkCapacity] = React.useState("");
  const [bulkPrice, setBulkPrice] = React.useState("");

  useFocusEffect(
    React.useCallback(() => {
      getParkingData();
    }, [])
  );

  const getParkingData = async () => {
    setLoader(true);
    let data = await retrieveData("userdetails");
    let parkingData = await GETCALL("api/get-parking-data", data.token);
    let parkingId = parkingData.responseData.data._id;
    parkingSpacingList(parkingId);
  };

  const parkingSpacingList = async (parkingId) => {
    let data = await retrieveData("userdetails");
    let parkingSpacingList = await GETCALL(
      `api/parking-space-list?parkingId=${parkingId}&filterType=all`,
      data.token
    );
    if (parkingSpacingList.status == 200) {
      let list = parkingSpacingList.responseData.data;
      setSlots(list);
      // let tempSlots = [];
      // let slotObj = {};
      // if (list.length) {
      //   list.forEach(element => {
      //     slotObj.parkingSpaceName = element.parkingSpaceName;
      //     let spaces = [];
      //     for (let i = 0; i < element.parkingSpaceNumber; i++) {
      //       let spaceName = '';
      //       if (i < 10) {
      //         spaceName = `${element.parkingSpaceName}0${i + 1}`
      //       } else {
      //         spaceName = `${element.parkingSpaceName}${i + 1}`
      //       }
      //       let obj = {
      //         id: i + 1,
      //         spaceName
      //       }
      //       spaces.push(obj)
      //     }
      //     slotObj.spaces = spaces;
      //     tempSlots.push({ ...slotObj });
      //   });
      //   setSlots(tempSlots)
      // }
    }
    setLoader(false);
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

  const renderItems = ({ item, index }) => {
    if (item.empty) {
      return (
        <View
          style={{
            flex: 1,
            height: 80,
            borderRadius: 10,
            backgroundColor: "transparent",
          }}
        />
      );
    }
    return (
      <View
        key={index}
        style={{
          flex: 1,
          height: 80,
          alignItems: "center",
          paddingVertical: 5,
          justifyContent: "center",
          borderWidth: 1,
          borderColor: "gray",
          marginTop: 10,
        }}
      >
        <Text style={{ textAlign: "center", color: "#000000" }}>
          {item.spaceName}
        </Text>
      </View>
    );
  };

  const handleCapacityPrice = (key, text, index) => {
    let newArray = slots;
    if (key === "price") {
      newArray[index] = { ...newArray[index], parkingSpacePrice: text };
    } else {
      newArray[index] = { ...newArray[index], numberOfCarCapacity: text };
    }
    setPushData(newArray);
  };

  const handleBulkSubmit = async () => {
    setLoader(true);
    let data = await retrieveData("userdetails");
    let postData = slots.map((item) => {
      let newObj = {
        parkingSpaceId: item._id,
        numberOfCarCapacity: bulkCapacity,
        parkingSpacePrice: bulkPrice,
      };
      return newObj;
    });
    const finalPostData = {
      carSpaceObj: postData,
    };
    const sandipKaka = await POSTCALL(
      "api/save-parking-space-car-count",
      finalPostData,
      data.token
    );
    setLoader(false);
    setModalVisible(false);
    showMessage({
      message: `Merchant Profile Updated Successfully!`,
      type: "success",
      style: {
        alignItems: "center",
      },
      autoHide: false,
    });
    setTimeout(() => {
      hideMessage();
      navigation.navigate("ParkingDetails");
    }, 500);
  };

  const handleSubmit = async () => {
    setLoader(true);
    let data = await retrieveData("userdetails");
    let postData = pushData.map((item) => {
      let newObj = {
        parkingSpaceId: item._id,
        numberOfCarCapacity: item.numberOfCarCapacity,
        parkingSpacePrice: item.parkingSpacePrice,
      };
      return newObj;
    });
    const finalPostData = {
      carSpaceObj: postData,
    };
    const sandipKaka = await POSTCALL(
      "api/save-parking-space-car-count",
      finalPostData,
      data.token
    );
    setLoader(false);
    showMessage({
      message: `Merchant Profile Updated Successfully!`,
      type: "success",
      style: {
        alignItems: "center",
      },
      autoHide: false,
    });
    setTimeout(() => {
      hideMessage();
      navigation.navigate("ParkingDetails");
    }, 500);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#4C4C4C" }}>
      <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
      {/* <Spinner visible={loader} textContent={"Loading..."} /> */}
      <View style={styles.screen}>
        <Header />
        <ScrollView showsVerticalScrollIndicator={false}>
          {slots.map((slot, index) => {
            let {
              parkingSpaceName,
              status,
              parkingSpaceNumber,
              parkingSpacePrice,
            } = slot;
            return (
              status === "incomplete" && (
                <View style={{ margin: 20 }} key={index}>
                  <Text style={{ color: "#000", marginBottom: 10 }}>
                    Parking Space Name {parkingSpaceName}
                  </Text>
                  <TextInput
                    placeholder="Number Of Car Capacity"
                    placeholderTextColor={"gray"}
                    // value={pushData}
                    keyboardType="numeric"
                    style={{
                      height: 50,
                      borderWidth: 1,
                      borderColor: "gray",
                      color: "black",
                      marginBottom: 10,
                      padding: 16,
                      borderRadius: 10,
                    }}
                    onChangeText={(text) =>
                      handleCapacityPrice("capacity", text, index)
                    }
                  />
                  <TextInput
                    placeholder="Price"
                    placeholderTextColor={"gray"}
                    // value={slot.parkingSpacePrice}
                    keyboardType="numeric"
                    style={{
                      height: 50,
                      borderWidth: 1,
                      borderColor: "gray",
                      color: "black",
                      marginBottom: 10,
                      padding: 16,
                      borderRadius: 10,
                    }}
                    onChangeText={(text) =>
                      handleCapacityPrice("price", text, index)
                    }
                  />
                </View>
              )
            );
          })}
          <CustomButton
            customStyle={{
              backgroundColor: "#F99025",
              marginHorizontal: 16,
              marginBottom: 20,
              height: 50,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            buttonText={"Submit"}
            onPress={() => handleSubmit()}
            textStyle={{
              color: "#fff",
              fontSize: 20,
            }}
          />
          {/* <View style={{ zIndex: 10, flexDirection: 'column', marginTop: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  zIndex: -1,
                }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{ marginHorizontal: 10 }}
                  onPress={() => navigation.goBack()}>
                  <BackArrowIcon height={'30'} />
                </TouchableOpacity>
                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: Colors.PRIMARY,
                      marginBottom: 5,
                      alignSelf: 'center',
                      marginLeft: Dimensions.get('window').width / 8,
                    }}>
                    Available Parking Spaces
                  </Text>
                </View>
              </View>
            </View>
          </View> */}
          {/* <View style={[styles.subHeader, styles.shadow]}>
            <View style={styles.selectedFloor}>
              <Text>1st Floor</Text>
            </View>
            <View style={styles.unselectedFloor}>
              <Text>2nd Floor</Text>
            </View>
            <View style={styles.unselectedFloor}>
              <Text>3rd Floor</Text>
            </View>
          </View> */}
          {/* {slots.map((slot, index) => {
            return (
              <View key={index} style={{ marginBottom: 20 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 10,
                  }}>
                  <View style={styles.orangeBox}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>{slot.parkingSpaceName}</Text>
                  </View>
                  <Text style={{ marginLeft: 20 }}>Available Slots : {slot.spaces.length}</Text>
                </View>
                <FlatList
                  data={formatData([...slot.spaces],2)}
                  contentContainerStyle={{
                    marginHorizontal: 10,
                  }}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderItems}
                />
              </View>
            )
          })} */}

          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '90%',
              alignSelf: 'center',
              marginVertical: 10,
              //   bottom: 30,
              //   position: 'absolute',
            }}>
            <TouchableOpacity
            onPress={() => navigation.navigate("ParkingDetails")}
              style={[styles.footerButton, { backgroundColor: '#f99025' }]}>
              <Text style={{ color: '#fff', fontSize: 15 }}>
                Additional Charges
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.footerButton, { backgroundColor: '#5e5e60' }]}>
              <Text style={{ color: '#fff', fontSize: 15 }}>Scan QR Code</Text>
            </TouchableOpacity>
          </View> */}
        </ScrollView>
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
            style={{
              padding: 20,
              height: Dimensions.get("window").height / 2,
              width: Dimensions.get("window").width / 1.25,
              backgroundColor: "#fff",
              borderRadius: 20,
            }}
          >
            <View style={{ margin: 20 }}>
              <Text
                style={{
                  color: "#000",
                  marginBottom: 10,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Parking Space for all slots
              </Text>
              <TextInput
                placeholder="Number Of Car Capacity"
                value={bulkCapacity}
                keyboardType="numeric"
                style={{
                  height: 50,
                  borderWidth: 1,
                  marginVertical: 10,
                  borderColor: "gray",
                  color: "black",
                  marginBottom: 10,
                  padding: 16,
                  borderRadius: 10,
                }}
                onChangeText={(text) => setBulkCapacity(text)}
              />
              <TextInput
                placeholder="Price"
                value={bulkPrice}
                keyboardType="numeric"
                style={{
                  height: 50,
                  borderWidth: 1,
                  borderColor: "gray",
                  color: "black",
                  marginVertical: 10,
                  marginBottom: 10,
                  padding: 16,
                  borderRadius: 10,
                }}
                onChangeText={(text) => setBulkPrice(text)}
              />
              <CustomButton
                customStyle={{
                  backgroundColor: "#F99025",
                  marginHorizontal: 16,
                  // marginBottom: 20,
                  marginTop: 20,
                  // bottom: 0,
                  height: 50,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                buttonText={"Submit"}
                onPress={() => handleBulkSubmit()}
                textStyle={{
                  color: "#fff",
                  fontSize: 20,
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default AvailableParkingSlot;

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
