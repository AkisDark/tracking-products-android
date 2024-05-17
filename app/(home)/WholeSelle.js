import {  StyleSheet,  View,SafeAreaView,ScrollView} from "react-native";
import React, {  useState } from "react";
import SearchComponents from "../../components/Search";
import { LinearGradient } from "expo-linear-gradient";
import { HomeTabs } from "../../components/Categories";
import ProductsList from "../../components/ProductList";


const employees = () => {
  const [search, setSearch] = useState("")
  const [selectedCart, setSelectedCart] = useState()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <LinearGradient colors={["#7F7FD5", "#E9E4F0"]} style={{ flex: 1 }}>
        <View style={{height:30}}/>
        <SearchComponents  search={search} setSearch={setSearch} />
        <HomeTabs selectedCart={selectedCart} setSelectedCart={setSelectedCart} />
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{maxHeight:"70%" ,marginTop:10 ,flex:1}}>
       <ProductsList search={search} category={selectedCart} />
        </ScrollView> 

</LinearGradient>

    </SafeAreaView>
  );
};

export default employees;

const styles = StyleSheet.create({});
