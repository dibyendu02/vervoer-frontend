/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../global';

const { height, width } = Dimensions.get('window');

const RoleScreen = ({ imageUrl, text, role, city }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        // console.log("role", role, city)
        if (role == 'MerchantMenu' && city) {
          navigation.navigate(role)
        } else if (role == "Driver") {
          Alert.alert("", "Coming soon")
        } else {
          navigation.navigate(role)
        }
      }}
      style={styles.container}>
      <View
        style={{
          backgroundColor: text === 'User' ? Colors.PRIMARY : 'transparent',
          padding: text === 'User' ? 15 : 0,
          borderRadius: 50,
          alignItems: 'center',
        }}>
        <Image
          source={imageUrl}
          style={{
            height: text === 'User' ? 30 : 40,
            width: text === 'User' ? 30 : 40,
            resizeMode: 'contain',
          }}
        />
      </View>
      <Text style={{ fontSize: 16, color: '#000000', marginTop: 10 }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default RoleScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 30,
    paddingHorizontal: 40,
    width: width - 40,
    borderRadius: 20,
    elevation: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
});
