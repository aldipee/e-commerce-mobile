import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Card, Header, ListItem, Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';

import myColors from '../config/colors';
import {ScrollView} from 'react-native-gesture-handler';

function Cart() {
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
        {[1, 2, 3, 4].map(data => (
          <View style={{backgroundColor: '#fff', marginTop: 10}}>
            <View style={{paddingHorizontal: 20}}>
              <View style={{backgroundColor: '#fff'}}>
                <ListItem
                  containerStyle={{marginVertical: 2}}
                  title={'Sepatu Futsal Nike Original'}
                  subtitle={'Size 42'}
                  titleStyle={{fontSize: 14, paddingBottom: 5}}
                  leftAvatar={{
                    source: {
                      uri:
                        'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/2/18/batch-upload/batch-upload_41d6e73d-6d06-479c-9680-b75ef746f82e.jpg',
                    },
                    rounded: false,
                  }}
                  chevron
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
                  <TouchableOpacity>
                    <Icon
                      name="minuscircleo"
                      size={20}
                      color={myColors.MAIN_BLUE}
                    />
                  </TouchableOpacity>
                  <Input
                    value={1}
                    textContentType={Number}
                    containerStyle={{width: 70}}
                    inputContainerStyle={{
                      fontSize: 11,
                      padding: 0,
                      margin: 0,
                      height: 30,
                    }}
                  />
                  <TouchableOpacity>
                    <Icon
                      name="pluscircleo"
                      size={20}
                      color={myColors.MAIN_BLUE}
                    />
                  </TouchableOpacity>

                  <Text style={{fontSize: 12}}> X Rp 300.000 =</Text>
                  <Text style={{fontSize: 16, marginLeft: 10}}>Rp 130.000</Text>
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
              Rp 450.000
            </Text>
          </View>
          <Button
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

export default Cart;
