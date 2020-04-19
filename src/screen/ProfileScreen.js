import React, {useState, useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {Card, colors, Avatar, Button, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {convertToRupiah} from '../utils/convert';
import {getProfileDetail} from '../redux/actions/AuthActions';

// Local
import myColors from '../config/colors';
import {setLogout} from '../redux/actions/AuthActions';
import MainHome from '../screen/MainHome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {API} from '../config/server';

function ProfileScreen(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [profileDataa, setProfileData] = useState(null);
  useFocusEffect(
    useCallback(() => {
      props.getProfileDetail();
      async function getData() {
        const data = fetchData();
        return data;
      }
      getData().then(data => {
        console.log(data);
        setProfileData(data);
        setIsLoading(false);
      });
    }, []),
  );
  useEffect(() => {}, []);

  const fetchData = () => {
    return new Promise((resolve, reject) => {
      if (props.data.token !== '') {
        resolve(props.data);
      }
    });
  };

  // useEffect(() => {
  //   props.getProfileDetail();
  // }, []);

  const onLogout = status => {
    props.setLogout(data => {
      if (data) {
        props.navigation.navigate('Home');
      } else {
      }
    });
  };

  const {profileData} = props.data;
  return (
    <ScrollView>
      {profileData && (
        <>
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
              size="large"
              source={{
                uri: profileData.photo
                  ? API.API_URL_STATIC.concat(profileData.photo)
                  : null,
              }}
              title={profileData.photo ? profileData.photo : 'AP'}
              onPress={() => props.navigation.navigate('UploadImage')}
              activeOpacity={0.7}
            />
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                color: myColors.WHITE,
                marginTop: 10,
              }}>
              {profileData.full_name}
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
                    <Icon
                      name="wallet"
                      size={35}
                      color={myColors.SECOND_BLUE}
                    />
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
                        {profileData &&
                          profileData.balance &&
                          convertToRupiah(profileData.balance)}
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
            {/* Purhcase History */}
            <View style={{marginTop: 25}}>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10}}>
                Riwayat Transaksi
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}>
                <View style={localStyle.iconBox}>
                  <FeatherIcon
                    name="credit-card"
                    color={myColors.MAIN_GREY}
                    size={30}
                  />
                  <Text style={localStyle.iconDesc}> Menunggu Pembayaran</Text>
                </View>
                <View style={localStyle.iconBox}>
                  <FeatherIcon
                    name="box"
                    color={myColors.MAIN_GREY}
                    size={30}
                  />
                  <Text style={localStyle.iconDesc}> Diproses</Text>
                </View>
                <View style={localStyle.iconBox}>
                  <FeatherIcon
                    name="truck"
                    color={myColors.MAIN_GREY}
                    size={30}
                  />
                  <Text style={localStyle.iconDesc}> Dikirim</Text>
                </View>
                <View style={localStyle.iconBox}>
                  <FeatherIcon
                    name="box"
                    color={myColors.MAIN_GREY}
                    size={30}
                  />
                  <Text style={localStyle.iconDesc}> Selesai</Text>
                </View>
              </View>
            </View>
            {/* Data Diri Here */}
            <View style={{marginVertical: 30}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Data Diri</Text>
              <View>
                <ListItem
                  containerStyle={{paddingLeft: 1}}
                  title={'Email'}
                  subtitle={profileData && profileData.email}
                  rightTitle={'Terverifikasi'}
                  rightTitleStyle={{fontSize: 11}}
                  titleStyle={{fontSize: 12, color: myColors.MAIN_GREY}}
                  bottomDivider
                />
                <ListItem
                  containerStyle={{paddingLeft: 1}}
                  title={'Nomor Handphone'}
                  subtitle={profileData && profileData.phone}
                  rightTitle={'Terverifikasi'}
                  rightTitleStyle={{fontSize: 11}}
                  titleStyle={{fontSize: 12, color: myColors.MAIN_GREY}}
                  bottomDivider
                />
                <ListItem
                  containerStyle={{paddingLeft: 1}}
                  title={'Alamat'}
                  subtitle={
                    profileData.address &&
                    `${profileData.address[0].street}, ${
                      profileData.address[0].city
                    }, ${profileData.address[0].district} - ${
                      profileData.address[0].postcode
                    }`
                  }
                  rightTitleStyle={{fontSize: 11}}
                  titleStyle={{fontSize: 12, color: myColors.MAIN_GREY}}
                  bottomDivider
                />
                {/* {['Alamat', 'Tanggal lahir'].map((data, index) => (
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('AddAddress')}>
                    <ListItem
                      containerStyle={{paddingLeft: 1}}
                      key={index}
                      title={data}
                      titleStyle={{fontSize: 14, color: myColors.BLACK}}
                      bottomDivider
                      chevron
                    />
                  </TouchableOpacity>
                ))} */}
              </View>
            </View>
            {/* End of Data diri */}
            <View style={{marginBottom: 20}}>
              <Button
                onPress={onLogout}
                title="Logout"
                buttonStyle={{backgroundColor: myColors.ORANGE}}
              />
            </View>
          </View>
        </>
      )}
      {/* Avatar and Picture */}
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

const masStateToProps = state => {
  return {
    data: state.authData,
  };
};

export default connect(
  masStateToProps,
  {setLogout, getProfileDetail},
)(ProfileScreen);
