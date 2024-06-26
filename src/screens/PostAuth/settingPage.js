import React from "react";
import {
  View,
  Alert,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  Linking,
  Button,
} from "react-native";
import { BLACK } from "../../global/colors";

function SettingPage(props) {
  return (
    <SafeAreaView>
      <View style={styles.containerSettingPage}>
        <Text style={styles.textHeading}>Settings</Text>
      </View>
      <View>
        <Text style={styles.paymentText}>
        </Text>
        <Text style={styles.informationText}>
          You can change your app setting here
        </Text>
        <Text
          style={styles.NotificationButton}
          title="Open Settings"
          onPress={() => {
            Platform.OS === "ios"
              ? Linking.openSettings()
              : Linking.openSettings();
          }}
        >
          Go to Settings
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerSettingPage: {
    marginTop: 60,
    fontSize: 25,
    backgroundColor: "orange",
    padding: 20,
  },
  textHeading: {
    color: "white",
    fontSize: 22,
    fontWeight: "semi-bold",
  },
  paymentText: {
    padding: 0,
    fontSize: 16,
    paddingBottom: 5,
    lineHeight: 23,
  },
  informationText: {
    padding: 20,
    lineHeight: 23,
    paddingTop: 0,
    color: "orange",
  },
  knowMoreText: {
    padding: 20,
    color: "orange",
  },
  NotificationButton: {
    backgroundColor: "orange",
    color: "white",
    width: "50%",
    marginLeft: 20,
    padding: 10,
    textAlign: "center",
    borderRadius: 50,
    overflow: "hidden",
  },
});

export default SettingPage;
