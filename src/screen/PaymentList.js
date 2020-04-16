import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Card, Header, ListItem, Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';

import myColors from '../config/colors';
import {ScrollView} from 'react-native-gesture-handler';

function Cart() {
  return (
    <ScrollView>
      <View style={{paddingHorizontal: 20, backgroundColor: myColors.WHITE}}>
        <View style={localStyle.customCard}>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>
            Total Pembelian
          </Text>
          <Text
            style={{fontSize: 16, fontWeight: 'bold', color: myColors.ORANGE}}>
            Rp 1.030.000
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>
            Pembayaran Instant
          </Text>
          {[1].map(data => (
            <View style={[localStyle.customCard, localStyle.inline]}>
              <Icon name="wallet" size={35} color={myColors.SECOND_BLUE} />
              <Text style={[localStyle.title]}>Alfamart</Text>
            </View>
          ))}
        </View>
        <View style={{marginTop: 20, paddingBottom: 100}}>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>Metode Lain</Text>
          {[1, 2, 2, 2].map(data => (
            <View style={[localStyle.customCard, localStyle.inline]}>
              <Icon name="wallet" size={35} color={myColors.SECOND_BLUE} />
              <Text style={[localStyle.title]}>Alfamart</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const localStyle = StyleSheet.create({
  cta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    backgroundColor: myColors.WHITE,
  },
  customCard: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: myColors.WHITE,
    marginTop: 10,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    borderRadius: 2,
  },
  inline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Cart;
