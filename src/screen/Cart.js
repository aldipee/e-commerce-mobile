import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Card, Header, ListItem, Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {API} from '../config/server';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {addToCart, updateCart, removeItem} from '../redux/actions/CartActions';
import myColors from '../config/colors';
import {convertToRupiah} from '../utils/convert';

function Cart(props) {
  const [totalPayment, setTotalPayment] = useState(0);
  const [cart, setCart] = useState([]);

  const fetchData = () => {
    return new Promise((resolve, reject) => {
      if (props.cart.data.length !== 0) {
        resolve(props.cart.data);
      }
    });
  };
  // useEffect(async () => {
  //   await setCart(props.cart.data);
  // });

  useEffect(() => {
    async function getData() {
      const data = fetchData();
      return data;
    }
    getData()
      .then(data => {
        setCart(data);
        return data;
      })
      .then(data => {
        const totalPayment = data.reduce((prev, item) => {
          return prev + item.price * item.quantity;
        }, 0);
        setTotalPayment(totalPayment);
      });
  });
  return (
    <>
      <Header
        containerStyle={{marginTop: -25}}
        placement="left"
        leftComponent={{icon: 'menu', color: '#fff'}}
        centerComponent={{
          text: 'Cart',
          style: {color: '#fff', fontSize: 19, fontWeight: 'bold'},
        }}
      />
      <ScrollView>
        {cart &&
          cart.map((data, index) => (
            <View style={{backgroundColor: '#fff', marginTop: 10}}>
              <View style={{paddingHorizontal: 10}}>
                <View style={{backgroundColor: '#fff'}}>
                  <ListItem
                    rightElement={() => (
                      <TouchableOpacity
                        onPress={() =>
                          props.removeItem(props.cart.data, index)
                        }>
                        <Icon
                          name="delete"
                          size={23}
                          color={myColors.MAIN_GREY}
                        />
                      </TouchableOpacity>
                    )}
                    containerStyle={{marginVertical: 2}}
                    title={data.name}
                    subtitle={'Size 42'}
                    titleStyle={{fontSize: 14, paddingBottom: 5}}
                    leftAvatar={{
                      source: {
                        uri: API.API_URL_STATIC.concat(data.picture),
                      },
                      rounded: false,
                    }}
                  />
                </View>
                <View
                  style={{
                    backgroundColor: '#fff',
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                  }}>
                  <View
                    style={{
                      width: 100,
                      flexDirection: 'row',
                      marginTop: 10,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        props.updateCart(
                          props.cart.data,
                          data.quantity - 1,
                          index,
                        )
                      }>
                      <Icon
                        name="minuscircleo"
                        size={20}
                        color={myColors.MAIN_BLUE}
                      />
                    </TouchableOpacity>
                    <Input
                      keyboardType="numeric"
                      defaultValue={`${data.quantity}`}
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
                    <TouchableOpacity
                      onPress={() =>
                        props.updateCart(
                          props.cart.data,
                          data.quantity + 1,
                          index,
                        )
                      }>
                      <Icon
                        name="pluscircleo"
                        size={20}
                        color={myColors.MAIN_BLUE}
                      />
                    </TouchableOpacity>

                    <Text style={{fontSize: 12, marginLeft: 10}}>
                      x {convertToRupiah(data.price)} =
                    </Text>
                    <Text style={{fontSize: 16, marginLeft: 5}}>
                      {convertToRupiah(data.price * data.quantity)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}

        <View style={[localStyle.cta]}>
          <View>
            <Text style={{fontSize: 12}}>Total Pembelian</Text>
            <Text
              style={{
                fontSize: 17,
                color: myColors.ORANGE,
                fontWeight: 'bold',
              }}>
              {convertToRupiah(totalPayment)}
            </Text>
          </View>
          <Button
            onPress={() =>
              props.navigation.navigate('CartDetails', {totalPayment, cart})
            }
            title="Beli"
            buttonStyle={{paddingHorizontal: 30, fontSize: 15}}
          />
        </View>
      </ScrollView>
    </>
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
});

const mapStateToProps = state => ({
  cart: state.cartData,
});

const mapDispatchToProps = {addToCart, updateCart, removeItem};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart);
