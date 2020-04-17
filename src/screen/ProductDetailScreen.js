import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Animated,
  ToastAndroid,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Card, Tile, Button, Image} from 'react-native-elements';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
// Local
import {addToCart} from '../redux/actions/CartActions';
import colors from '../config/colors';
import {convertToRupiah} from '../utils/convert';
import {API} from '../config/server';
function ProductDetailScreen(props) {
  const [quantity, setQuantity] = useState(1);
  const {data} = props.route.params;

  const onSelectedProduct = () => {
    if (data.stock < quantity) {
      ToastAndroid.show('Stock tidak cukup', ToastAndroid.SHORT);
    } else {
      props.addToCart(data, quantity);
    }
  };
  return (
    <SafeAreaView>
      <View>
        <ScrollView>
          <Image
            source={{
              uri: API.API_URL_STATIC.concat(data.picture),
            }}
            style={{width: 370, height: 300}}
            PlaceholderContent={<ActivityIndicator />}
          />
          <View
            style={{
              backgroundColor: colors.WHITE,
              marginTop: -50,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }}>
            {/* Product informations */}
            <View style={localStyle.productInfoContainer}>
              <Text style={localStyle.mainTitle}>{data.name}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={localStyle.price}>
                  {convertToRupiah(data.price)}
                </Text>
                <Text style={localStyle.stockReady}>Stok Tersedia</Text>
              </View>
            </View>

            {/* Product Card, Infor Stok , and Total Sale */}

            <View>
              <Card
                containerStyle={{
                  borderColor: colors.WHITE,
                }}>
                <View style={localStyle.infoDetails}>
                  <View style={{alignItems: 'center'}}>
                    <IonIcon
                      name="ios-stats"
                      size={35}
                      color={colors.SECOND_BLUE}
                    />
                    <Text style={{fontSize: 14, color: colors.SECOND_BLUE}}>
                      367 Terjual
                    </Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <IonIcon
                      name="ios-apps"
                      size={35}
                      color={colors.SECOND_BLUE}
                    />
                    <Text style={{fontSize: 14, color: colors.SECOND_BLUE}}>
                      {data.stock} Stok
                    </Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <MaterialCommunityIcons
                      name="truck-fast"
                      size={35}
                      color={colors.SECOND_BLUE}
                    />
                    <Text style={{fontSize: 14, color: colors.SECOND_BLUE}}>
                      Pengiriman
                    </Text>
                  </View>
                </View>
              </Card>
            </View>

            {/* Product More DEtails */}
            <View>
              <Card
                containerStyle={{
                  width: '100%',
                  margin: 0,
                  borderWidth: 0,
                  marginTop: 10,
                  borderColor: colors.WHITE,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 17,
                    color: colors.MAIN_GREY,
                  }}>
                  Informasi Produk
                </Text>
                <View style={localStyle.infoDetails}>
                  <Text>Berat</Text>
                  <Text>1000 Gram</Text>
                </View>
                <View style={localStyle.infoDetails}>
                  <Text>Kondisi</Text>
                  <Text>Baru</Text>
                </View>
                <View style={localStyle.infoDetails}>
                  <Text>Minimal Order</Text>
                  <Text>1 Pasang</Text>
                </View>
                <View style={localStyle.infoDetails}>
                  <Text>Kategori</Text>
                  <Text>Sepatu Futsal</Text>
                </View>
              </Card>
              <Card
                containerStyle={{
                  width: '100%',
                  margin: 0,
                  borderWidth: 0,
                  marginTop: 10,
                  borderColor: colors.WHITE,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: colors.MAIN_GREY,
                  }}>
                  Deskripsi Produk
                </Text>
                <Text style={{fontSize: 14, marginTop: 15, marginBottom: 100}}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </Text>
              </Card>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={localStyle.fixedFooter}>
        <View style={{width: 300}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button
              containerStyle={{margin: 5}}
              title="Beli"
              titleStyle={{fontSize: 14}}
              buttonStyle={{
                backgroundColor: colors.ORANGE,
                paddingHorizontal: 40,
              }}
            />
            <Button
              onPress={onSelectedProduct}
              containerStyle={{margin: 5}}
              titleStyle={{fontSize: 14}}
              title="Tambah ke keranjang"
              buttonStyle={{backgroundColor: colors.ORANGE}}
            />
          </View>
        </View>
      </View>
      {/* <View style={[localStyle.sheet]}>
        <Animated.View style={[localStyle.popup]}>
          <TouchableOpacity>
            <Text>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <Animated.View style={[StyleSheet.absoluteFill, localStyle.cover]} /> */}
    </SafeAreaView>
  );
}

const localStyle = StyleSheet.create({
  cover: {
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  sheet: {
    position: 'absolute',
    top: Dimensions.get('window').height,
    left: 0,
    right: 0,
    height: '100%',
    justifyContent: 'flex-end',
  },
  popup: {
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    minHeight: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fixedFooter: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 100,
    },

    shadowOpacity: 0.8,
    shadowRadius: 12.35,

    elevation: 14,
    height: 60,
    backgroundColor: colors.WHITE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  infoDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 19,
  },
  stockReady: {
    backgroundColor: colors.MAIN_GREY,
    color: colors.WHITE,
    borderRadius: 5,
    height: 30,
    padding: 4,
    marginTop: 6,
  },
  productInfoContainer: {
    paddingHorizontal: 20,
  },
  price: {
    marginTop: 10,
    fontSize: 23,
    fontWeight: 'bold',
    color: colors.ORANGE,
  },
  mainTitle: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 7,
  },
});

export default connect(
  null,
  {addToCart},
)(ProductDetailScreen);
