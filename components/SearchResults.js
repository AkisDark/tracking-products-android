import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";

const SearchResults = ({ data, input, setInput }) => {
    return (
        <Swiper
            style={styles.wrapper}
            dotStyle={{
                backgroundColor: "#000",
                borderColor: "#000",
                borderWidth: 1,
                width: 10,
                height: 10,
                borderRadius: 10
            }}
            activeDotColor="#FFF"
            activeDotStyle={{
                borderColor: "#000",
                borderWidth: 1,
                width: 10,
                height: 10,
                borderRadius: 10
            }}

        >
            <View style={styles.slide}>


            </View>
            <View style={styles.slide}>


            </View>
            <View style={styles.slide}>


            </View>

        </Swiper>
    );

};

export default SearchResults;

const styles = StyleSheet.create({});
