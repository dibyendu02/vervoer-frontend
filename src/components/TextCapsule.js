import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const TextCapsule = ({text,onPress,capsuleStyle,textStyle}) => {
  return (
    <TouchableOpacity 
        onPress={onPress}
        style={{...capsuleStyle}}>
      <Text style={{...textStyle}}>{text}</Text>
    </TouchableOpacity>
  )
}

export default React.memo(TextCapsule)

const styles = StyleSheet.create({})