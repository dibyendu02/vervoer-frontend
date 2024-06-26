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
} from "react-native";
import { BLACK } from "../../global/colors";

function ContactUs(props) {
  return (
    <SafeAreaView>
      <View style={styles.containerContactUs}>
        <Text style={styles.textHeading}>Contact</Text>
      </View>
      <View>
        <Text style={styles.paymentText}>
          We are always happy to hear from our customers
        </Text>
        <Text style={styles.informationText}>
          You can contact us on the mention email id for any questions
        </Text>
        <Text
          onPress={() => Linking.openURL("mailto:joward2001@vervoerapp.com.")}
          style={styles.knowMoreText}
        >
          joward2001@vervoerapp.com.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerContactUs: {
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
    fontSize: 17,
    color: "orange",
    paddingBottom: 5,
  },
  informationText: {
    padding: 20,
    lineHeight: 23,
    color: "black",
  },
  knowMoreText: {
    padding: 20,
    color: "orange",
    paddingTop: 0,
  },
});

export default ContactUs;
