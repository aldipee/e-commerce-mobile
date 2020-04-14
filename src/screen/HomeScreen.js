import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  Alert,
} from 'react-native';
import {Card, Button, Header, SearchBar} from 'react-native-elements';
import PickerModal from 'react-native-picker-modal-view';

import Icon from 'react-native-vector-icons/Ionicons';

// Lokal Config
import {convertToRupiah} from '../utils/convert';
import colors from '../config/colors';

const localStyle = StyleSheet.create({
  button: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  headerContainer: {
    backgroundColor: colors.MAIN_BLUE,
    justifyContent: 'space-around',
    marginTop: -30,
    height: 200,
    borderRadius: 24,
  },
  searchSection: {
    flex: 1,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    width: '30%',
    height: 20,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: 'red',
    color: '#424242',
  },
  label: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.3)',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    marginBottom: 20,
    padding: 10,
    fontWeight: 'bold',
  },
  cardContainer: {},
});

const HomeForm = () => {
  const searchOnFocus = () => {
    Alert.alert('OOOO');
  };
  return (
    <>
      <StatusBar backgroundColor="#fff" />
      <View>
        <SearchBar
          onFocus={() => searchOnFocus()}
          placeholder="Type Here..."
          containerStyle={{
            backgroundColor: '#fff',
            borderBottomColor: '#fff',
            borderTopColor: '#fff',
            paddingHorizontal: 15,
            paddingVertical: 5,
          }}
          inputContainerStyle={{
            backgroundColor: colors.SECOND_GREY,
            height: 43,
          }}
          inputStyle={{fontSize: 14}}
          showLoading={true}
          underlineColorAndroid={colors.MAIN_GREY}
        />
        <View style={localStyle.cardContainer}>
          <Card
            containerStyle={{
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
                  {convertToRupiah(130000)}
                </Text>
                <Button
                  containerStyle={{marginTop: -16}}
                  icon={<Icon name="md-wallet" size={18} color="#fff" />}
                  title="Top up"
                />
              </View>
            </View>
          </Card>
          <Card
            title={`Pick up your trip !`}
            containerStyle={{
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
              <Text>Hola</Text>
            </View>

            <View />
            <Button
              icon={{name: 'search', color: '#fff'}}
              backgroundColor={colors.ORANGE}
              buttonStyle={localStyle.button}
              title="Search "
            />
          </Card>
        </View>
      </View>
    </>
  );
};

export default HomeForm;
