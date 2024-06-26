import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const {width, height} = Dimensions.get("window");


const ImageItem = ({imageUrl}) => {
    return (
        <View style={styles.image}>
            <Image
            source={imageUrl}
            style={{width:"100%", height:150, resizeMode:"stretch", borderRadius:10}}
            />
        </View>
    )
}

export default ImageItem

const styles = StyleSheet.create({
    image: {
        padding:20,
        height: height / 3 ,
        width: width,
        alignItems: "center",
        justifyContent: "center",
        zIndex:-1
    }
})
