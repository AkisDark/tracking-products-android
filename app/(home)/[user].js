
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, } from 'react-native'
import { COLORS, FONTS } from "../../constants";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import useSWR from "swr";

const user = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [storedUrl, setStoredUrl] = useState('http://192.168.1.4/api');

    useEffect(() => {
        const getStoredUrl = async () => {
            try {
                const storedUrl = await AsyncStorage.getItem('userUrl');
                setStoredUrl(storedUrl)
                if (!storedUrl) {
                    router.replace('/')
                }
            } catch (error) {
                console.error('Error retrieving URL from local storage:', error);
            }
        };

        getStoredUrl();
    }, []);


    const [page, setPage] = useState(1)
    const [key, setKey] = useState(`${storedUrl}/products?page=${page}&filter[id]=${params?.user}`)
    const fetcher = (url) => axios.get(url).then((res) => res.data);
    const { data, error, isLoading, mutate } = useSWR(key, fetcher);

    useEffect(() => {
        let newkey = `${storedUrl}/products?page=${page}`
        if (params?.user) {
            newkey += `&filter[id]=${params?.user}`
        }
    }, [params?.user])
    return (
        <>
            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
                <>
                    {data?.data[0] && (

                        <View style={{
                            flex: 1,
                            backgroundColor: "#FFF",
                            paddingHorizontal: 20
                        }}>
                            <View style={{
                                flexDirection: "row",
                                width: "100%",
                                marginTop: 40
                            }}>
                                <TouchableOpacity
                                    onPress={() => router.push('(home)/WholeSelle')}
                                    style={{
                                        width: "50%"
                                    }}
                                >
                                    <Image
                                        source={require('../../assets/images/back.png')}
                                        style={{
                                            width: 15,
                                            height: 15
                                        }}
                                    />
                                </TouchableOpacity>
                                <View style={{
                                    width: "50%",
                                    alignItems: "flex-end"
                                }}>
                                    <Image
                                        source={require('../../assets/images/bag-2.png')}
                                        style={{ width: 16, height: 20 }}
                                    />
                                </View>
                            </View>


                            <View style={{
                                flexDirection: "row",
                                height: 340,
                                width: "100%"
                            }}>
                                <View style={{
                                    marginTop: 150
                                }}>
                                    <View style={{
                                        backgroundColor: "#3f3a42",
                                        height: 25,
                                        width: 25,
                                        borderRadius: 5,
                                        borderWidth: 2,
                                        borderColor: "#FFF",
                                        elevation: 5
                                    }}></View>
                                    <View style={{
                                        backgroundColor: "#707070",
                                        height: 25,
                                        width: 25,
                                        borderRadius: 5,
                                        borderWidth: 2,
                                        borderColor: "#FFF",
                                        elevation: 5,
                                        marginVertical: 10
                                    }}></View>
                                    <View style={{
                                        backgroundColor: "#b3b4b9",
                                        height: 25,
                                        width: 25,
                                        borderRadius: 5,
                                        borderWidth: 2,
                                        borderColor: "#FFF",
                                        elevation: 5
                                    }}></View>

                                </View>
                                <View style={styles.slide} >

                                    <Image
                                        source={{ uri: data?.data[0]?.image }}
                                        style={{ height: 300, width: 300 }}
                                    />
                                </View>
                            </View>

                            <View style={{
                                width: "100%",
                                alignItems: "flex-end"
                            }}>
                                <Image
                                    source={require('../../assets/images/save.png')}
                                    style={{
                                        marginTop: -45,
                                        width: 15,
                                        height: 20
                                    }}
                                />
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                width: 15, marginTop: 20,
                                width: "100%"
                            }}>
                                <View style={{
                                    width: "65%"
                                }}>
                                    <Text style={{
                                        ...FONTS.body3,
                                        color: "#4f4a4a"
                                    }}>{data?.data[0]?.name}</Text>
                                </View>

                            </View>
                            <Text style={{
                                fontSize: 16,
                                color: "#b3aeae"
                            }}>{data?.data[0]?.retail_price} DZD</Text>

                            <View style={{ height: 30 }} />


                            <TouchableOpacity style={{
                                backgroundColor: "#000",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 10,
                                padding: 12,
                                marginBottom: 15

                            }}
                                onPress={async () => {
                                    await AsyncStorage.setItem('productId', data?.data[0]?.id.toString());
                                    router.push('/(home)/adddetails');
                                }}
                            >
                                <Image
                                    source={require('../../assets/images/bag.png')}
                                    style={{ height: 20, width: 16 }}
                                />
                                <Text style={{
                                    ...FONTS.body3,

                                    color: "#FFF",
                                    marginHorizontal: 15
                                }}>
                                    أبلاغ عن
                                </Text>

                            </TouchableOpacity>
                        </View>
                    )}

                </>

            )}
        </>
    );
};

export default user;

const styles = StyleSheet.create({
    myStarStyle: {
        color: "#000",
        backgroundColor: 'transparent',
        textShadowColor: "black",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2
    },
    myEmptyStarStyle: {
        color: "white"
    },
    slide: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF"
    },
});



