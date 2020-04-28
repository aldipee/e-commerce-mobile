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
            <Button title="Top Up" buttonStyle={{borderRadius:20, backgroundColor:'#663a82'}}/>
          </Card>
        </View>
        {/* <View style={localStyle.container}>
            <View style={localStyle.wrapper1}>
              <Text style={{fontWeight: 'bold', fontSize:20, marginLeft:15, marginBottom:0}}>Top Up ke</Text>
              <TouchableOpacity style={localStyle.Touchable}>
                <Wallet name='wallet' size={25} color='black' style={{margin:15}}/>
                <View style={{flexDirection: 'column', marginLeft:20, marginTop:10}}>
                  <Text style={{fontWeight:'bold'}}>Ovo Cash</Text>
                  <Text>Detail saldo</Text>
                </View>
              </TouchableOpacity>
            </View>
              <View style={localStyle.wrapper2}>
                <Text style={{fontWeight:'bold', fontSize:20, marginLeft:15}}>Pilih Nominal Top Up</Text>
                <View style={localStyle.wrapperTopup}>
                  <TouchableOpacity style={localStyle.topUpOption}>
                    <Text>Rp.100.000</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={localStyle.topUpOption}>
                    <Text>Rp.200.000</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={localStyle.topUpOption}>
                    <Text>Rp.500.000</Text>
                  </TouchableOpacity>
                </View>
                <Text style={{marginLeft:10, fontSize:15}}>Atau masukkan nominal top up di sini</Text>
                <TextInput placeholder='Rp. xxx.xxx' keyboardType='number-pad' style={{backgroundColor:'#f0f0f0', width:'60%', marginTop:5, marginLeft:10, borderRadius:10}}/>
              </View>
            <View style={localStyle.wrapper2}>
              <View style={{flexDirection:'column', marginLeft:10, marginTop:10}}>
                  <Text style={{fontWeight:'bold', fontSize:20}}>Metode pembayaran lain</Text>
                  <View style={{flexDirection:'row'}}>
                    <Text>logo 1</Text>
                    <Text>logo 1</Text>
                    <Text>logo 1</Text>
                  </View>
              </View>
            </View>
        </View>
        <View>
          <Text>asdasd</Text>
        </View> */}
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
  // container: {
  //   backgroundColor: 'grey',
  //   flex: 1
  // },
  // wrapper1: {
  //   backgroundColor: 'white',
  //   height:'25%',
  //   justifyContent:'center'
  // },
  // wrapper2: {
  //   backgroundColor: 'white',
  //   marginTop:10,
  //   height:'25%',
  //   flexDirection: 'column'
  // },
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
  // wrapperTopup: {
  //   flexDirection: 'row',
  //   backgroundColor:'white',
  //   height:'35%',
  //   width:'100%',
  //   justifyContent:'center'
  // },
  // topUpOption: {
  //   borderRadius:15,
  //   width:'30%',
  //   height:'50%',
  //   backgroundColor:'#f0f0f0',
  //   alignItems:'center',
  //   justifyContent:'center',
  //   marginTop:10, marginLeft:5, marginRight:5,
  // }
});
