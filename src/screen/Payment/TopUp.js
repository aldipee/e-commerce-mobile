import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  StatusBar,
  ScrollView,
} from 'react-native';
import {Header, Card, Button} from 'react-native-elements';
import Wallet from 'react-native-vector-icons/FontAwesome5';
import Left from 'react-native-vector-icons/AntDesign';
export default class TopUp extends Component {
  render() {
    return (
      <>
        <StatusBar backgroundColor="#3c1361" />
        <Header
          containerStyle={{
            backgroundColor: '#3c1361',
          }}
          leftComponent={<Left name="arrowleft" size={25} color="white" />}
          centerComponent={
            <Text style={{fontSize: 25, color: 'white'}}>Top Up</Text>
          }
        />
        <ScrollView>
          <Card>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Top Up ke</Text>
            <TouchableOpacity style={localStyle.newTouchable}>
              <Wallet
                name="wallet"
                size={30}
                color="black"
                style={{marginLeft: 15}}
              />
              <View style={{flexDirection: 'column', marginLeft: 15}}>
                <Text style={{fontWeight: 'bold', fontSize: 15}}>OVO Cash</Text>
                <Text style={{fontSize: 15}}>Saldo Rp.5000</Text>
              </View>
            </TouchableOpacity>
          </Card>
          <Card>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              Pilih Nominal Top Up
            </Text>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <TouchableOpacity style={localStyle.Touchable}>
                <Text>Rp.100,000</Text>
              </TouchableOpacity>
              <TouchableOpacity style={localStyle.Touchable}>
                <Text>Rp.200,000</Text>
              </TouchableOpacity>
              <TouchableOpacity style={localStyle.Touchable}>
                <Text>Rp.500,000</Text>
              </TouchableOpacity>
            </View>
            <Text>Atau masukkan nominal top up disini</Text>
            <TextInput
              placeholder="Rp. xxx.xxx"
              keyboardType="number-pad"
              maxLength={6}
              style={{
                backgroundColor: '#f0f0f0',
                width: '60%',
                marginTop: 5,
                marginLeft: 10,
                borderRadius: 10,
              }}
            />
          </Card>
          <Card>
            <Text>Pilih Metode Pembayaran lain</Text>
            <View style={{flexDirection: 'column', width: '100%'}}>
              <TouchableOpacity style={localStyle.Touchable}>
                <Text>BCA</Text>
              </TouchableOpacity>
              <TouchableOpacity style={localStyle.Touchable}>
                <Text>Indomaret</Text>
              </TouchableOpacity>
              <TouchableOpacity style={localStyle.Touchable}>
                <Text>Alfamart</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </ScrollView>
        <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
          <Card containerStyle={{marginHorizontal: 0}}>
            <Button
              title="Top Up"
              buttonStyle={{borderRadius: 20, backgroundColor: '#663a82'}}
            />
          </Card>
        </View>
      </>
    );
  }
}

const localStyle = StyleSheet.create({
  newTouchable: {
    backgroundColor: 'white',
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  Touchable: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 8,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
});
