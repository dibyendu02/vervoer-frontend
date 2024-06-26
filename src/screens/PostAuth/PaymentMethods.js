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

function PaymentMethods(props) {
  return (
    <SafeAreaView>
      <View style={styles.containerPaymentMethods}>
        <Text style={styles.textHeading}>Payment Methods</Text>
      </View>
      <View>
        <Text style={styles.paymentText}>We only prefer online payments.</Text>
        <Text style={styles.informationText}>
          You can pay via your cards or Net banking. We accept almost all debit
          and credit cards for transaction. We do not prefer cash after service
          to save time and efforts. We don't take your any personal Information
          with us like card number, pin, etc. We use Stripe Payment gateway for
          secure payments. If you find any problem please contact us at
          joward2001@vervoerapp.com.
        </Text>
        <Text
          onPress={() => Linking.openURL("https://stripe.com/")}
          style={styles.knowMoreText}
        >
          Know More about Stripe?
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerPaymentMethods: {
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
  },
  informationText: {
    padding: 20,
    lineHeight: 23,
    color: "black",
  },
  knowMoreText: {
    padding: 20,
    color: "orange",
  },
});

export default PaymentMethods;
