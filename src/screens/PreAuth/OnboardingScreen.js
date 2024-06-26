import {
    StyleSheet,
    Text,
    View,
    Image,
    Animated,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const OnboardingScreen = () => {
    const navigation = useNavigation();
    const value = useState(new Animated.Value(-300))[0];
    const value1 = useState(new Animated.Value(-300))[0];
    const value2 = useState(new Animated.Value(-300))[0];
    const value3 = useState(new Animated.Value(0))[0];

    useEffect(() => {
        // console.log('onBaording');
        Animated.sequence([
            Animated.spring(value, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: false,
            }),
            Animated.spring(value1, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: false,
            }),
            Animated.spring(value2, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: false,
            }),
            Animated.timing(value3, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: false,
            }),
        ]).start();
    }, []);

    const onBaording = async () => {
        // await Set_Encrypted_AsyncStorage('text', 'onboarding', 'true', 'VervoerRN');
        navigation.navigate('Login');
    };

    return (
        <View style={styles.screen}>
            <View style={{ paddingHorizontal: 10, paddingTop: 20 }}>
                <Image
                    source={require('../../assets/Logo.png')}
                    style={{ height: 120, width: 120, resizeMode: 'contain' }}
                />
                <View style={{ paddingLeft: 20 }}>
                    <Animated.Text style={{ fontSize: 25, color: '#000000', left: value }}>
                        Parking
                    </Animated.Text>
                    <Animated.Text style={{ fontSize: 25, color: '#000000', left: value1 }}>
                        & Dry Cleaning
                    </Animated.Text>
                    <Animated.Text style={{ fontSize: 25, color: '#000000', left: value2 }}>
                        in an Instant!
                    </Animated.Text>
                </View>
            </View>
            <Animated.View style={{ opacity: value3 }}>
                <Image
                    source={require('../../assets/Car.png')}
                    style={{
                        height: 300,
                        width: width,
                        resizeMode: 'contain',
                        marginVertical: 100,
                    }}
                />
            </Animated.View>
            <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
                <Image
                    source={require('../../assets/Curve.png')}
                    style={{ height: 240, width: 370, resizeMode: 'contain' }}
                />
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onBaording}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        position: 'absolute',
                        zIndex: 100,
                        bottom: 20,
                        right: 20,
                    }}>
                    <Text
                        style={{
                            fontSize: 15,
                            color: '#FFFFFF',
                            fontWeight: 'bold',
                            marginRight: 5,
                        }}>
                        Get Started
                    </Text>
                    <MaterialIcons name="arrow-forward-ios" size={14} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
});
