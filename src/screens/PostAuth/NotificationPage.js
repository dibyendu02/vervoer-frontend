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

function NotificationPage(props) {
  return (
    <SafeAreaView>
      <View style={styles.containerNotificationPage}>
        <Text style={styles.textHeading}>Notification</Text>
      </View>
      <View>
        
        <Text style={styles.paymentText}>
         This application will only send important notification regarding your bookings and payments. We will not spam your notification.
          {"\n"}
          {"\n"}
        </Text>
        <Text style={styles.informationText}>
          You can change your notification setting here.
        </Text>
        <Text
         style={styles.NotificationButton}
          title="Open Settings"
          onPress={() => {
            Platform.OS === "ios"
              ? Linking.openSettings()
              : Linking.openSettings();
          }}
        >Go to Notification</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerNotificationPage: {
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
    padding: 20,
    fontSize: 16,
    paddingBottom: 5,
    lineHeight:23
  },
  informationText: {
    padding: 20,
    lineHeight: 23,
    paddingTop: 0,
    color:"orange"
  },
  knowMoreText: {
    padding: 20,
    color: "orange",
  },
  NotificationButton:{
   backgroundColor:"orange",
   color:'white',
   width:'50%',
   marginLeft:20,
   padding:10,
   textAlign:'center',
   borderRadius:50,
   overflow:"hidden"
   
  }
});

export default NotificationPage;
