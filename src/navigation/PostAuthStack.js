import React from "react";
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "../global";
import Homestack from "./HomeStack";
import Profilestack from "./Profilestack";
import NotificationStack from "./NotificationStack";

const Tab = createBottomTabNavigator();

const PostAuthStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        showLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: Colors.WHITE,
          height: 80,
          borderRadius: 25,
          shadowColor: "#171717",
          shadowOffset: { width: -2, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 5,
        },
        tabBarItemStyle: {
          backgroundColor: Colors.WHITE,
          margin: 5,
          borderRadius: 10,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Homestack}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={[styles.iconView]}>
                <Ionicons
                  name="md-home-sharp"
                  size={24}
                  color={Colors.PRIMARY}
                />
                {/* <View style={{ height: 5, width: 5, position: "absolute", bottom: -10, right: 8, borderRadius: 3, backgroundColor: Colors.PRIMARY }} /> */}
              </View>
            ) : (
              <View style={[styles.iconView]}>
                <Ionicons
                  name="md-home-outline"
                  size={24}
                  color={Colors.GRAY_DARK}
                />
              </View>
            ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Homestack}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={[styles.iconView]}>
                {/* <MenuFilledSvg /> */}
                <Ionicons name="md-search" size={24} color={Colors.PRIMARY} />
                {/* <View style={{ height: 5, width: 5, position: "absolute", bottom: -10, right: 7, borderRadius: 3, backgroundColor: Colors.PRIMARY }} /> */}
              </View>
            ) : (
              <View style={[styles.iconView]}>
                <Ionicons
                  name="md-search-outline"
                  size={24}
                  color={Colors.GRAY_DARK}
                />
              </View>
            ),
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={Homestack}
        options={{
          tabBarIcon: ({ focused }) => (
            // focused ? (
            <View
              style={{
                shadowColor: "#171717",
                shadowOffset: { width: -2, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 5,
                backgroundColor: Colors.WHITE,
                bottom: 10,
                padding: 6,
                borderRadius: 30,
                height: 60,
                width: 60,
              }}
            >
              <View
                style={{
                  borderRadius: 25,
                  backgroundColor: Colors.PRIMARY,
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                }}
              >
                {/* <MenuFilledSvg /> */}
                <Ionicons name="md-wallet" size={30} color={Colors.WHITE} />
                {/* <View style={{ height: 5, width: 5, position: "absolute", bottom: -10, right: 7, borderRadius: 3, backgroundColor: Colors.PRIMARY }} /> */}
              </View>
            </View>
          ),
          // )
          // : (
          //   <View style={[styles.iconView, {}]}>
          //     <Ionicons
          //       name="md-wallet-outline"
          //       size={24}
          //       color={Colors.GRAY_DARK}
          //     />
          //   </View>
          // ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationStack}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={[styles.iconView]}>
                {/* <NotificationsFilledSvg /> */}
                <Ionicons
                  name="notifications-sharp"
                  size={24}
                  color={Colors.PRIMARY}
                />
                {/* <View style={{ height: 5, width: 5, position: "absolute", bottom: -10, right: 6, borderRadius: 3, backgroundColor: Colors.PRIMARY }} /> */}
              </View>
            ) : (
              // <NotificationsSvg />
              <View style={[styles.iconView]}>
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color={Colors.GRAY_DARK}
                />
              </View>
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profilestack}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={[styles.iconView]}>
                <Ionicons
                  name="md-person-sharp"
                  size={24}
                  color={Colors.PRIMARY}
                />
                {/* <View style={{ height: 5, width: 5, position: "absolute", bottom: -10, right: 8, borderRadius: 3, backgroundColor: Colors.PRIMARY }} /> */}
              </View>
            ) : (
              // <ProfileSvg />
              <View style={[styles.iconView]}>
                <Ionicons
                  name="md-person-outline"
                  size={24}
                  color={Colors.GRAY_DARK}
                />
              </View>
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default PostAuthStack;

const styles = StyleSheet.create({
  header: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
    zIndex: 100,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: Colors.WHITE,
  },
  iconView: {
    padding: 5,
    paddingTop: 3,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginTop: 5,
    justifyContent: "center",
  },
});
