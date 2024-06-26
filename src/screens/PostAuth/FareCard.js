import React from 'react';
import { View, Alert, ScrollView, Image, Text,StyleSheet,SafeAreaView,Linking, Button } from 'react-native';
import { BLACK } from '../../global/colors';


function FareCard(props) {
   return (
      <SafeAreaView >
         <View style={styles.containerFareCard}>
         <Text style={styles.textHeading}>Information</Text>
         </View>
         <View>
            <Text style={styles.paymentText}>Version 1.1
            {"\n"}{"\n"}Requirements
            </Text>
            <Text style={styles.informationText}>
            Android 6 and above
            {"\n"}
            IOS 10 and above
            {"\n"}
            {"\n"}
            {"\n"}
            All Rights Reserved by Vervoer App.{"\n"}Copyright 2023
            </Text>
            
         </View>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   containerFareCard:{
      marginTop:60, 
      fontSize:25,
      backgroundColor:'orange',
      padding:20,
   },
   textHeading:{
      color:"white",
      fontSize:22,
      fontWeight:"semi-bold"
   },
   paymentText:{
      padding:20,
      fontSize:17,
      color:'orange',
      paddingBottom:5
   },
   informationText:{
      padding:20,
      lineHeight:23,
      paddingTop:0
   },
   knowMoreText:{
      padding:20,
      color:"orange",
   }
})

export default FareCard;