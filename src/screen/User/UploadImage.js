import React, {useState, Component} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {Card, Avatar, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {API} from '../../config/server';
import ImagePicker from 'react-native-image-picker';

// Local
import myColors from '../../config/colors';
import {setLogout} from '../../redux/actions/AuthActions';
import axios from 'axios';

class UploadImage extends Component {
  state = {
    uri: '',
  };
  choosePicture = () => {
    var options = {
      title: 'Pilih Gambar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response.fileName);
        this.setState({
          srcImg: {uri: response.uri},
          uri: response.uri,
          fileName: response.fileName,
        });
      }
    });
  };
  uploadPicture = () => {
    console.log('mulai upload');
    this.setState({loading: true});

    const data = new FormData();
    data.append('id', 'id apa saja'); // you can append anyone.
    data.append('picture', {
      uri: this.state.uri,
      type: 'image/jpeg',
      name: this.state.fileName,
    });
    data.append('nama', 'FC');
    const url = API.API_URL.concat('auth/update-profile');

    axios
      .patch(API.API_URL.concat('auth/update-profile'), data)
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err));

    //
    var api = axios.create({
      baseUrl: API.API_URL.concat('auth/update-profile'),
    });
    api
      .patch('picture', data)
      .then(res => console.log(res, 'berhasil'))
      .catch(error => console.log(error, 'EROR'));
  };

  render() {
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
            onPress={this.choosePicture}
            activeOpacity={0.7}
            source={{
              uri: this.state.uri,
            }}
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
              containerStyle={{
                marginTop: -30,
                borderRadius: 4,
                borderWidth: 0,
              }}>
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
              onPress={this.uploadPicture}
              title="Logout"
              buttonStyle={{backgroundColor: myColors.ORANGE}}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
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
