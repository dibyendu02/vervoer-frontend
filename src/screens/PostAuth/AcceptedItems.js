import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import FocusAwareStatusBar from "../../components/FocusAwareStatusBar";
import { Colors } from "../../global";
import Header from "../../components/Header";
import BackArrowIcon from "../../assets/back.svg";
import { useFocusEffect } from "@react-navigation/native";
import { GETCALL, POSTCALL } from "../../global/server";
import CheckBox from "../../components/CheckBox";
import CustomButton from "../../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import {
  removeDryCleanerAcceptedItems,
  setAllItemsAcceptable,
  setDryCleanerAcceptedItems,
} from "../../state/reducers/DrycleanerReducer";

const AcceptedItems = ({ navigation }) => {
  const [selectAll, toggleCheckBox] = React.useState(false);
  const { dryCleanerProfile } = useSelector((state) => state.drycleanerreducer);
  const NUM_OF_COLUMNS = 4;
  const disPatch = useDispatch();
  const [itemList, setItemList] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getAllItemList();
    }, [])
  );

  useEffect(() => {
    if (
      itemList &&
      itemList.filter((e) => e.selected).length == itemList.length
    ) {
      toggleCheckBox(true);
    } else {
      toggleCheckBox(false);
    }
  }, [itemList]);

  const formatData = (dataList, numColumns) => {
    let newDataList = [...dataList];
    const totalRows = Math.floor(newDataList.length / numColumns);
    let totalLastRow = newDataList.length - totalRows * numColumns;
    while (totalLastRow !== numColumns && totalLastRow !== 0) {
      newDataList.push({ key: `blank-${totalLastRow}`, empty: true });
      totalLastRow++;
    }
    return newDataList;
  };

  const getAllItemList = async () => {
    let response = await GETCALL("api/accept-item-list");

    if (response.status == 200) {
      setItemList(response.responseData);
    }
  };

  const renderItems = ({ item, index }) => {
    if (item.empty) {
      return (
        <View
          style={{
            flex: 1,
            marginRight: 15,
            marginBottom: 15,
            height: 30,
            borderRadius: 5,
            overflow: "hidden",
            backgroundColor: "transparent",
          }}
        />
      );
    }
    return (
      <TouchableOpacity
        onPress={() => {
          let tempReducer = JSON.parse(JSON.stringify(dryCleanerProfile));
          let index = tempReducer.acceptItems.findIndex(
            (single, index) => single.itemName == item.itemSlug
          );
          if (index == -1) {
            let obj = {
              itemName: item.itemSlug,
              attributes: [
                {
                  name: "",
                  price: "",
                },
              ],
            };
            disPatch(setDryCleanerAcceptedItems(obj));
          } else {
            disPatch(removeDryCleanerAcceptedItems(index));
          }
        }}
        style={{
          flex: 1,
          marginRight: 15,
          marginBottom: 15,
          height: 30,
          borderRadius: 5,
          overflow: "hidden",
          justifyContent: "center",
          backgroundColor:
            dryCleanerProfile.acceptItems.findIndex(
              (single, index) =>
                single.itemName.toLowerCase() == item.itemSlug.toLowerCase()
            ) != -1
              ? "#F99025"
              : "#5D5F60",
          alignItems: "center",
        }}
      >
        <Text adjustsFontSizeToFit style={{ color: Colors.WHITE }}>
          {item.itemName}
        </Text>
      </TouchableOpacity>
    );
  };

  const toggleAllItems = (select) => {
    let temp = [...itemList];
    if (select) {
      let selectAll = [];
      temp.forEach((single, index) => {
        selectAll.push({
          itemName: single.itemSlug,
          attributes: [
            {
              name: "",
              price: "",
            },
          ],
        });
      });
      disPatch(setAllItemsAcceptable(selectAll));
    } else {
      disPatch(setAllItemsAcceptable([]));
    }
  };

  const goToAcceptedItemPrice = () => {
    navigation.navigate("AcceptedItemPrice");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#4C4C4C" }}>
      <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
      <View style={styles.screen}>
        <Header />
        <View style={{ marginHorizontal: 20 }}>
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
                  style={{}}
                  onPress={() => navigation.goBack()}
                >
                  <BackArrowIcon height={"30"} />
                </TouchableOpacity>
                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: Colors.WHITE,
                      marginBottom: 5,
                    }}
                  >
                    Dry Cleaner Merchant Details
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <ScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.WHITE,
              margin: 20,
              borderRadius: 20,
              padding: 20,
            }}
          >
            <Text
              style={{
                color: Colors.BLACK,
                fontSize: 20,
              }}
            >
              Items You Accept
            </Text>
            <View style={{ height: 10 }}></View>
            <View style={{ minHeight: 200 }}>
              <FlatList
                data={formatData(itemList, NUM_OF_COLUMNS)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItems}
                numColumns={NUM_OF_COLUMNS}
                nestedScrollEnabled={true}
              />
            </View>
            <View style={{ alignSelf: "flex-end" }}>
              <CheckBox
                selected={
                  itemList.length == dryCleanerProfile.acceptItems.length
                }
                onPress={() => {
                  if (selectAll) {
                    toggleAllItems(false);
                  } else {
                    toggleAllItems(true);
                  }
                  toggleCheckBox((prev) => !prev);
                }}
              />
            </View>
            <View style={{ height: 20 }} />
            {dryCleanerProfile.acceptItems.length > 0 && (
              <CustomButton
                customStyle={{
                  backgroundColor: "#F99025",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 50,
                  borderRadius: 25,
                }}
                buttonText={"Next"}
                onPress={() => {
                  goToAcceptedItemPrice();
                }}
                textStyle={{
                  color: Colors.WHITE,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AcceptedItems;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#4C4C4C",
    flex: 1,
  },
  scrollWrapper: {
    flex: 1,
    marginTop: 30,
    paddingTop: 5,
    overflow: "hidden",
  },
});
