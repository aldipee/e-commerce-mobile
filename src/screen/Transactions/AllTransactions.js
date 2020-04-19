import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Card, Button, ListItem, CheckBox} from 'react-native-elements';
import DataNotFound from '../Others/DataNotFound';
import colors from '../../config/colors';
import {getTransaction} from '../../redux/actions/AuthActions';
import {convertToRupiah, converDate} from '../../utils/convert';
import {getStatus} from '../../utils/showDetail';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';

import myColors from '../../config/colors';
import {API} from '../../config/server';

function AllTransactions(props) {
  const [sortKey, setSortKey] = useState(0);
  const [sortValue, setSortValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      setTimeout(() => {
        props.getTransaction(props.route.params && props.route.params.itemId);
        setIsLoading(false);
      }, 1000);
    }, []),
  );

  const [refreshing, setRefreshing] = useState(false);
  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
  const onRefresh = React.useCallback(() => {
    Alert.alert('SSSS');
  }, []);

  let items;
  if (!props.data) {
    items = <DataNotFound message="Yaah, kamu gak punya transaksi nih" />;
  } else {
    items = (
      <>
        {props.data.map((data, index) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('TrxDetails', {
                data,
                userData: props.userData,
              })
            }>
            <Card containerStyle={{borderWidth: 0}}>
              <View>
                <View
                  style={{
                    alignItems: 'flex-end',
                    marginTop: -6,
                    marginBottom: -4,
                  }}>
                  {getStatus(data.status)}
                </View>
                {/* Tanggal dan Nomor pesanan */}
                <View
                  style={{
                    marginTop: 10,
                    borderBottomColor: myColors.SECOND_GREY,
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                  }}>
                  <Text style={{fontSize: 15}}>
                    {converDate(data.created_at)}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{color: myColors.MAIN_GREY}}>
                      Nomor Transaksi :
                    </Text>
                    <Text style={{color: myColors.MAIN_GREY}}>{`TR0000${
                      data.id
                    }`}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{color: myColors.MAIN_GREY}}>
                      Nomor Invoice :
                    </Text>
                    <Text
                      style={{
                        color: myColors.MAIN_GREY,
                      }}>{`#${data.invoice_number.toUpperCase()}`}</Text>
                  </View>
                </View>

                {/* Product */}
                <View>
                  <ListItem
                    containerStyle={{marginVertical: 2}}
                    title={`${data.transactionDetail[0].name}`}
                    titleStyle={{fontSize: 14, paddingBottom: 5}}
                    subtitle={
                      data.transactionDetail.length > 1
                        ? `${data.transactionDetail[0].quantity} pasang + ${data
                            .transactionDetail.length - 1} produk lain`
                        : `${data.transactionDetail[0].quantity} pasang`
                    }
                    leftAvatar={{
                      source: {
                        uri: API.API_URL_STATIC.concat(
                          data.transactionDetail[0].picture,
                        ),
                      },
                      rounded: false,
                    }}
                    bottomDivider
                    chevron
                  />
                </View>
                {/* TotalPayment */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text>Total Pembayaran:</Text>
                  <Text style={{fontSize: 17}}>
                    {convertToRupiah(data.total_price)}
                  </Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </>
    );
  }

  return (
    <View>
      <Modal isVisible={showModal} style={{margin: 0}} coverScreen={true}>
        <View style={{flex: 1}}>
          <View
            style={{
              backgroundColor: colors.WHITE,
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: 330,
            }}>
            <View
              style={{
                padding: 15,
                borderBottomColor: colors.SECOND_GREY,
                borderBottomWidth: 1,
                justifyContent: 'space-between',
                alignContent: 'center',
                flexDirection: 'row',
              }}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Filter</Text>
              <TouchableOpacity onPress={toggleModal}>
                <Icon name="close" size={23} />
              </TouchableOpacity>
            </View>
            <View style={{paddingHorizontal: 15, paddingVertical: 10}}>
              <View
                style={{
                  width: 100,
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              />
              <Text>Sorting berdasarkan</Text>
              <View style={{flexDirection: 'row'}}>
                <CheckBox
                  onPress={() => setSortKey(1)}
                  center
                  title="Total "
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={sortKey ? true : 0}
                />
                <CheckBox
                  center
                  title="Tanggal"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={!sortKey ? true : false}
                />
              </View>
              <Text>Urutan</Text>
              <View style={{flexDirection: 'row'}}>
                <CheckBox
                  onPress={() => setSortValue(1)}
                  center
                  title="Terbesar"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={sortValue ? true : 0}
                />
                <CheckBox
                  onPress={() => setSortValue(0)}
                  center
                  title="Terkecil"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={!sortValue ? true : false}
                />
              </View>
              <Button
                containerStyle={{marginTop: 40}}
                titleStyle={{fontSize: 14}}
                title="Tambah ke keranjang"
                buttonStyle={{backgroundColor: colors.ORANGE}}
              />
            </View>
          </View>
        </View>
      </Modal>
      <View>
        <View style={localStyle.fixedFooter}>
          <View style={{width: 300}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Button
                onPress={toggleModal}
                containerStyle={{margin: 0, justifyContent: 'flex-end'}}
                titleStyle={{fontSize: 14}}
                title="Filter"
                buttonStyle={{
                  backgroundColor: colors.ORANGE,
                  paddingHorizontal: 20,
                }}
              />
            </View>
          </View>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              title="Loading.."
              progressViewOffset={10}
              refreshing={isLoading}
              onRefresh={onRefresh}
            />
          }>
          {!isLoading ? (
            <View style={{marginTop: 10}}>{items}</View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'space-around',
                paddingTop: 130,
                flexDirection: 'row',
              }}>
              {/* <ActivityIndicator size="large" color={myColors.MAIN_BLUE} /> */}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const localStyle = StyleSheet.create({
  fixedFooter: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 100,
    },

    shadowOpacity: 0.8,
    shadowRadius: 12.35,

    elevation: 5,
    height: 50,
    backgroundColor: colors.WHITE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
  },
});

const mapStateToProps = state => {
  return {
    data: state.authData.history,
    userData: state.authData.profileData,
  };
};

const mapDispatchToProps = {getTransaction};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllTransactions);
