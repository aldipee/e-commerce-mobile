import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, Header, ListItem, Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {convertToRupiah} from '../utils/convert';

import myColors from '../config/colors';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

function PaymentList(props) {
  const {params} = props.route;

  return (
    <ScrollView>
      <View style={{paddingHorizontal: 20, backgroundColor: myColors.WHITE}}>
        <View style={localStyle.customCard}>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>
            Total Pembelian
          </Text>
          <Text
            style={{fontSize: 16, fontWeight: 'bold', color: myColors.ORANGE}}>
            {convertToRupiah(params.totalPayment)}
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>
            Pembayaran Instant
          </Text>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('Invoice', {
                balance: params.balance,
                totalPayment: params.totalPayment,
                shippingCost: params.shippingCost,
              })
            }>
            <View style={[localStyle.customCard, localStyle.inline]}>
              <Icon name="wallet" size={35} color={myColors.SECOND_BLUE} />
              <View>
                <Text style={[localStyle.titleSaldo]}>Saldo GoldenFoot</Text>
                <Text style={[localStyle.title]}>
                  {convertToRupiah(params.balance)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
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
  titleSaldo: {
    marginLeft: 10,
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

export default PaymentList;
