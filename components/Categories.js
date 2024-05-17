import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View, TouchableOpacity ,ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS } from '../constants/index';
import axios from 'axios';
import useSWR from 'swr';
import AsyncStorage from '@react-native-async-storage/async-storage'; 


export const HomeTabs = ({ selectedCart, setSelectedCart }) => {
const router = useRouter();

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

const [key, setKey] = useState(`${storedUrl}/categories?page=${page}`)
const [categories, setCategories] = useState([])


const fetcher = (url) => axios.get(url).then((res) => res.data);

const { data, error, isLoading, mutate } = useSWR(key, fetcher);






  const handleCartPress = (index,) => {
    setSelectedCart(index);
  
  };

  useEffect(()=>{
    if(data?.data?.length ){
      setCategories(data?.data)

    }

  },[data?.data])

  return (
    <>
    {isLoading ? (
    <ActivityIndicator size="large" color={COLORS.primary} />


    ):(
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginTop: 10  ,maxHeight:50 ,paddingTop:3}}>
      {categories.map((carta, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleCartPress(carta?.id)}
          style={{
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: selectedCart === carta?.id ? COLORS.primary : COLORS.background, 
            borderRadius: 25,
            paddingVertical: 10,
            marginHorizontal: 5,
            marginTop:1,
            paddingHorizontal: 15,
            maxHeight: 40,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5

          }}>
          <Image
            source={{uri:carta.image}}
            style={{ height: 20, width: 20 ,margin:2 ,borderRadius:50}}
          />
          <Text style={{
            ...FONTS.body4,
            color: selectedCart === carta?.id ? COLORS.white : COLORS.black 
          }}>
            {carta?.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>

    )}
    </>
  );
};
