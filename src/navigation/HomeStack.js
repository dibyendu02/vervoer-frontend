import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import About from "../screens/PostAuth/About";
import AcceptedItemPrice from "../screens/PostAuth/AcceptedItemPrice";
import AcceptedItems from "../screens/PostAuth/AcceptedItems";
import Availability from "../screens/PostAuth/Availability";
import Cart from "../screens/PostAuth/Cart";
import DryCleanerList from "../screens/PostAuth/DryCleanerList";
import DryCleanerOrders from "../screens/PostAuth/DryCleanerOrders";
import DryCleaningImage from "../screens/PostAuth/DryCleaningImage";
import HomeScreen from "../screens/PostAuth/HomeScreen";
import ItemsYouAccept from "../screens/PostAuth/ItemsYouAccept";
import MerchantMenu from "../screens/PostAuth/MerchantMenu";
import AvailableParkingSlot from "../screens/PostAuth/parking_module/register/AvailableParkingSlot";
import PaymentScreen from "../screens/PostAuth/payment_module/PaymentScreen";
import ParkingImage from "../screens/PostAuth/parking_module/register/ParkingImage";
import ParkingMerchant from "../screens/PostAuth/parking_module/register/ParkingMerchant";
import BookingListMerchant from "../screens/PostAuth/parking_module/register/BookingListMerchant";
import BookingUserList from "../screens/PostAuth/parking_module/register/BookingUserList";
import ParkingMerchantAbout from "../screens/PostAuth/parking_module/register/ParkingMerchantAbout";
import ParkingDetails from "../screens/PostAuth/parking_module/register/ParkingDetails";
import UserParkingDetails from "../screens/PostAuth/parking_module/register/UserParkingDetails";
import UserMenu from "../screens/PostAuth/UserMenu";
import UserOrders from "../screens/PostAuth/UserOrders";
import SlotDetailPage from "../screens/PostAuth/parking_module/register/SlotsDetailPage";
import BookingListUser from "../screens/PostAuth/parking_module/register/BookingListUser";
import EditParkingMerchant from "../screens/PostAuth/parking_module/register/EditMerchant/EditParkingMerchant";
import EditParkingMerchantAbout from "../screens/PostAuth/parking_module/register/EditMerchant/EditParkingMerchantAbout";
import EditParkingImage from "../screens/PostAuth/parking_module/register/EditMerchant/EditParkingImage";
import PaymentMethods from "../screens/PostAuth/PaymentMethods";
import ContactUs from "../screens/PostAuth/ContactUs";
import FareCard from "../screens/PostAuth/FareCard";
import TipsInfo from "../screens/PostAuth/TipsInfo";
import NotificationPage from "../screens/PostAuth/NotificationPage";
import SettingPage from "../screens/PostAuth/settingPage";
import VeroverQRComponent from "../screens/PostAuth/QRCoder";
import VeroverQRScannerComponent from "../screens/PostAuth/QRScanner";
import Webview from "../screens/PostAuth/webview";
import MyDeliveryList from "../screens/PostAuth/parking_module/register/MyDeliveryList";

const Stack = createNativeStackNavigator();

const Homestack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"Home"}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Availability" component={Availability} />
      <Stack.Screen name="AcceptedItems" component={AcceptedItems} />
      <Stack.Screen name="DryCleaningImage" component={DryCleaningImage} />
      <Stack.Screen name="ParkingMerchantImage" component={ParkingImage} />
      <Stack.Screen name="MerchantMenu" component={MerchantMenu} />
      <Stack.Screen
        name="BookingListMerchant"
        component={BookingListMerchant}
      />
      <Stack.Screen name="BookingListUser" component={BookingListUser} />
      <Stack.Screen name="MyDeliveryList" component={MyDeliveryList} />
      <Stack.Screen name="UserMenu" component={UserMenu} />
      <Stack.Screen name="ParkingMerchant" component={ParkingMerchant} />
      <Stack.Screen
        name="EditParkingMerchant"
        component={EditParkingMerchant}
      />
      <Stack.Screen name="EditParkingImage" component={EditParkingImage} />
      <Stack.Screen
        name="EditParkingAboutUs"
        component={EditParkingMerchantAbout}
      />
      <Stack.Screen name="PaymentMethods" component={PaymentMethods} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="FareCard" component={FareCard} />
      <Stack.Screen name="TipsInfo" component={TipsInfo} />
      <Stack.Screen name="NotificationPage" component={NotificationPage} />
      <Stack.Screen name="SettingPage" component={SettingPage} />

      <Stack.Screen name="DryCleanerList" component={DryCleanerList} />
      <Stack.Screen name="ItemsYouAccept" component={ItemsYouAccept} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="UserOrders" component={UserOrders} />
      <Stack.Screen name="DryCleanerOrders" component={DryCleanerOrders} />
      <Stack.Screen name="BookingUserList" component={BookingUserList} />
      <Stack.Screen name="AcceptedItemPrice" component={AcceptedItemPrice} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen
        name="ParkingMerchantAbout"
        component={ParkingMerchantAbout}
      />
      <Stack.Screen name="QRCode" component={VeroverQRComponent} />
      <Stack.Screen
        name="QRCodeScanner"
        component={VeroverQRScannerComponent}
      />
      <Stack.Screen
        name="AvailableParkingSlot"
        component={AvailableParkingSlot}
      />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="SlotDetailPage" component={SlotDetailPage} />
      <Stack.Screen name="ParkingDetails" component={ParkingDetails} />
      <Stack.Screen name="UserParkingDetails" component={UserParkingDetails} />
      <Stack.Screen name="webview" component={Webview} />
    </Stack.Navigator>
  );
};

export default Homestack;
