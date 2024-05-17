import { View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
import Button from '../components/Button';
import { useRouter } from 'expo-router';
import { FONTS } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const router = useRouter();
    const [url, setUrl] = useState('http://192.168.1.4/api');
    const [isValidUrl, setIsValidUrl] = useState(true);

    const isValidFormat = (url) => {
        const urlRegex = /^(http|https):\/\/[^ "]+$/;
        return urlRegex.test(url);
    };

    const pingUrl = async () => {
        setIsValidUrl(true)
        if (isValidFormat(url)) {
            try {
                const response = await fetch(url);
                setIsValidUrl(true);
            } catch (error) {
                console.log(error)
                setIsValidUrl(false);
            }
        } else {
            setIsValidUrl(false);
        }
    };

    const saveUrlToLocalStorage = async (url) => {
        try {
            await AsyncStorage.setItem('userUrl', url);
        } catch (error) {
            console.error('Error saving URL to local storage:', error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient colors={['#7F7FD5', '#E9E4F0']} style={{ flex: 1 }}>
                <View style={{ height: 100 }} />
                <View style={{ flex: 1, marginHorizontal: 22 }}>
                    {!isValidUrl && (
                        <Text style={{ color: COLORS.red, marginBottom: 8 }}>
                            رابط غير صالح. الرجاء التحقق من الرابط والاتصال بالإنترنت.
                        </Text>
                    )}
                    <Text style={{ ...FONTS.body3, marginVertical: 12, color: COLORS.black }}>
                        بسم الله الرحمان الرحيم{' '}
                    </Text>

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ ...FONTS.h3, marginVertical: 8 }}> رابط الموقع</Text>
                        <View
                            style={{
                                width: '100%',
                                height: 48,
                                borderColor: isValidUrl ? COLORS.black : COLORS.red,
                                borderWidth: 1,
                                borderRadius: 8,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingLeft: 22,
                            }}>
                            <TextInput
                                placeholder="ex: https://example.com/api"
                                placeholderTextColor={COLORS.black}
                                keyboardType="url"
                                style={{ width: '100%', ...FONTS.body4 }}
                                value={url}
                                onChangeText={(text) => setUrl(text)}
                            />
                        </View>
                    </View>
                    <Button
                        onPress={async () => {
                            if (url) {
                                await pingUrl();
                                if (isValidUrl && url) {
                                    await saveUrlToLocalStorage(url); 
                                    router.replace('(home)');
                                }
                            }
                        }}
                        title="دخول"
                        filled
                        style={{
                            marginTop: 18,
                            marginBottom: 4,
                        }}
                    />
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default Login;
