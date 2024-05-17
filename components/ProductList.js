import React, { useEffect, useState } from 'react'
import {  Image, Text,View ,Alert, Modal, Pressable, StyleSheet ,ActivityIndicator} from 'react-native';
import { COLORS ,FONTS } from '../constants';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TableProduct from './TableProduct';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import axios from "axios";
import useSWR from 'swr';


const ProductsList= ({ search  ,category}) => {
    const router = useRouter();

    const [type, setType] = useState("retailer");
    const [modalVisible, setModalVisible] = useState(false);
    const [productId, setProductId] = useState();
    const [storedUrl, setStoredUrl] = useState('http://192.168.1.4/api');

    
    useEffect(() => {
      const getStoredUrl = async () => {
          try {
              const storedUrl = await AsyncStorage.getItem('userUrl');
              const Type = await AsyncStorage.getItem('type');
              if(Type){
                setType(Type)
              }
              setStoredUrl(storedUrl)
              if (!storedUrl) {
                router.replace('/')
              }
          } catch (error) {
              console.error('Error retrieving URL from local storage:', error);
          }
      };
  
      getStoredUrl();
  }, [AsyncStorage.getItem('type')]);


  const [page, setPage] = useState(1)

  const [key, setKey] = useState(`${storedUrl}/products?page=${page}`)


   const fetcher = (url) => axios.get(url).then((res) => res.data);
 
   const { data, error, isLoading, mutate } = useSWR(key, fetcher);

    useEffect(() => {
      let newkey = `${storedUrl}/products?page=${page}`
      if(search){
        newkey += `&search=${search}` 
      }
      if(category){
        newkey += `&filter[category_id]=${category}` 


      }

      setKey(newkey)

    }, [search , page ,category ,AsyncStorage.getItem('type')]);
  return (
    <View>

       { isLoading ? (
         <ActivityIndicator size="large" color={COLORS.primary} />

       ):(
        <>
        {data?.data?.length > 0 &&  data.data.map((item,index)=>(
            
                  <View
                  key={index}
                  style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      margin: 10,
                      padding: 10,
                      borderRadius: 8,
                      backgroundColor: COLORS.background,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexShrink: 1 }}>
                      <Image source={{uri: item.image  }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
                       <View>
                      <Text numberOfLines={2}  style={{ ...FONTS.body4, color: COLORS.black, maxWidth: 150 }}>{item.name}</Text>
                      <Text numberOfLines={2}  style={{ ...FONTS.body4, color: COLORS.black, maxWidth: 150 ,color:COLORS.secondary }}>
                        {type=== "retailer" ? item?.retail_price   : item?.wholesale_price } DZD</Text>

                       </View>
                  </View>
                  <View 
                         style={{
                          flexDirection: 'row',
                          alignItems: 'center',
               
                      }}>

                  <TouchableOpacity onPress={() => { setModalVisible(true),setProductId(item.id)
                   }}
                style={{
                  padding: 7,
                  width: 45,
                  height: 45,
                  borderRadius: 7,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                      <Image source={require("../assets/information.png")} 
                      style={{ width: 30, height: 30, borderRadius: 25 }} />
                 </TouchableOpacity>
                  <TouchableOpacity onPress={() => { 
                   router.push(`(home)/${item.id}`);
                   }}
                style={{
                  padding: 7,
                  width: 45,
                  height: 45,
                  borderRadius: 7,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
            <Ionicons style={{ marginLeft: 10 }}  name="arrow-back"  size={24}  color="black"/>         
                    </TouchableOpacity>
                  </View>
              </View>
            
        ))}
              <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TableProduct productId={productId} />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
        <Text style={styles.textStyle}> إخفاء</Text>
            </Pressable>
    
      </Modal>
        </>
       )
       }


    </View>

  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,

    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    width:300,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    ...FONTS.body3,
    color: 'white',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ProductsList
