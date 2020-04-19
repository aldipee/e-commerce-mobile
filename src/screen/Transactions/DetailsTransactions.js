import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, ListItem} from 'react-native-elements';

import myColors from '../../config/colors';
import {ScrollView} from 'react-native-gesture-handler';
import {converDate, convertToRupiah} from '../../utils/convert';
import {getStatus} from '../../utils/showDetail';
import {API} from '../../config/server';
function DetailsTransactions(props) {
  const {data, userData} = props.route.params;
  return (
    <ScrollView>
      <View style={localStyle.container}>
        {/* Basic Info */}
        <View style={[localStyle.containerInfo, localStyle.inline]}>
          <Text style={localStyle.infoLabel}>Status</Text>
          <Text style={localStyle.status}>{getStatus(data.status)}</Text>
        </View>
        <View style={[localStyle.containerInfo, localStyle.inline]}>
          <Text style={localStyle.infoLabel}>Tanggal Pembelian</Text>
          <Text>{converDate(data.created_at)}</Text>
        </View>
        <View style={[localStyle.containerInfo, localStyle.inline]}>
          <Text style={localStyle.infoLabel}>Nomor Transaksi</Text>
          <Text style={{fontSize: 14}}>{`TRX0000${data.id}`}</Text>
        </View>

        {/* Informasi Pesanan */}

        <View>
          <Text style={{fontSize: 15, fontWeight: 'bold', marginTop: 20}}>
            Informasi Pesanan
          </Text>
          {data.transactionDetail.map((item, index) => (
            <ListItem
              containerStyle={{marginVertical: 2}}
              title={item.name}
              titleStyle={{fontSize: 14, paddingBottom: 5}}
              subtitle={`${convertToRupiah(item.price)} | ${
                item.quantity
              } Pasang`}
              leftAvatar={{
                source: {
                  uri: API.API_URL_STATIC.concat(item.picture),
                },
                rounded: false,
              }}
              bottomDivider
              chevron
            />
          ))}
        </View>
        {/* Detail Pengiriman */}
        <View>
          <Text style={{fontSize: 15, fontWeight: 'bold', marginTop: 20}}>
            Detail Pengiriman
          </Text>

          <View style={[localStyle.details, localStyle.inline]}>
            <Text>Kurir</Text>
            <Text>JNE </Text>
          </View>
          <View style={[localStyle.inline, localStyle.details]}>
            <Text>No.Resi</Text>
            <Text>GK-222344555</Text>
          </View>
          <View style={[localStyle.inline, localStyle.details]}>
            <Text>Alamat Pengiriman</Text>
            <Text>{`${userData.full_name}, ${userData.phone}, ${
              userData.address[0].street
            } ${userData.address[0].city} ${
              userData.address[0].district
            }`}</Text>
          </View>
        </View>
        {/* Detail Pembayaran */}
        <View>
          <Text style={{fontSize: 15, fontWeight: 'bold', marginTop: 20}}>
            Detail Pemabayaran
          </Text>
          <Card>
            <View style={[localStyle.details, localStyle.inline]}>
              <Text>Metode Pembayaran</Text>
              <Text>Transfer Bank</Text>
            </View>
            <View style={[localStyle.inline, localStyle.details]}>
              <Text>Total Pembelian</Text>
              <Text>{convertToRupiah(data.total_price - data.postal_fee)}</Text>
            </View>
            <View style={[localStyle.inline, localStyle.details]}>
              <Text>Total Ongkir</Text>
              <Text>{convertToRupiah(data.postal_fee)}</Text>
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
                {convertToRupiah(data.total_price)}
              </Text>
            </View>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
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
});

export default DetailsTransactions;
