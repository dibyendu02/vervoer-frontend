import {ScrollView, StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import React from 'react';
// import ImageSlider from '../../components/ImageSlider';
import ImageSlider from '../../components/ImageSlider';
import RoleScreen from '../../components/RoleScreen';
import Header from '../../components/Header';
import {Colors} from '../../global';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { useFocusEffect } from '@react-navigation/native';
import { retrieveData } from '../../utils/Storage';
import { GETCALL } from '../../global/server';
import Spinner from 'react-native-loading-spinner-overlay';

const HomeScreen = () => {

  const [loader, setLoader] = React.useState(false);

  const [profileDetails, setProfileDeatils] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "India",
    state: "",
    city: "",
    pinCode: "",
    image: ""
  })

  useFocusEffect(React.useCallback(()=>{
    fetchUserDetails();
  },[]));

  const fetchUserDetails = async () => {
    setLoader(true);
    let data = await retrieveData('userdetails');
    if (data && data.token) {
      let response = await GETCALL('api/get-my-profile', data.token);
      setLoader(false);
      let userDetails = response.responseData.data.user;
      console.log(JSON.stringify(userDetails, null, 4));
      setProfileDeatils({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber,
        country: userDetails.country,
        state: userDetails.state,
        city: userDetails.city,
        pinCode: userDetails.pinCode,
        image: userDetails.image
      })
    }
  }


  return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: Colors.WHITE}}>
      <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
      {/* <Spinner visible={loader} /> */}
      <View style={styles.screen}>
        <Header />
        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageSlider />
          <View
            style={{
              marginVertical: 20,
              paddingHorizontal: 20,
              alignItems: 'center',
            }}>
            <RoleScreen
              text="User"
              imageUrl={require('../../assets/User.png')}
              role="UserMenu"
              // role="Users"
            />
            <RoleScreen
              text="Driver"
              imageUrl={require('../../assets/Driver.png')}
              role="Driver"
            />
            <RoleScreen
              text="Merchant"
              imageUrl={require('../../assets/Merchant.png')}
              // role="Availability"
              role="MerchantMenu"
              city={profileDetails.city}
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'whitesmoke',
    flex: 1,
  },
});
