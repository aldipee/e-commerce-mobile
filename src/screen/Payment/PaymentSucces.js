import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/AntDesign'
import myColors from '../../config/colors'

import { convertToRupiah, converDate } from '../../utils/convert'
function Payment(props) {
  return (
    <ScrollView>
      <View style={localStyle.container}>
        {/* Detail Pengiriman */}
        <View style={{ marginBottom: 20 }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 30,
            }}>
            <Icon name="checkcircleo" size={70} color={myColors.MAIN_GREY} />
            <Text
              style={{
                marginTop: 15,
                fontSize: 18,
                fontWeight: 'bold',
                color: myColors.GREEN,
              }}>
              Pembayaran Berhasil
            </Text>
            <Text style={{ marginTop: 3 }}>Pesanan anda telah diteruskan ke penjual</Text>
          </View>
          <View style={[localStyle.containerInfo, localStyle.inline]}>
            <Text style={localStyle.infoLabel}>Tanggal Tagihan</Text>
            <Text>{converDate(new Date())}</Text>
          </View>
          {/* <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              marginTop: 20,
              marginBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: myColors.SECOND_GREY,
              paddingBottom: 10,
            }}>
            Detail Pembayaran
          </Text> */}

          {/* <View style={[localStyle.details]}>
            <Text style={{ color: myColors.MAIN_GREY }}>Metode Pembayaran</Text>
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 5 }}>
              Saldo GoldenFoot
            </Text>
            <Text style={{ fontSize: 12 }}>Saldo : {convertToRupiah(44444)}</Text>
          </View> */}
        </View>

        {/* Detail Pembayaran */}
        {/* <View>
          <View>
            <View style={[localStyle.details, localStyle.inline]} />
            <View style={[localStyle.inline, localStyle.details]}>
              <Text>Total Pembelian</Text>
              <Text>{convertToRupiah(34343)}</Text>
            </View>

            <View style={[localStyle.inline, localStyle.details]}>
              <Text>Total Ongkir</Text>
              <Text>{convertToRupiah(5666)}</Text>
            </View>
 
            <View style={[localStyle.inline, localStyle.totalContainer]}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                Total Pembayaran
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: myColors.ORANGE,
                }}>
                {convertToRupiah(34343434)}
              </Text>
            </View>
          </View>
        </View> */}
        <View style={{ marginTop: 15 }}>
          <Button
            onPress={() => props.navigation.navigate('Home')}
            containerStyle={{ margin: 5 }}
            titleStyle={{ fontSize: 14 }}
            title="Selesai"
            buttonStyle={{
              backgroundColor: myColors.ORANGE,
              paddingHorizontal: 20,
            }}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const localStyle = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  details: {
    marginTop: 5,
    paddingTop: 2,
  },
  totalContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: myColors.SECOND_GREY,
  },
  total: {
    fontSize: 18,
  },
  containerInfo: {
    marginVertical: 5,
    paddingVertical: 0,
  },
  justifyContent: {
    alignItems: 'center',
  },
  inline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoLabel: {
    fontSize: 13,
    color: myColors.MAIN_GREY,
  },
  status: {
    color: myColors.GREEN,
  },
})

export default Payment
