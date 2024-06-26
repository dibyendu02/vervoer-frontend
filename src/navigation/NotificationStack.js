import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/PostAuth/ProfileScreen';
import {ScreenNames} from '../global';
import NotificationPage from '../screens/PostAuth/NotificationPage';


const Stack = createNativeStackNavigator();

const NotificationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ScreenNames.NOTIFICATION}>
      <Stack.Screen name={ScreenNames.NOTIFICATION} component={NotificationPage} />
      
    </Stack.Navigator>
  );
};

export default NotificationStack;
