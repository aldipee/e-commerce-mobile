import React, {useEffect, useState} from 'react';
import {Card, Button, Tile, SearchBar} from 'react-native-elements';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function SearchScreen() {
  return (
    <>
      <SearchBar
        onFocus={() => searchOnFocus()}
        placeholder="Type Here..."
        containerStyle={{
          backgroundColor: '#fff',
          borderBottomColor: '#fff',
          borderTopColor: '#fff',
          paddingTop: 5,
          paddingBottom: 8,
        }}
        inputContainerStyle={{
          backgroundColor: colors.SECOND_GREY,
          height: 46,
        }}
        inputStyle={{fontSize: 14}}
        showLoading={true}
        underlineColorAndroid={colors.MAIN_GREY}
      />

      <ScrollView />
    </>
  );
}

export default SearchScreen;
