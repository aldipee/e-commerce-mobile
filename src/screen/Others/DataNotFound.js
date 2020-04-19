import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import myColors from '../../config/colors';

function NoData(props) {
  return (
    <ScrollView>
      <View style={localStyle.container}>
        {/* Detail Pengiriman */}
        <View style={{marginBottom: 20}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 30,
            }}>
            <Icon name="frowno" size={70} color={myColors.MAIN_GREY} />
            <Text
              style={{
                marginTop: 15,
                fontSize: 18,
                fontWeight: 'bold',
                color: myColors.MAIN_GREY,
              }}>
              {props.message}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const localStyle = StyleSheet.create({
  container: {
    paddingTop: 250,
    paddingHorizontal: 20,
  },
});

export default NoData;
