import { KeyboardAvoidingView, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import { Colors } from '../../global'
import Header from '../../components/Header'
import BackArrowIcon from '../../assets/back.svg';
import { useFocusEffect } from '@react-navigation/native'
import CustomButton from '../../components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { setDryCleanerAcceptedItemsPrice } from '../../state/reducers/DrycleanerReducer'
import { showMessage } from 'react-native-flash-message'


const AcceptedItemPrice = ({ navigation }) => {

    const { dryCleanerProfile } = useSelector((state) => state.drycleanerreducer);
    const disPatch = useDispatch();
    let [items, setItems] = React.useState([])

    useFocusEffect(React.useCallback(() => {
        setItems(JSON.parse(JSON.stringify(dryCleanerProfile.acceptItems)));
    }, [dryCleanerProfile]));

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#4C4C4C' }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <View style={styles.screen}>
                <Header />
                <View style={{ marginHorizontal: 20 }}>
                    <View style={{ zIndex: 10, flexDirection: 'column', marginTop: 20 }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    zIndex: -1,
                                }}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={{}}
                                    onPress={() => navigation.goBack()}>
                                    <BackArrowIcon height={'30'} />
                                </TouchableOpacity>
                                <View style={{ marginLeft: 10 }}>
                                    <Text
                                        style={{ fontSize: 18, color: Colors.WHITE, marginBottom: 5 }}>
                                        Accepted Item Price
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
                <ScrollView
                    nestedScrollEnabled={true}
                    ontentContainerStyle={{
                        flexGrow: 1
                    }}
                    keyboardShouldPersistTaps={'always'}
                >
                    <View

                        style={{
                            flex: 1,
                            backgroundColor: Colors.WHITE,
                            margin: 20,
                            borderRadius: 20,
                            padding: 20
                        }}
                    >
                        {items.map((item, parentindex) => {
                            return (
                                <View style={{ marginBottom: 30 }} key={parentindex}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 20, textTransform: 'capitalize', color: Colors.BLACK, fontWeight: 'bold' }}>{item.itemName}</Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                let temp = JSON.parse(JSON.stringify(items));
                                                temp[parentindex].attributes.push({
                                                    "name": "",
                                                    "price": ""
                                                })
                                                setItems(temp)
                                            }}>
                                            <Image
                                                source={require('../../assets/plus.png')}
                                                style={{ width: 30, height: 30, resizeMode: 'contain', tintColor: "#F99025" }}
                                            />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ height: 10 }} />
                                    {item.attributes.map((attribute, attributeIndex) => {
                                        return (
                                            <View style={{ marginBottom: 20 }} key={attributeIndex}>
                                                <Text style={{ color: Colors.BLACK, fontSize: 20, fontWeight: 'bold' }}>Attribute {attributeIndex + 1}</Text>

                                                <View style={{ height: 20 }} />
                                                <TextInput
                                                    value={"" + attribute.name}
                                                    onChangeText={(text) => {
                                                        let temp = JSON.parse(JSON.stringify(items));
                                                        temp[parentindex].attributes[attributeIndex].name = text
                                                        setItems(temp)
                                                    }}
                                                    placeholder={'Attribute Name'}
                                                    style={{
                                                        height: 50,
                                                        borderWidth: 1,
                                                        borderRadius: 10,
                                                        paddingLeft: 10,
                                                        color: 'black'
                                                    }}
                                                />
                                                <View style={{ height: 20 }} />
                                                <TextInput
                                                    value={"" + attribute.price}
                                                    onChangeText={(text) => {
                                                        let temp = JSON.parse(JSON.stringify(items));
                                                        temp[parentindex].attributes[attributeIndex].price = text
                                                        setItems(temp)
                                                    }}
                                                    keyboardType={'numeric'}
                                                    placeholder={'Price'}
                                                    style={{
                                                        height: 50,
                                                        borderWidth: 1,
                                                        borderRadius: 10,
                                                        paddingLeft: 10,
                                                        color: 'black'
                                                    }}
                                                />
                                            </View>
                                        )
                                    })}


                                </View>
                            )
                        })}

                        <CustomButton
                            customStyle={{
                                backgroundColor: "#F99025",
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 50,
                                borderRadius: 25
                            }}
                            buttonText={'Next'}
                            onPress={() => {
                                let temp = JSON.parse(JSON.stringify(items));
                                let arr = temp.filter(single => single.attributes.some(attribute => attribute.name == "" && attribute.price == ""))
                                if (arr.length) {
                                    showMessage({
                                        message: `Please fill at attributes`,
                                        type: 'warning',
                                        style: {
                                            alignItems: 'center'
                                        },
                                        autoHide: true,
                                        textStyle:{
                                            color:Colors.BLACK,
                                            fontSize:22,
                                            fontWeight:'bold'
                                        }
                                    })
                                } else {
                                    disPatch(setDryCleanerAcceptedItemsPrice(items));
                                    navigation.navigate('DryCleaningImage');
                                }

                            }}
                            textStyle={{
                                color: Colors.WHITE,
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}
                        />
                    </View>

                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}

export default AcceptedItemPrice

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#4C4C4C',
        flex: 1,
    },
})