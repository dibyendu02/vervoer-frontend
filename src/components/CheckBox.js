import { StyleSheet, Text, TouchableOpacity,View } from 'react-native'
import React from 'react'
import { Colors } from '../global'

const CheckBox = ({onPress,selected=false,label="Select All"}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{color:Colors.BLACK}}>{label}</Text>
            <View style={{width:10}} />
            <View style={{...styles.box,backgroundColor:selected?"#F99025":Colors.WHITE}}></View>
            
        </TouchableOpacity>
    )
}

export default CheckBox

const styles = StyleSheet.create({
    box: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.GRAY_DARK
    }
})