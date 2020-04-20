import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { addTransaction } from '../../redux/actions/TransactionActions'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/AntDesign'
import myColors from '../../config/colors'

import { convertToRupiah, converDate } from '../../utils/convert'
function Invoice(props) {
  const { shippingCost, totalPayment, balance, cartData } = props.route.params
  const insertTransaction = () => {
    props.addTransaction(cartData.totalPayment, cartData.shippingCost, cartData.Product, done => {
      if (done) {
        props.navigation.navigate('PaymentSuccess', cartData)
      }
    })
  }
  return (
    <ScrollView>
      <View style={localStyle.container}>
        {/* Detail Pengiriman */}
        {balance < totalPayment ? (
          <View style={{ backgroundColor: '#d8345f', width: 170 }}>
            <Text style={{ color: '#fff' }}>Saldo anda tidak cukup</Text>
          </View>
        ) : (
          false
        )}
        <View style={{ marginBottom: 20 }}>
          <View style={[localStyle.containerInfo, localStyle.inline]}>
            <Text style={localStyle.infoLabel}>Tanggal Tagihan</Text>
            <Text>{converDate(new Date())}</Text>
          </View>
          <Text
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
          </Text>

          <View style={[localStyle.details]}>
            <Text style={{ color: myColors.MAIN_GREY }}>Metode Pembayaran</Text>
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 5 }}>
              Saldo GoldenFoot
            </Text>
            <Text style={{ fontSize: 12 }}>Saldo : {convertToRupiah(balance)}</Text>
          </View>
        </View>

        {/* Detail Pembayaran */}
        <View>
          <View>
            <View style={[localStyle.details, localStyle.inline]} />
            <View style={[localStyle.inline, localStyle.details]}>
              <Text>Total Pembelian</Text>
              <Text>{convertToRupiah(totalPayment - shippingCost)}</Text>
            </View>

            <View style={[localStyle.inline, localStyle.details]}>
              <Text>Total Ongkir</Text>
              <Text>{convertToRupiah(shippingCost)}</Text>
            </View>

            <View style={[localStyle.inline, localStyle.totalContainer]}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Total Pembayaran</Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: myColors.ORANGE,
                }}>
                {convertToRupiah(totalPayment)}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 15 }}>
          <Button
            disabled={balance < totalPayment ? true : null}
            onPress={insertTransaction}
            containerStyle={{ margin: 5 }}
            titleStyle={{ fontSize: 14 }}
            title="Bayar Sekarang"
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

export default connect(
  null,
  { addTransaction }
)(Invoice)
