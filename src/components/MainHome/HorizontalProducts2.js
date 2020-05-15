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
            marginBottom: 20,
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
                  height: 260,
                  marginLeft: 5,
                  borderRadius: 7,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                }}>
                <View>
                  <Image
                    source={{
                      uri: API.API_URL_STATIC.concat(data.picture),
                    }}
                    style={{width: '100%', height: 200}}
                    PlaceholderContent={<ActivityIndicator />}
                  />
                </View>
                <View style={{marginTop: 4, marginHorizontal: 5}}>
                  <Text style={{textAlign: 'left'}}>{data.name}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        color: colors.ORANGE,
                        marginTop: 5,
                      }}>
                      {data.price && convertToRupiah(data.price)}
                    </Text>
                    <Text
                      style={{
                        fontSize: 9,
                        marginTop: 9,
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        color: colors.MAIN_GREY,
                      }}>
                      300 Terjual
                    </Text>
                  </View>
                </View>
              </Card>
            ))}
        </View>
      </ScrollView>
      {/* End of Scroll Horizontal */}
    </View>
  );
}
