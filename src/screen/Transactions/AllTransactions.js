import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Card, Button, ListItem} from 'react-native-elements';
import DataNotFound from '../Others/DataNotFound';

import {getTransaction} from '../../redux/actions/AuthActions';
import {convertToRupiah, converDate} from '../../utils/convert';
import {getStatus} from '../../utils/showDetail';
import {connect} from 'react-redux';

import myColors from '../../config/colors';
import {API} from '../../config/server';

function AllTransactions(props) {
  const [isLoading, setIsLoading] = useState(true);
  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      setTimeout(() => {
        props.getTransaction(props.route.params && props.route.params.itemId);
        setIsLoading(false);
      }, 1000);
    }, []),
  );

  const onRefresh = () => {
    console.log('lalala');
  };

  let items;
  if (!props.data) {
    items = <DataNotFound message="Yaah, kamu gak punya transaksi nih" />;
  } else {
    items =
      props.data &&
      props.data.map((data, index) => (
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
              </View>
              {/* Product */}
              <View>
                <ListItem
                  containerStyle={{marginVertical: 2}}
                  title={`${
                    data.transactionDetail.length !== 0
                      ? data.transactionDetail[0].name
                      : null
                  }`}
                  titleStyle={{fontSize: 14, paddingBottom: 5}}
                  subtitle={
                    data.transactionDetail.length !== 0
                      ? convertToRupiah(data.transactionDetail[0].price)
                      : null
                  }
                  leftAvatar={{
                    source: {
                      uri: API.API_URL_STATIC.concat(
                        data.transactionDetail.length !== 0
                          ? data.transactionDetail[0].picture
                          : null,
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
      ));
  }

  return (
    <View>
      <View>
        {!isLoading ? (
          items
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'space-around',
              paddingTop: 20,
              flexDirection: 'row',
            }}>
            <ActivityIndicator size="large" color={myColors.MAIN_BLUE} />
          </View>
        )}
      </View>
    </View>
  );
}

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
