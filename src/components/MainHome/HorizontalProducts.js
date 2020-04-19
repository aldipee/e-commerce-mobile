import React from 'react';
import {View, ActivityIndicator, Text, ScrollView} from 'react-native';
import {Card, Image, Button} from 'react-native-elements';

import {API} from '../../config/server';
import colors from '../../config/colors';
import {convertToRupiah} from '../../utils/convert';
export default function HorizontalProducts({
  title,
  items,
  navigation,
  buttonColor,
}) {
  return (
    <View>
      <Text style={{marginLeft: 8, fontSize: 18, fontWeight: 'bold'}}>
        {title}
      </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={{
            marginBottom: 30,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {items &&
            items.map((data, index) => (
              <Card
                containerStyle={{
                  borderTopWidth: 0,
                  borderRightWidth: 0,
                  borderLeftWidth: 0,
                  borderBottomWidth: 0,
                  marginHorizontal: 0,
                  padding: 2,
                  width: 210,
                  height: 290,
                  marginLeft: 5,
                  borderRadius: 1,
                  marginBottom: 15,
                  marginTop: 15,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                }}>
                <Image
                  source={{
                    uri: API.API_URL_STATIC.concat(data.picture),
                  }}
                  style={{width: '100%', height: 230}}
                  PlaceholderContent={<ActivityIndicator />}
                />
                <View style={{padding: 5}}>
                  <Text style={{textAlign: 'center'}}>{data.name}</Text>
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
                    <Text style={{fontSize: 9, marginTop: 9}}>
                      {data.soldProduct[0] === null
                        ? `Belum ada terjual`
                        : `${data.soldProduct[0]} terjual`}
                    </Text>
                  </View>
                </View>
                <View style={{padding: 10}}>
                  <Button
                    title="Beli"
                    buttonStyle={{
                      borderRadius: 1,
                      backgroundColor:
                        buttonColor === 'orange'
                          ? colors.ORANGE
                          : colors.SECOND_BLUE,
                    }}
                    titleStyle={{fontSize: 14}}
                    onPress={() =>
                      navigation.navigate('ProductDetails', {data})
                    }
                  />
                </View>
              </Card>
            ))}
        </View>
      </ScrollView>
      {/* End of Scroll Horizontal */}
    </View>
  );
}
