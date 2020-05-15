import React from 'react';
import {View, ActivityIndicator, Text, FlatList} from 'react-native';
import {Card, Image, Button} from 'react-native-elements';

import {API} from '../../config/server';
import colors from '../../config/colors';
import {convertToRupiah} from '../../utils/convert';
import {connect} from 'react-redux';
import {getProductsHome} from '../../redux/actions/ProductActions';
function VerticalProducts({title, items, navigation, ...props}) {
  const loadMore = () => {
    console.log('Jalana');
    props.getProductsHome(2, 6, '', true);
  };

  return (
    <View style={{marginTop: 10}}>
      <Text style={{marginLeft: 8, fontSize: 18, fontWeight: 'bold'}}>
        {title}
      </Text>

      <View
        style={{
          marginBottom: 100,
          justifyContent: 'space-around',
          flexDirection: 'row',
        }}>
        <FlatList
          data={items}
          key={2}
          onEndReachedThreshold={1}
          numColumns={2}
          renderItem={({item}) => (
            <Card
              containerStyle={{
                borderTopWidth: 0,
                borderRightWidth: 0,
                borderLeftWidth: 0,
                borderBottomWidth: 0,
                marginHorizontal: 0,
                width: '48%',
                padding: 2,
                marginLeft: 5,
                borderRadius: 3,
                marginBottom: -10,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.8,
                shadowRadius: 2,
              }}>
              <View style={{width: '100%', height: 150}}>
                <Image
                  source={{
                    uri: API.API_URL_STATIC.concat(item.picture),
                  }}
                  style={{width: '100%', height: 140}}
                  PlaceholderContent={<ActivityIndicator />}
                />
              </View>
              <View style={{padding: 5}}>
                <Text
                  style={{
                    textAlign: 'left',
                    height: 20,
                    fontSize: 13,
                  }}>
                  {item.name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: colors.ORANGE,
                      marginTop: 1,
                    }}>
                    {item.price && convertToRupiah(item.price)}
                  </Text>
                  <Text style={{fontSize: 9, marginTop: 9}}>300 Terjual</Text>
                </View>
              </View>
              <View style={{padding: 5}}>
                <Button
                  title="Beli"
                  buttonStyle={{borderRadius: 1}}
                  titleStyle={{fontSize: 14}}
                  onPress={() => navigation.navigate('ProductDetails', {item})}
                />
              </View>
            </Card>
          )}
        />
      </View>
      {/* End of Scroll Horizontal */}
    </View>
  );
}
export default connect(
  null,
  {getProductsHome},
)(VerticalProducts);
