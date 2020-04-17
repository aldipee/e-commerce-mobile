import React, {useState} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {Card, colors, Avatar, Button, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import FeatherIcon from 'react-native-vector-icons/Feather';

// Local
import myColors from '../../config/colors';
import {setLogout} from '../../redux/actions/AuthActions';

function UploadImage(props) {
  const onLogout = status => {
    props.setLogout(data => {
      if (data) {
        props.navigation.navigate('Home');
      } else {
        props.navigation.navigate('Home');
      }
    });
  };
  return (
    <ScrollView>
      {/* Avatar and Picture */}
      <View
        style={{
          backgroundColor: myColors.SECOND_BLUE,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          height: 190,
          paddingHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Avatar
          rounded
          size="xlarge"
          title="AP"
          onPress={() => console.log('Works!')}
          activeOpacity={0.7}
        />
        <Text
          style={{
            fontSize: 17,
            fontWeight: 'bold',
            color: myColors.WHITE,
            marginTop: 10,
          }}>
          Abi Daniela
        </Text>
      </View>
      <View style={{paddingHorizontal: 10, backgroundColor: '#fff'}}>
        {/* Balance Info */}
        <View>
          <Card
            containerStyle={{marginTop: -30, borderRadius: 4, borderWidth: 0}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  borderRightWidth: 1,
                  paddingRight: 17,
                  borderColor: myColors.MAIN_GREY,
                }}>
                <Icon name="wallet" size={35} color={myColors.SECOND_BLUE} />
                <View style={{marginLeft: 10}}>
                  <Text style={{fontSize: 9, textTransform: 'uppercase'}}>
                    Saldo Dompet
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: myColors.SECOND_BLUE,
                      fontWeight: 'bold',
                    }}>
                    Rp 350.000
                  </Text>
                </View>
              </View>
              <Button
                title="Top up"
                type="outline"
                titleStyle={{fontSize: 13, paddingHorizontal: 10}}
              />
            </View>
          </Card>
        </View>
        <View style={{marginBottom: 20}}>
          <Button
            onPress={onLogout}
            title="Logout"
            buttonStyle={{backgroundColor: myColors.ORANGE}}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const localStyle = StyleSheet.create({
  iconBox: {
    width: 73,
    alignItems: 'center',
    padding: 5,
  },
  iconDesc: {fontSize: 11, alignItems: 'center'},
});

export default connect(
  null,
  {setLogout},
)(UploadImage);
