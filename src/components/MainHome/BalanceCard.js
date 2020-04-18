import React from 'react';
import {Card, Button} from 'react-native-elements';
import {View, Text} from 'react-native';
import {convertToRupiah} from '../../utils/convert';
import colors from '../../config/colors';
import Icon from 'react-native-vector-icons/Ionicons';
function BalanceCard({balance}) {
  return (
    <>
      <Card
        containerStyle={{
          marginTop: -20,
          borderTopWidth: 0,
          borderRightWidth: 0,
          borderLeftWidth: 0,
          borderBottomWidth: 0,
          borderRadius: 5,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.8,
          shadowRadius: 2,
        }}>
        <View>
          <Text
            style={{
              fontSize: 12,
              textTransform: 'uppercase',
              color: colors.MAIN_GREY,
            }}>
            Your balance
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {convertToRupiah(balance)}
            </Text>
            <Button
              containerStyle={{marginTop: -16}}
              icon={<Icon name="md-wallet" size={18} color="#fff" />}
              title="Top up"
            />
          </View>
        </View>
      </Card>
    </>
  );
}

export default BalanceCard;
