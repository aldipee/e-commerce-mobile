import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet, Platform} from 'react-native';
import {Card, Avatar, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {API} from '../../config/server';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
// Local
import myColors from '../../config/colors';
import {setLogout} from '../../redux/actions/AuthActions';
import axios from 'axios';

class UploadImage extends Component {
  state = {
    uri: '',
    upload: false,
    image: {uri: API.API_URL_STATIC.concat(this.props.route.params.avatar)},
  };
  //Handle Choose Picture
  choosePicture = () => {
    var options = {
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
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          image: response,
        });
      }
    });
  };

  uploadPicture = () => {
    const formData = new FormData();
    this.setState({upload: true});
    formData.append('picture', {
      uri: this.state.image.uri,
      type: this.state.image.type, // <-  Did you miss that one?
      name: this.state.image.fileName,
    }); // you can append anyone.

    // formData.append('file', file);
    axios({
      method: 'put',
      url: API.API_URL.concat('auth/update-pic'),
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'},
    })
      .then(data => {
        console.log(data);
        this.props.navigation.goBack();
      })
      .catch(err => console.log({err}, 'SSS'));
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
              uri: this.state.image.uri,
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
              title="Upload"
              loading={this.state.upload}
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
