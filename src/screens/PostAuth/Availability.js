import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import FocusAwareStatusBar from "../../components/FocusAwareStatusBar";
import { Colors } from "../../global";
import Header from "../../components/Header";
import BackArrowIcon from "../../assets/back.svg";
import TextCapsule from "../../components/TextCapsule";
import { useFocusEffect } from "@react-navigation/native";
import { GETCALL } from "../../global/server";
import CheckBox from "../../components/CheckBox";
import CustomButton from "../../components/CustomButton";
import Spinner from "react-native-loading-spinner-overlay";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  editDryCleanerAvailability,
  removeDryCleanerAvailability,
  setAllDayAvailabile,
  setDryCleanerAvailability,
  setDryCleanerProfile,
} from "../../state/reducers/DrycleanerReducer";

const { width, height } = Dimensions.get("screen");

const Availability = ({ navigation }) => {
  const disPatch = useDispatch();
  const { dryCleanerProfile } = useSelector((state) => state.drycleanerreducer);

  const [dayList, setDayList] = React.useState([]);
  const [timeList, setTimeList] = React.useState([]);
  const [endTimeList, setEndTimeList] = React.useState([]);
  const [selectAll, toggleCheckBox] = React.useState(false);

  useEffect(() => {
    getAlldayList();
    getAllTimeList();
  }, []);

  const onDaySelect = async (dayIndex = null) => {
    let temp = [...dayList];
    let tempReducer = JSON.parse(JSON.stringify(dryCleanerProfile));
    let obj = {
      day: temp[dayIndex].daySlug,
      startTime: "9:00 AM",
      endTime: "5:00 PM",
    };
    let index = tempReducer.availability.findIndex(
      (single, index) => single.day == obj.day
    );
    if (index == -1) {
      disPatch(setDryCleanerAvailability(obj));
    } else {
      disPatch(removeDryCleanerAvailability(index));
    }
  };

  const onStartTimeSelect = (day, startTime) => {
    let tempReducer = JSON.parse(JSON.stringify(dryCleanerProfile));
    let selectedDays = tempReducer.availability;
    let dayIndex = selectedDays.findIndex(
      (selectedDay, index) => selectedDay.day == day.day
    );
    if (dayIndex != -1) {
      if (selectedDays[dayIndex].endTime == "") {
        selectedDays[dayIndex].startTime = startTime.time12H;
        disPatch(editDryCleanerAvailability(selectedDays));
      } else {
        var start = moment(startTime.time12H, "HH:mm a");
        var end = moment(selectedDays[dayIndex].endTime, "HH:mm a");
        var duration = moment.duration(end.diff(start));
        var diff = parseInt(duration.asHours());
        if (diff <= 0) {
          alert("Invalid time");
        } else {
          selectedDays[dayIndex].startTime = startTime.time12H;
          disPatch(editDryCleanerAvailability(selectedDays));
        }
      }
    }
  };
  const onEndTimeSelect = (day, endTime) => {
    let tempReducer = JSON.parse(JSON.stringify(dryCleanerProfile));
    let selectedDays = tempReducer.availability;
    let dayIndex = selectedDays.findIndex(
      (selectedDay, index) => selectedDay.day == day.day
    );
    if (dayIndex != -1) {
      if (selectedDays[dayIndex].startTime == "") {
        selectedDays[dayIndex].endTime = endTime.time12H;
        disPatch(editDryCleanerAvailability(selectedDays));
      } else {
        var start = moment(selectedDays[dayIndex].startTime, "HH:mm a");
        var end = moment(endTime.time12H, "HH:mm a");
        var duration = moment.duration(end.diff(start));
        var diff = parseInt(duration.asHours());
        if (diff <= 0) {
          alert("Invalid time");
        } else {
          selectedDays[dayIndex].endTime = endTime.time12H;
          disPatch(editDryCleanerAvailability(selectedDays));
        }
      }
    }
  };

  useEffect(() => {
    if (dayList && dayList.filter((e) => e.selected).length == dayList.length) {
      toggleCheckBox(true);
    } else {
      toggleCheckBox(false);
    }
  }, [dayList]);

  const getAlldayList = async () => {
    let response = await GETCALL("api/day-list");
    if (response.status == 200) {
      setDayList(response.responseData);
    }
  };

  const getAllTimeList = async () => {
    let response = await GETCALL("api/time-list");
    if (response.status == 200) {
      setTimeList(JSON.parse(JSON.stringify(response.responseData)));
      setEndTimeList(JSON.parse(JSON.stringify(response.responseData)));
    }
  };

  const toggleAllDay = (select) => {
    let temp = [...dayList];
    if (select) {
      let selectAll = [];
      temp.forEach((single, index) => {
        selectAll.push({
          day: single.daySlug,
          startTime: "9:00 AM",
          endTime: "5:00 PM",
        });
      });
      disPatch(setAllDayAvailabile(selectAll));
    } else {
      disPatch(setAllDayAvailabile([]));
    }
  };

  const goToAcceptedItems = () => {
    navigation.navigate("AcceptedItems");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#4C4C4C" }}>
      <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
      <View style={styles.screen}>
        <Header />
        <ScrollView
          keyboardShouldPersistTaps={"always"}
          contentContainerStyle={{ flexGrow: 1 }}
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
          <View
            style={{
              padding: 20,
              backgroundColor: Colors.WHITE,
              margin: 20,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: Colors.BLACK, fontWeight: "bold" }}>
              Select Day(s) of The Week Available
            </Text>
            <View style={{ height: 10 }} />
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              {dayList.map((day, index) => {
                return (
                  <TextCapsule
                    key={index}
                    onPress={() => {
                      onDaySelect(index);
                    }}
                    capsuleStyle={{
                      height: 60,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor:
                        dryCleanerProfile.availability.findIndex(
                          (single) => single.day == day.dayName.toLowerCase()
                        ) != -1
                          ? "#F99025"
                          : "#FDF1E5",
                      width: 50,
                      borderRadius: 10,
                      marginRight: 10,
                    }}
                    text={day.dayName.substring(0, 3)}
                    textStyle={{
                      color: day.selected ? Colors.WHITE : Colors.BLACK,
                    }}
                  />
                );
              })}
            </ScrollView>

            {/* <View style={{ height: 30 }} />

                        <Text style={{ color: Colors.BLACK, fontWeight: 'bold' }}>Select Availability Start-Time</Text> */}
            <View style={{ height: 10 }} />
            {dryCleanerProfile.availability.map((day, parentIndex) => {
              return (
                <View key={parentIndex}>
                  <Text
                    style={{
                      fontSize: 20,
                      marginVertical: 20,
                      textTransform: "capitalize",
                      color: Colors.BLACK,
                      fontWeight: "bold",
                    }}
                  >
                    {day.day}
                  </Text>
                  <View style={{ height: 30 }} />

                  <Text style={{ color: Colors.BLACK, fontWeight: "bold" }}>
                    Select Availability Start-Time
                  </Text>
                  <View style={{ height: 10 }} />
                  <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    {[...timeList].map((time, index) => {
                      return (
                        <TextCapsule
                          key={index}
                          onPress={() => {
                            onStartTimeSelect(day, time);
                          }}
                          capsuleStyle={{
                            height: 30,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor:
                              day.startTime == time.time12H
                                ? "#F99025"
                                : "#5D5F60",
                            paddingHorizontal: 10,
                            borderRadius: 5,
                            marginRight: 10,
                          }}
                          text={time.time12H}
                          textStyle={{
                            color:
                              day.startTime == time.time12H
                                ? Colors.WHITE
                                : Colors.BLACK,
                          }}
                        />
                      );
                    })}
                  </ScrollView>
                  <View style={{ height: 30 }} />

                  <Text style={{ color: Colors.BLACK, fontWeight: "bold" }}>
                    Select Availability End-Time
                  </Text>
                  <View style={{ height: 10 }} />
                  <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    {[...endTimeList].map((time, index) => {
                      return (
                        <TextCapsule
                          key={index}
                          onPress={() => {
                            onEndTimeSelect(day, time);
                          }}
                          capsuleStyle={{
                            height: 30,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor:
                              day.endTime == time.time12H
                                ? "#F99025"
                                : "#5D5F60",
                            paddingHorizontal: 10,
                            borderRadius: 5,
                            marginRight: 10,
                          }}
                          text={time.time12H}
                          textStyle={{
                            color:
                              day.endTime == time.time12H
                                ? Colors.WHITE
                                : Colors.BLACK,
                          }}
                        />
                      );
                    })}
                  </ScrollView>
                  <View style={{ height: 20 }} />
                </View>
              );
            })}

            <View style={{ alignSelf: "flex-end" }}>
              <CheckBox
                selected={selectAll}
                onPress={() => {
                  if (selectAll) {
                    toggleAllDay(false);
                  } else {
                    toggleAllDay(true);
                  }

                  toggleCheckBox((prev) => !prev);
                }}
              />
            </View>
            <View style={{ height: height * 0.1 }} />
            {dryCleanerProfile.availability.length > 0 && (
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
                  // navigation.navigate('AcceptedItems');
                  goToAcceptedItems();
                }}
                textStyle={{
                  color: Colors.WHITE,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              />
            )}
            <View style={{ height: 10 }} />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Availability;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#4C4C4C",
    flex: 1,
  },
});
