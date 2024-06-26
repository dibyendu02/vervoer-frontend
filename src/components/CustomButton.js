import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({customStyle,onPress,buttonText,textStyle}) => {
  return (
    <TouchableOpacity onPress={onPress} style={customStyle}>
        <Text style={textStyle}>{buttonText}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    
})