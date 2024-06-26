import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { Colors } from '../../global';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../../state/reducers/CartReducer';
import CustomButton from '../../components/CustomButton';
import BackArrowIcon from '../../assets/back.svg';
import { showMessage } from 'react-native-flash-message';

const ItemsYouAccept = ({ navigation, route }) => {

    const { dryCleaners, selectedDryCleaner } = useSelector((state) => state.drycleanerreducer);
    const { cartList } = useSelector((state) => state.cartReducer);

    const { userId } = route.params;

    const dispatch = useDispatch();

    const [acceptedList, setList] = React.useState([]);

    console.log("selectedDryCleaner===>", JSON.stringify(selectedDryCleaner, null, 4));


    React.useEffect(() => {
        if (userId && dryCleaners.length) {
            let findIndex = dryCleaners.findIndex((single, index) => single.userId == userId);
            setList(dryCleaners[findIndex].acceptItems)
        }
    }, [userId, dryCleaners]);





    const formatData = (dataList, numColumns) => {
        const totalRows = Math.floor(dataList.length / numColumns);
        let totalLastRow = dataList.length - (totalRows * numColumns);
        while (totalLastRow !== numColumns && totalLastRow !== 0) {
            dataList.push({ key: `blank-${totalLastRow}`, empty: true });
            totalLastRow++;
        }
        return dataList;
    }

    const NUM_OF_COLUMNS = 4;

    const selectItems = (item) => {

        let temp = [...cartList];
        let index = temp.findIndex((single, index) => single.itemName == item.itemName);
        if (index != -1) {
            var removed = temp.filter((single, index) => single.itemName != item.itemName);
            dispatch(setCart(removed))
        } else {
            let tempObj = JSON.parse(JSON.stringify(item));
            tempObj.attributes.forEach((attribute,index)=>{
                attribute.status = (index==0)?true:false;
            })
            tempObj.count = 1;
            temp.push(tempObj);
            dispatch(setCart(temp));
        }
    }

    const selectStatus = (item) => {
        let temp = [...cartList];
        let index = temp.findIndex((single, index) => single.itemName == item.itemName);
        if (index != -1) {
            return true
        } else {
            return false
        }
    }

    const renderItems = ({ item, index }) => {
        if (item.empty) {
            return <View style={{
                flex: 1,
                marginRight: 15,
                marginBottom: 15,
                height: 30,
                borderRadius: 5,
                overflow: 'hidden',
                backgroundColor: 'transparent'
            }} />
        }
        return (
            <TouchableOpacity
                onPress={() => {
                    selectItems(item)
                }}
                style={{
                    flex: 1,
                    marginRight: 15,
                    marginBottom: 15,
                    height: 80,
                    borderRadius: 5,
                    overflow: 'hidden',
                    justifyContent: 'center',
                    backgroundColor: selectStatus(item) ? "#F99025" : "#5D5F60",
                    alignItems: 'center'
                }}>
                <Text adjustsFontSizeToFit style={{ color: Colors.WHITE, textTransform: 'capitalize' }}>{item.itemName}</Text>

            </TouchableOpacity>
        )
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#4C4C4C' }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <View style={styles.screen}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 16 }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{}}
                        onPress={() => navigation.goBack()}>
                        <BackArrowIcon height={'30'} />
                    </TouchableOpacity>
                    <Text style={{ color: Colors.BLACK, fontSize: 22, marginVertical: 10, marginLeft: 15 }}>
                        Items You Accept
                    </Text>
                </View>

                <View style={{ minHeight: 200 }}>
                    <FlatList
                        data={formatData([...acceptedList], NUM_OF_COLUMNS)}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItems}
                        numColumns={NUM_OF_COLUMNS}
                        nestedScrollEnabled={true}
                        contentContainerStyle={{
                            paddingLeft: 15
                        }}
                    />
                </View>
                <CustomButton
                    buttonText={"Next"}
                    onPress={() => {
                        if (cartList.length) {
                            navigation.navigate('Cart')
                        } else {
                            showMessage({
                                message: "Please Select Some Item.",
                                type: 'danger',
                                style: {
                                    alignItems: 'center'
                                },
                                autoHide: true,
                                duration: 1500
                            });
                        }

                    }}
                    customStyle={{
                        backgroundColor: "#F99025",
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 50,
                        borderRadius: 25,
                        marginHorizontal: 16
                    }}
                    textStyle={{
                        color: Colors.WHITE,
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}
                />
            </View>
        </KeyboardAvoidingView>

    )
}

export default ItemsYouAccept

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.WHITE,
        flex: 1,
    },
})