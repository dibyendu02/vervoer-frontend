/* eslint-disable react-native/no-inline-styles */
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import MenuIcon from '../assets/Icon metro-menu.svg';
import Home from '../assets/sidebar/home.svg';
import Wallet from '../assets/sidebar/wallet.svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Profile from "../assets/sidebar/profile.svg";
// import FaceCard from "../assets/sidebar/farecard.svg";
// import PaymentMethod from "../assets/sidebar/payment.svg";
// import Tips from "../assets/sidebar/tips.svg";
// import Settings from "../assets/sidebar/setting.svg";
// import Contact from "../assets/sidebar/contact.svg";
// import Reset from "../assets/sidebar/reset.svg";
// import Logout from "../assets/sidebar/logout.svg";

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../global';

const {height, width} = Dimensions.get('window');

const Header = ({map}) => {
  const value = useState(new Animated.Value(-500))[0];
  const [modalVisible, setModalVisible] = useState(false);
  const [menu, setMenu] = useState(false);
  const navigation = useNavigation();
  const [click, setClick] = useState('');

  // const openHandler = () => {
  //   setMenu(true);
  //   Animated.timing(value, {
  //     toValue: 0,
  //     duration: 1000,
  //     useNativeDriver: false,
  //   }).start();
  // };

  // const closeHandler = () => {
  //   setMenu(false);
  //   Animated.timing(value, {
  //     toValue: -500,
  //     duration: 1000,
  //     useNativeDriver: false,
  //   }).start();
  // };

  return (
    <>
      <View
        style={[styles.header, {width: '100%', position: map && 'absolute'}]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <TouchableOpacity activeOpacity={0.8} onPress={openHandler}> */}
            <Image
              source={require('../assets/Avatar.png')}
              style={{height: 40, width: 40, borderRadius: 50}}
            />
            {/* <View
                style={{
                  backgroundColor: '#FFFFFF',
                  height: 20,
                  width: 20,
                  borderRadius: 50,
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MenuIcon height={'30'} />
              </View> */}
            {/* </TouchableOpacity> */}
            <Image
              source={require('../assets/Heading.png')}
              style={{
                height: 100,
                width: 100,
                resizeMode: 'contain',
                marginLeft: 20,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/* <TouchableOpacity
              onPress={() => navigation.navigate('Search')}
              activeOpacity={0.8}
              style={{}}>
              <Image
                source={require('../assets/ic-search.png')}
                style={{height: 28, width: 28, resizeMode: 'contain'}}
              />
            </TouchableOpacity> */}
            <TouchableOpacity
              disabled
              onPress={() => navigation.navigate('Wallet')}
              activeOpacity={0.8}
              style={{marginHorizontal: 20}}>
              <Ionicons
                name="md-wallet-outline"
                size={24}
                color={Colors.BLACK}
              />
            </TouchableOpacity>
            <TouchableOpacity
              disabled
              onPress={() => navigation.navigate('Notifications')}
              activeOpacity={0.8}>
              {/* <Image
                source={require('../assets/ic-notification.png')}
                style={{height: 28, width: 28, resizeMode: 'contain'}}
              /> */}
              <Ionicons
                name="notifications-outline"
                size={24}
                color={Colors.BLACK}
              />
              <View
                style={{
                  backgroundColor: Colors.PRIMARY,
                  borderRadius: 50,
                  height: 15,
                  width: 15,
                  position: 'absolute',
                  right: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#FFFFFF', fontSize: 8}}>2</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/*<Animated.View
          style={{
            backgroundColor: '#FFFFFF',
            position: 'absolute',
            top: 0,
            left: value,
            height: height,
            width: width - 80,
            zIndex: 100,
            padding: 20,
            paddingHorizontal: 0,
          }}>
           <View
            style={{paddingHorizontal: 20, display: menu ? 'flex' : 'none'}}>
            <TouchableOpacity activeOpacity={0.8} onPress={closeHandler}>
              <AntDesign name="close" color="#F99026" size={24} />
            </TouchableOpacity>
            <View style={{marginVertical: 20}}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{alignItems: 'center'}}>
                <Image
                  source={require('../assets/Avatar.png')}
                  style={{height: 80, width: 80, resizeMode: 'contain'}}
                />
                <Text style={{marginTop: 10, fontSize: 15, color: '#000000'}}>
                  John Doe
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{marginHorizontal: 20, marginVertical: 30}}>
              <TouchableOpacity
                onPress={() => {
                  setClick('Home');
                  navigation.navigate('Home');
                  setMenu(false);
                  Animated.timing(value, {
                    toValue: -500,
                    duration: 1000,
                    useNativeDriver: false,
                  }).start();
                }}
                activeOpacity={0.8}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 30,
                }}>
                <Home />
                <Text
                  style={{
                    color: click === 'Home' ? Colors.PRIMARY : '#000000',
                    fontSize: 15,
                    marginLeft: 30,
                  }}>
                  Home
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setClick('ProfileScreen');
                  navigation.navigate('ProfileScreen');
                  setMenu(false);
                  Animated.timing(value, {
                    toValue: -500,
                    duration: 1000,
                    useNativeDriver: false,
                  }).start();
                }}
                activeOpacity={0.8}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 30,
                }}>
                <Image
                  source={require('../assets/Profile.png')}
                  style={{height: 25, width: 25, resizeMode: 'contain'}}
                />
                <Text
                  style={{
                    color: click === 'ProfileScreen' ? Colors.PRIMARY : '#000000',
                    fontSize: 15,
                    marginLeft: 30,
                  }}>
                  My Profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setClick('FareCard');
                  navigation.navigate('Fare Card');
                  setMenu(false);
                  Animated.timing(value, {
                    toValue: -500,
                    duration: 1000,
                    useNativeDriver: false,
                  }).start();
                }}
                activeOpacity={0.8}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 30,
                }}>
                <Image
                  source={require('../assets/FaceCard.png')}
                  style={{height: 25, width: 25, resizeMode: 'contain'}}
                />
                <Text
                  style={{
                    color: click === 'FareCard' ? Colors.PRIMARY : '#000000',
                    fontSize: 15,
                    marginLeft: 30,
                  }}>
                  Fare Card
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setClick('PaymentMethod');
                  navigation.navigate('Payment Method');
                  setMenu(false);
                  Animated.timing(value, {
                    toValue: -500,
                    duration: 1000,
                    useNativeDriver: false,
                  }).start();
                }}
                activeOpacity={0.8}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 30,
                }}>
                <Image
                  source={require('../assets/Payment.png')}
                  style={{height: 25, width: 25, resizeMode: 'contain'}}
                />
                <Text
                  style={{
                    color: click === 'PaymentMethod' ? Colors.PRIMARY : '#000000',
                    fontSize: 15,
                    marginLeft: 30,
                  }}>
                  Payment Methods
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setClick('Tips&Info');
                  navigation.navigate('Tips&Info');
                  setMenu(false);
                  Animated.timing(value, {
                    toValue: -500,
                    duration: 1000,
                    useNativeDriver: false,
                  }).start();
                }}
                activeOpacity={0.8}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 30,
                }}>
                <Image
                  source={require('../assets/Tips.png')}
                  style={{height: 25, width: 25, resizeMode: 'contain'}}
                />
                <Text
                  style={{
                    color: click === 'Tips&Info' ? Colors.PRIMARY : '#000000',
                    fontSize: 15,
                    marginLeft: 30,
                  }}>
                  Tips and Info
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setClick('Settings');
                  navigation.navigate('Settings');
                  setMenu(false);
                  Animated.timing(value, {
                    toValue: -500,
                    duration: 1000,
                    useNativeDriver: false,
                  }).start();
                }}
                activeOpacity={0.8}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 30,
                }}>
                <Image
                  source={require('../assets/Setting.png')}
                  style={{height: 25, width: 25, resizeMode: 'contain'}}
                />
                <Text
                  style={{
                    color: click === 'Settings' ? Colors.PRIMARY : '#000000',
                    fontSize: 15,
                    marginLeft: 30,
                  }}>
                  Settings
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setClick('Contact');
                  navigation.navigate('ContactScreen');
                  setMenu(false);
                  Animated.timing(value, {
                    toValue: -500,
                    duration: 1000,
                    useNativeDriver: false,
                  }).start();
                }}
                activeOpacity={0.8}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 30,
                }}>
                <Image
                  source={require('../assets/Contact.png')}
                  style={{height: 25, width: 25, resizeMode: 'contain'}}
                />
                <Text
                  style={{
                    color: click === 'Contact' ? Colors.PRIMARY : '#000000',
                    fontSize: 15,
                    marginLeft: 30,
                  }}>
                  Contact Us
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setClick('ResetPassword');
                  navigation.navigate('ResetPassword');
                  setMenu(false);
                  Animated.timing(value, {
                    toValue: -500,
                    duration: 1000,
                    useNativeDriver: false,
                  }).start();
                }}
                activeOpacity={0.8}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 30,
                }}>
                <Image
                  source={require('../assets/Password.png')}
                  style={{height: 25, width: 25, resizeMode: 'contain'}}
                />
                <Text
                  style={{
                    color: click === 'ResetPassword' ? Colors.PRIMARY : '#000000',
                    fontSize: 15,
                    marginLeft: 30,
                  }}>
                  Reset Password
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                  setClick('Logout');
                  // setMenu(false);
                  // Animated.timing(value, {
                  //     toValue: -500,
                  //     duration: 1000,
                  //     useNativeDriver: false
                  // }).start()
                }}
                activeOpacity={0.8}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../assets/Logout.png')}
                  style={{height: 25, width: 25, resizeMode: 'contain'}}
                />
                <Text
                  style={{
                    color: click === 'Logout' ? Colors.PRIMARY : '#000000',
                    fontSize: 15,
                    marginLeft: 30,
                  }}>
                  Logout
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View> 
        </Animated.View>*/}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{
              alignItems: 'center',
              width: '100%',
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
            }}>
            <View
              style={{padding: 20, backgroundColor: '#fff', borderRadius: 20}}>
              <Text
                style={{
                  fontSize: 22,
                  color: '#000',
                  fontWeight: '600',
                  alignSelf: 'center',
                }}>
                Are you Sure?
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  color: '#000',
                  fontWeight: '600',
                  alignSelf: 'center',
                  textAlign: 'center',
                  marginVertical: 10,
                }}>
                Are you sure you want to logout?
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={{
                    backgroundColor: '#5E5E60',
                    width: '45%',
                    height: 40,
                    borderRadius: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#fff'}}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Login');
                    setMenu(false);
                    Animated.timing(value, {
                      toValue: -500,
                      duration: 1000,
                      useNativeDriver: false,
                    }).start();
                  }}
                  style={{
                    backgroundColor: Colors.PRIMARY,
                    width: '45%',
                    height: 40,
                    borderRadius: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#fff'}}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
    zIndex: 100,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: Colors.WHITE,
  },
});
