import React from 'react'
import { Image, StyleSheet, View } from 'react-native';


import Swiper from 'react-native-swiper';
const styles = StyleSheet.create({
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF"
    },

})

const SwiperComponent = ({ data }) => {
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
            {data?.image && <View style={styles.slide} >

                <Image
                    source={{ uri: data?.image }}
                    style={{ height: 300, width: 300 }}
                />
            </View>
            }



        </Swiper>
    );

};

export default SwiperComponent;