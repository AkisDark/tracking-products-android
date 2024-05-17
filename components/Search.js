import React from 'react';
import { Image, TextInput, View } from 'react-native';
import { COLORS, FONTS } from '../constants';
const Search = require("../assets/search.png");


const SearchComponents = ({ setSearch, search }) => {


  return (
    <View
      style={{
        left: 0,
        right: 0,
        height: 90,
        marginTop: 10,
      }}
    >
      <View
        style={{
          backgroundColor: COLORS.background,
          paddingVertical: 8,
          paddingHorizontal: 20,
          marginHorizontal: 20,
          borderRadius: 15,
          marginTop: 25,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5

        }}
      >
        <TextInput
          placeholder={"بحث ..."}
          placeholderTextColor={COLORS.primary}
          style={{
            ...FONTS.body2,
            width: 260,
          }}
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <Image source={Search} style={{ height: 20, width: 20 }} />
      </View>
    </View>
  );
};

export default SearchComponents;
