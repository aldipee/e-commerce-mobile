import React from 'react';
import {View, ActivityIndicator, Text, ScrollView} from 'react-native';
import {Card, Image, Button} from 'react-native-elements';

import {API} from '../../config/server';
import colors from '../../config/colors';
import {convertToRupiah} from '../../utils/convert';

export default function HorizontalProducts({title, items, navigation}) {
  return (
    <View>
      <Text style={{marginLeft: 8, fontSize: 18, fontWeight: 'bold'}}>
        {title}
      </Text>

      <View
        style={{
          marginBottom: 100,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {items.map((data, index) => (
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
              borderRadius: 1,
              marginBottom: 0,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.8,
              shadowRadius: 2,
            }}>
            <Image
              source={{
                uri: API.API_URL_STATIC.concat(data.picture),
              }}
              style={{width: '100%', height: 150}}
              PlaceholderContent={<ActivityIndicator />}
            />
            <View style={{padding: 5}}>
              <Text
                style={{
                  textAlign: 'center',
                  height: 40,
                }}>
                {data.name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: colors.ORANGE,
                    marginTop: 5,
                  }}>
                  {convertToRupiah(data.price)}
                </Text>
                <Text style={{fontSize: 9, marginTop: 9}}>300 Terjual</Text>
              </View>
            </View>
            <View style={{padding: 10}}>
              <Button
                title="Beli"
                buttonStyle={{borderRadius: 1}}
                titleStyle={{fontSize: 14}}
                onPress={() => navigation.navigate('ProductDetails', {data})}
              />
            </View>
          </Card>
        ))}
      </View>
      {/* End of Scroll Horizontal */}
    </View>
  );
}