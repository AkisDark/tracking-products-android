import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native";
import { FONTS } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
const wholeSeller = require("../../assets/wholeSelle.png");
const Retailer = require("../../assets/retqiler.png");


const index = () => {
  const router = useRouter();

  const changePage = async (type) => {
    await AsyncStorage.setItem('type', type);
    router.push('/(home)/WholeSelle')
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#7F7FD5", "#E9E4F0"]} style={{ flex: 1 }}>
        <View style={{ padding: 12 }}>
          <View style={{ height: 30 }} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Feather name="bar-chart" size={24} color="black" />
            <Text style={{ ...FONTS.body4 }}>
              Price Finder
            </Text>
            <Entypo name="back" onPress={() => {
              router.replace('/')
            }} size={24} color="black" />
          </View>


          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              height: 70,
            }}
          >

          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#f79d00",
              borderRadius: 6,
              padding: 12,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 30,


            }}
            onPress={() => changePage("retailer")}
          >
            <View
              style={{
                width: 35,
                height: 35,
                borderRadius: 7,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={Retailer}
                style={{
                  width: 35, height: 35, borderRadius: 35,
                }}
              />
            </View>
            <Text style={{ marginTop: 7, ...FONTS.body3 }}> التجزئة </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#ABCABA",
              borderRadius: 6,
              padding: 12,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => changePage("WholeSelle")}


          >
            <View
              style={{
                width: 35,
                height: 35,
                borderRadius: 7,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={wholeSeller}
                style={{ width: 35, height: 35, borderRadius: 35 }}
              />
            </View>
            <Text style={{ marginTop: 7, ...FONTS.body3 }}>الجملة</Text>
          </TouchableOpacity>



        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});
