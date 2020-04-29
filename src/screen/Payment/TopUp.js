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
  ToastAndroid,
} from 'react-native';
import {Header, Card, Button} from 'react-native-elements';
import Wallet from 'react-native-vector-icons/FontAwesome5';
import Left from 'react-native-vector-icons/AntDesign';
import Axios from 'axios';
import {API} from '../../config/server';
export default class TopUp extends Component {
  state = {
    nominal: 0,
  };

  onSubmitTopUp = () => {
    Axios.post(API.API_URL.concat('topup/user'), {
      nominal: this.state.nominal,
    })
      .then(data => {
        ToastAndroid.show('Request Succesfsully', ToastAndroid.SHORT);
        return data;
      })
      .then(data => {
        this.props.navigation.navigate('Home');
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <>
        <StatusBar backgroundColor="#3c1361" />
        <Header
          containerStyle={{
            height: 50,
          }}
          leftComponent={<Left name="arrowleft" size={25} color="white" />}
          centerComponent={
            <Text style={{fontSize: 18, marginTop: -10, color: 'white'}}>
              Top Up
            </Text>
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
              onChangeText={value => this.setState({nominal: value})}
              style={{
                backgroundColor: '#f0f0f0',

                marginTop: 5,
                marginLeft: 10,
                borderRadius: 4,
              }}
            />
          </Card>
          {/* <Card>
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
          </Card> */}
        </ScrollView>
        <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
          <Card containerStyle={{marginHorizontal: 0}}>
            <Button
              title="Top Up"
              buttonStyle={{borderRadius: 20, backgroundColor: '#663a82'}}
              onPress={this.onSubmitTopUp}
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
    borderRadius: 2,
  },
  Touchable: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 8,
    marginLeft: 2,
    marginRight: 10,
    marginBottom: 15,
    marginTop: 8,
    borderColor: '#000',
    borderWidth: 1,
  },
});
