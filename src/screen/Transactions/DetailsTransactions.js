import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, ListItem} from 'react-native-elements';

import myColors from '../../config/colors';
import {ScrollView} from 'react-native-gesture-handler';
function DetailsTransactions() {
  return (
    <ScrollView>
      <View style={localStyle.container}>
        {/* Basic Info */}
        <View style={[localStyle.containerInfo, localStyle.inline]}>
          <Text style={localStyle.infoLabel}>Status</Text>
          <Text style={localStyle.status}>Pesanan Selesai</Text>
        </View>
        <View style={[localStyle.containerInfo, localStyle.inline]}>
          <Text style={localStyle.infoLabel}>Tanggal Pembelian</Text>
          <Text>11 Mar 2020</Text>
        </View>
        <View style={[localStyle.containerInfo, localStyle.inline]}>
          <Text style={localStyle.infoLabel}>Nomor Transaksi</Text>
          <Text style={{fontSize: 14}}>TRX234344444</Text>
        </View>

        {/* Informasi Pesanan */}

        <View>
          <Text style={{fontSize: 15, fontWeight: 'bold', marginTop: 20}}>
            Informasi Pesanan
          </Text>
          <ListItem
            containerStyle={{marginVertical: 2}}
            title={'Sepatu Futsal Nike Original'}
            titleStyle={{fontSize: 14, paddingBottom: 5}}
            subtitle={'Rp 350.000 | 2 Items'}
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
          <ListItem
            containerStyle={{marginVertical: 2}}
            title={'Sepatu Futsal Nike Original'}
            titleStyle={{fontSize: 14, paddingBottom: 5}}
            subtitle={'Rp 350.000 | 2 Items'}
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
            <Text>
              Aldi Pranata 682185142048. Jl Raya Bojongsoang, Kec. Bojongsoang,
              Bandung Jawa Barat
            </Text>
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
              <Text>Rp 904.000</Text>
            </View>
            <View style={[localStyle.inline, localStyle.details]}>
              <Text>Total Ongkir</Text>
              <Text>Rp 30.000</Text>
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
                Rp 934.000
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
