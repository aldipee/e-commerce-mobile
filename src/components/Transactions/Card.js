import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Card, ListItem } from 'react-native-elements'

import { convertToRupiah, converDate } from '../../utils/convert'
import { getStatus } from '../../utils/showDetail'
import myColors from '../../config/colors'
import { API } from '../../config/server'
function CardTransaction(props) {
  return (
    <>
      {props.data.map((data, index) => (
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('TrxDetails', {
              data,
              userData: props.userData,
            })
          }>
          <Card containerStyle={{ borderWidth: 0 }}>
            <View>
              <View
                style={{
                  alignItems: 'flex-end',
                  marginTop: -6,
                  marginBottom: -4,
                }}>
                {getStatus(data.status)}
              </View>
              {/* Tanggal dan Nomor pesanan */}
              <View
                style={{
                  marginTop: 10,
                  borderBottomColor: myColors.SECOND_GREY,
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                }}>
                <Text style={{ fontSize: 15 }}>{converDate(data.created_at)}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ color: myColors.MAIN_GREY }}>Nomor Transaksi :</Text>
                  <Text style={{ color: myColors.MAIN_GREY }}>{`TR0000${data.id}`}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ color: myColors.MAIN_GREY }}>Nomor Invoice :</Text>
                  <Text
                    style={{
                      color: myColors.MAIN_GREY,
                    }}>{`#${data.invoice_number.toUpperCase()}`}</Text>
                </View>
              </View>

              {/* Product */}
              <View>
                <ListItem
                  containerStyle={{ marginVertical: 2 }}
                  title={`${data.transactionDetail[0].name}`}
                  titleStyle={{ fontSize: 14, paddingBottom: 5 }}
                  subtitle={
                    data.transactionDetail.length > 1
                      ? `${data.transactionDetail[0].quantity} pasang + ${data.transactionDetail
                          .length - 1} produk lain`
                      : `${data.transactionDetail[0].quantity} pasang`
                  }
                  leftAvatar={{
                    source: {
                      uri: API.API_URL_STATIC.concat(data.transactionDetail[0].picture),
                    },
                    rounded: false,
                  }}
                  bottomDivider
                  chevron
                />
              </View>
              {/* TotalPayment */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text>Total Pembayaran:</Text>
                <Text style={{ fontSize: 17 }}>{convertToRupiah(data.total_price)}</Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      ))}
    </>
  )
}
export default CardTransaction
