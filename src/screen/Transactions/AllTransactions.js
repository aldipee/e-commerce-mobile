import React from 'react';
import {View, Text} from 'react-native';
import {Card, Button, ListItem} from 'react-native-elements';

import myColors from '../../config/colors';

export default function AllTransactions() {
  return (
    <View>
      <View>
        {[1, 2, 3, 4, 5, 5, 6].map(data => (
          <Card containerStyle={{borderWidth: 0}}>
            <View>
              <View
                style={{
                  alignItems: 'flex-end',
                  marginTop: -6,
                  marginBottom: -4,
                }}>
                <Text
                  style={{
                    backgroundColor: myColors.GREEN,
                    color: myColors.WHITE,
                    padding: 4,
                    borderRadius: 4,
                  }}>
                  Transaksi Selesai
                </Text>
              </View>
              {/* Tanggal dan Nomor pesanan */}
              <View
                style={{
                  marginTop: 10,
                  borderBottomColor: myColors.SECOND_GREY,
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                }}>
                <Text style={{fontSize: 15}}>28 April 2020</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: myColors.MAIN_GREY}}>
                    Nomor Transaksi :
                  </Text>
                  <Text style={{color: myColors.MAIN_GREY}}>TR0000201</Text>
                </View>
              </View>
              {/* Product */}
              <View>
                <ListItem
                  containerStyle={{marginVertical: 2}}
                  title={'Sepatu Futsal Nike Original'}
                  titleStyle={{fontSize: 14, paddingBottom: 5}}
                  leftAvatar={{
                    source: {
                      uri:
                        'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/2/18/batch-upload/batch-upload_41d6e73d-6d06-479c-9680-b75ef746f82e.jpg',
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
                <Text style={{fontSize: 17}}>Rp 500.000</Text>
              </View>
            </View>
          </Card>
        ))}
      </View>
    </View>
  );
}
