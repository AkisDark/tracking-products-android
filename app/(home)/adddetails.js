import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SelectDropdown from 'react-native-select-dropdown'
import useSWR from "swr";
import { states } from "../../data/states";
import { COLORS } from "../../constants";



const AddDetails = () => {
  const initialFormData = {
    product_id: 0,
    name: "",
    email: "",
    phone: "",
    state_id: 0,
    city_id: 0,
    message: ""
  };
  const [formData, setFormData] = useState(initialFormData);
  const [storedUrl, setStoredUrl] = useState('http://192.168.1.4/api');


  const [page, setPage] = useState(1)

  const [key, setKey] = useState(`${storedUrl}/cities/28`)


  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data, error, isLoading, mutate } = useSWR(key, fetcher);




  useEffect(() => {
    const getStoredUrl = async () => {
      try {
        const Product = await AsyncStorage.getItem('productId');
        const storedUrl = await AsyncStorage.getItem('userUrl');


        setFormData({ ...formData, product_id: Number(Product) })
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




  useEffect(() => {

    if (formData.state_id) {
      setKey(`${storedUrl}/cities/${formData.state_id}`)
      mutate(key)
    }

  }, [formData.state_id])



  const handleRegister = () => {
    axios
      .post("http://192.168.1.4/api/complaints", formData)
      .then((response) => {
        Alert.alert(
          "شكرا",
          "تم ارسال البلاغ بنجاح"
        );
        setFormData(initialFormData);
      })
      .catch((error) => {
        Alert.alert("Error !!", error.response.data.message);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ height: 30, direction: "rtl" }} />

      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>اضافة ابلاغ</Text>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>البريد الالكتروني</Text>
            <TextInput
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="ادخل البريد الالكتروني"
              placeholderTextColor={"black"}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>الاسم الكامل</Text>
            <TextInput
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="ادخل الاسم الكامل"
              placeholderTextColor={"black"}
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>الرسالة</Text>
            <TextInput
              value={formData.message}
              onChangeText={(text) => setFormData({ ...formData, message: text })}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="الرسالة"
              placeholderTextColor={"black"}
            />
          </View>

          <View>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>رقم الهاتف</Text>
            <TextInput
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="ادخل رقم الهاتف"
              placeholderTextColor={"black"}
            />
          </View>

          <View style={{ marginVertical: 10, display: "flex",  justifyContent: "center" }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>الولاية</Text>
            <SelectDropdown
              data={states}
             
              onSelect={(selectedItem, index) => {
                setFormData({ ...formData, state_id: selectedItem?.id })
              }}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View style={styles.dropdownButtonStyle} >
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {(selectedItem && selectedItem.name) || 'اختر الولاية'}
                    </Text>
                  </View>
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                    <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
            />
          </View>
          <View style={{ marginVertical: 10, display: "flex",  justifyContent: "center" }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>البلدية</Text>
            {isLoading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />

            ) : (
              <>
                {data?.length > 0 && (

                  <SelectDropdown
                    data={data}
                    onSelect={(selectedItem, index) => {
                      setFormData({ ...formData, city_id: selectedItem?.id })
                    }}
                    renderButton={(selectedItem, isOpened) => {
                      return (
                        <View style={styles.dropdownButtonStyle}>
                          <Text style={styles.dropdownButtonTxtStyle}>
                            {(selectedItem && selectedItem.name) || 'اختر البلدية'}
                          </Text>
                        </View>
                      );
                    }}
                    renderItem={(item, index, isSelected) => {
                      return (
                        <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                          <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
                        </View>
                      );
                    }}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={styles.dropdownMenuStyle}
                  />
                )}
              </>

            )}
          </View>

          <Pressable
            onPress={handleRegister}
            style={{
              backgroundColor: "#ABCABA",
              padding: 10,
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}>

            <Text style={{ fontWeight: "bold", color: "white", padding: 5, fontSize: 18 }}>ارسال</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: "100%",
    height: 50,
    backgroundColor: '#D0D0D0',
    borderColor: '#D0D0D0',
    borderRadius: 8,
    borderStyle: 'solid',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});


export default AddDetails;

