import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/PostAuth/ProfileScreen';
import {ScreenNames} from '../global';
import EditProfileScreen from '../screens/PostAuth/EditProfileScreen';


const Stack = createNativeStackNavigator();

const Profilestack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ScreenNames.PROFILE}>
      <Stack.Screen name={ScreenNames.PROFILE} component={ProfileScreen} />
      <Stack.Screen name={ScreenNames.EDIT_PROFILE} component={EditProfileScreen} />
      
    </Stack.Navigator>
  );
};

export default Profilestack;
