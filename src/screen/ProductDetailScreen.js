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
import {Card, Tile, Button, Image, Input} from 'react-native-elements';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
// Local
import {addToCart} from '../redux/actions/CartActions';
import colors from '../config/colors';
import {convertToRupiah} from '../utils/convert';
import {API} from '../config/server';
import Modal from 'react-native-modal';
function ProductDetailScreen(props) {
  const [quantity, setQuantity] = useState(1);
  const data = props.route.params.item;
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  const updateCart = total => {
    if (total > data.stock) {
      ToastAndroid.show('Stock tidak cukup', ToastAndroid.SHORT);
    } else if (total < 1) {
      ToastAndroid.show('Pemesanan minimal 1', ToastAndroid.SHORT);
    } else {
      setQuantity(total);
    }
  };

  const onSelectedProduct = () => {
    props.addToCart(data, quantity);
    ToastAndroid.show('Produk berhasil ditambahkan!', ToastAndroid.SHORT);
    props.navigation.navigate('MyCart');
  };
  return (
    <SafeAreaView>
      <View>
        <Modal isVisible={showModal} style={{margin: 0}} coverScreen={true}>
          <View style={{flex: 1}}>
            <View
              style={{
                backgroundColor: colors.WHITE,
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: 230,
              }}>
              <View
                style={{
                  padding: 15,
                  borderBottomColor: colors.SECOND_GREY,
                  borderBottomWidth: 1,
                  justifyContent: 'space-between',
                  alignContent: 'center',
                  flexDirection: 'row',
                }}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  Pilih Jumlah
                </Text>
                <TouchableOpacity onPress={toggleModal}>
                  <Icon name="close" size={23} />
                </TouchableOpacity>
              </View>
              <View style={{paddingHorizontal: 15, paddingVertical: 10}}>
                <Text>{data.stock} Stok Tersedia</Text>
                <View
                  style={{
                    width: 100,
                    flexDirection: 'row',
                    marginTop: 10,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity onPress={() => updateCart(quantity - 1)}>
                    <Icon
                      name="minuscircleo"
                      size={20}
                      color={colors.MAIN_BLUE}
                    />
                  </TouchableOpacity>
                  <Input
                    keyboardType="numeric"
                    defaultValue={`${quantity}`}
                    textContentType={Number}
                    containerStyle={{width: 60}}
                    inputStyle={{fontSize: 14, textAlign: 'center'}}
                    inputContainerStyle={{
                      alignItems: 'center',
                      padding: 0,
                      margin: 0,
                      height: 30,
                    }}
                  />
                  <TouchableOpacity onPress={() => updateCart(quantity + 1)}>
                    <Icon
                      name="pluscircleo"
                      size={20}
                      color={colors.MAIN_BLUE}
                    />
                  </TouchableOpacity>

                  <Text style={{fontSize: 12, marginLeft: 10}}>
                    x {convertToRupiah(data.price)} =
                  </Text>
                  <Text style={{fontSize: 16, marginLeft: 5}}>
                    {convertToRupiah(data.price * quantity)}
                  </Text>
                </View>
                <Button
                  onPress={onSelectedProduct}
                  containerStyle={{marginTop: 40}}
                  titleStyle={{fontSize: 14}}
                  title="Tambah ke keranjang"
                  buttonStyle={{backgroundColor: colors.ORANGE}}
                />
              </View>
            </View>
          </View>
        </Modal>
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
              onPress={toggleModal}
              containerStyle={{margin: 5}}
              titleStyle={{fontSize: 14}}
              title="Tambah ke keranjang"
              buttonStyle={{backgroundColor: colors.ORANGE}}
            />
          </View>
        </View>
      </View>
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
