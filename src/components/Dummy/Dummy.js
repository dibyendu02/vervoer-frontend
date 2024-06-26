import React from "react";

import { ScreenNames } from "../../global";
import Ionicons from "react-native-vector-icons/Ionicons";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../../global";

export const profileData = [
  {
    name: "My Profile",
    svg: <Ionicons name="md-person-outline" size={24} color={Colors.BLACK} />,
    screen: ScreenNames.EDIT_PROFILE,
  },

  // {
  //   name: 'Fare Card',
  //   svg: <Ionicons name="md-card-outline" size={24} color={Colors.BLACK} />,
  //   screen: ScreenNames.FARE_CARD,
  // },

  {
    name: "Payment Methods",
    svg: <MCIcons name="bank-transfer" size={24} color={Colors.BLACK} />,
    screen: ScreenNames.PAYMENT_METHOD,
  },

  {
    name: "Information",
    svg: <MCIcons name="car-info" size={24} color={Colors.BLACK} />,
    screen: ScreenNames.TIPS_INFO,
  },

  {
    name: "Setting",
    svg: <Ionicons name="settings-outline" size={24} color={Colors.BLACK} />,
    screen: ScreenNames.SETTING,
  },
  {
    name: "Delete Profile",
    svg: <Ionicons name="settings-outline" size={24} color={Colors.BLACK} />,
  },

  {
    name: "Contact Us",
    svg: (
      <MCIcons
        name="card-account-mail-outline"
        size={24}
        color={Colors.BLACK}
      />
    ),
    screen: ScreenNames.CONTACT_US,
  },

  // {
  //   name: 'Reset Password',
  //   svg: <MCIcons name="lock-reset" size={24} color={Colors.BLACK} />,
  //   // screen: ScreenNames.RESTAURANTDETAIL_SCREEN,
  // },

  {
    name: "Logout",
    svg: <MCIcons name="logout" size={24} color={Colors.BLACK} />,
  },
];
