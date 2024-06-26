import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
  Image,
} from "react-native";
import FocusAwareStatusBar from "../../components/FocusAwareStatusBar";
import { Colors } from "../../global";
import BackArrowIcon from "../../assets/back.svg";
import { useFocusEffect } from "@react-navigation/native";
import { retrieveData } from "../../utils/Storage";
import { GETCALL, POSTCALL } from "../../global/server";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const UserItem = ({ user, order_id, closeModal }) => {
  const bookDeliveryBoy = async () => {
    let data = await retrieveData("userdetails");
    console.log(data);
    let payload = {
      orderId: order_id,
      assignedTo: user._id,
      bookingStatus: "pending",
      assignedBy: data.user._id,
    };
    console.log("working");
    let response = await POSTCALL("api/delivery/create-delivery", payload);
    console.log("working 1");
    if (response.responseData.success) {
      closeModal();
    }
  };
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        borderRadius: 5,
      }}
      onPress={() => {
        bookDeliveryBoy();
      }}
    >
      <View style={styles.userItem}>
        <Image
          source={{
            uri: "https://st5.depositphotos.com/1915171/64699/v/450/depositphotos_646996546-stock-illustration-user-profile-icon-avatar-person.jpg",
          }}
          style={styles.avatar}
        />
        <Text
          style={[
            styles.phoneNumber,
            { color: "red", fontSize: 24, fontWeight: "bold" },
          ]}
        >
          {user.phoneNumber}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const DeliveryModal = ({
  allUsers,
  order_id,
  openModal,
  closeModal,
}) => {
  return (
    <>
      {/* delivery Modal  */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={true}
        onRequestClose={closeModal}
      >
        <View
          style={{
            border: 2,
            borderColor: "red",
            flex: 1,
            marginTop: 42,
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
              width: "90%",
              marginLeft: 20,
            }}
          >
            <TouchableOpacity onPress={closeModal}>
              <FontAwesome name="times" size={24} color="#f57d7d" />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 8 }}>
            <ScrollView
              style={{
                borderWidth: 1,
                borderColor: "#615b5b",
                width: "90%",
                marginLeft: 20,
                borderRadius: 12,
                marginBottom: 15,
              }}
            >
              {allUsers?.map((item, index) => (
                <UserItem
                  key={index}
                  user={item}
                  order_id={order_id}
                  closeModal={closeModal}
                />
              ))}
            </ScrollView>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
      </Modal>
    </>
  );
};

export const DeliveryBoyShowModal = ({
  allUsers,
  order_id,
  openModal,
  closeModal,
}) => {
  const [delivery, setDelivery] = React.useState([
    {
      _id: "123",
      orderId: "456",
      assignedTo: "John",
      bookingStatus: "Confirmed",
      created_at: "2023-05-20",
      updated_at: "2023-05-21",
      __v: 1,
    },
  ]);
  const fetchAllDeliveryBoyDetails = async () => {
    let data = await retrieveData("userdetails");
    if (data && data.token) {
      let response = await POSTCALL("api/delivery/fetch-delivery-all");
      if (response.responseData.success) {
        const delivery = response?.responseData?.data?.model;
        delivery.filter((delivery) => delivery.orderId === order_id);
        setDelivery(
          delivery.filter((delivery) => delivery.orderId === order_id)
        );
      }
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchAllDeliveryBoyDetails();
    }, [])
  );
  return (
    <>
      {/* delivery Modal  */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={true}
        onRequestClose={closeModal}
      >
        <View
          style={{
            border: 2,
            borderColor: "red",
            flex: 1,
            marginTop: 42,
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
              width: "90%",
              marginLeft: 20,
            }}
          >
            <TouchableOpacity onPress={closeModal}>
              <FontAwesome name="times" size={24} color="#f57d7d" />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 8 }}>
            <ScrollView
              style={{
                borderWidth: 1,
                borderColor: "#615b5b",
                width: "90%",
                marginLeft: 20,
                borderRadius: 12,
                marginBottom: 15,
                display: "flex",
                flexDirection: "column",
                padding: 10,
              }}
            >
              {delivery.map((single, index) => {
                return (
                  <View key={index} style={{ marginBottom: 10 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.BLACK,
                          fontSize: 16,
                          fontWeight: "bold",
                          textTransform: "capitalize",
                        }}
                      >
                        {allUsers?.find((user) => {
                          return user._id === single?.assignedTo;
                        })?.phoneNumber || single?.assignedTo}
                      </Text>
                      <View style={{ width: 20 }} />
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color:
                              single?.bookingStatus === "confirmed"
                                ? "blue"
                                : "red",
                          }}
                        >
                          {single?.bookingStatus}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
      </Modal>
    </>
  );
};

// export default DeliveryModal;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F7F6F9",
    flex: 1,
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
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#615b5b",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userList: {
    flex: 1,
  },
});

// import React, { useState } from 'react';

// const MyComponent = () => {
//   const [myArray, setMyArray] = useState([
//     { id: 1, name: 'Object 1' },
//     { id: 2, name: 'Object 2' },
//     { id: 3, name: 'Object 3' },
//   ]);

//   const updateObject = (objectId, newName) => {
//     setMyArray(prevArray => {
//       const updatedArray = prevArray.map(obj => {
//         if (obj.id === objectId) {
//           return { ...obj, name: newName };
//         }
//         return obj;
//       });
//       return updatedArray;
//     });
//   };

//   return (
//     <div>
//       {myArray.map(obj => (
//         <div key={obj.id}>{obj.name}</div>
//       ))}
//       <button onClick={() => updateObject(2, 'Updated Object 2')}>Update Object 2</button>
//     </div>
//   );
// };

// export default MyComponent;
