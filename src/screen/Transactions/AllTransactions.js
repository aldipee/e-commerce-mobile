import React, { useCallback, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { Card, Button, ListItem, CheckBox } from 'react-native-elements'
import DataNotFound from '../Others/DataNotFound'
import colors from '../../config/colors'
import { getTransaction, getTransactionLoadMore } from '../../redux/actions/AuthActions'
import { convertToRupiah, converDate } from '../../utils/convert'
import { getStatus } from '../../utils/showDetail'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/AntDesign'

import myColors from '../../config/colors'
import { API } from '../../config/server'

function AllTransactions(props) {
  const [sortKey, setSortKey] = useState(1)
  const [sortValue, setSortValue] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [momentumScroll, setMomentumScroll] = useState(true)
  const toggleModal = () => setShowModal(!showModal)
  useFocusEffect(
    useCallback(() => {
      setIsLoading(true)
      setTimeout(() => {
        props.getTransaction(props.route.params && props.route.params.itemId, {
          key: 0,
          sort: sortValue,
        })
        setIsLoading(false)
      }, 1000)
    }, [])
  )

  const onLoadMore = () => {
    if (!momentumScroll) {
      Alert.alert('Jalan BRO')
      setMomentumScroll(true)
    }
    // props.getTransactionLoadMore(
    //   props.route.params && props.route.params.itemId,
    //   {
    //     key: 0,
    //     sort: sortValue,
    //   },
    //   props.pageInfo.page + 1
    // )
  }
  const filterNow = () => {
    const conditions = {
      key: sortKey,
      sort: sortValue,
    }
    toggleModal()
    props.getTransaction(props.route.params && props.route.params.itemId, conditions)
  }
  const onRefresh = React.useCallback(() => {
    Alert.alert('SSSS')
  }, [isLoading])

  let items
  if (!props.data) {
    items = <DataNotFound message="Yaah, kamu gak punya transaksi nih" />
  } else {
    const { userData } = props
    items = (
      <>
        <FlatList
          onEndReached={onLoadMore}
          onEndReachedThreshold={1.9}
          onMomentumScrollBegin={() => setMomentumScroll(false)}
          data={props.data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('TrxDetails', {
                  item,
                  userData,
                })
              }>
              <Card containerStyle={{ borderWidth: 0 }}>
                <View>
                  <View
                    style={{
                      alignItems: 'flex-end',
                      marginTop: -6,
                      marginBottom: -4,
                    }}>
                    {getStatus(item.status)}
                  </View>
                  {/* Tanggal dan Nomor pesanan */}
                  <View
                    style={{
                      marginTop: 10,
                      borderBottomColor: myColors.SECOND_GREY,
                      borderBottomWidth: 1,
                      paddingBottom: 10,
                    }}>
                    <Text style={{ fontSize: 15 }}>{converDate(item.created_at)}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{ color: myColors.MAIN_GREY }}>Nomor Transaksi :</Text>
                      <Text style={{ color: myColors.MAIN_GREY }}>{`TR0000${item.id}`}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{ color: myColors.MAIN_GREY }}>Nomor Invoice :</Text>
                      <Text
                        style={{
                          color: myColors.MAIN_GREY,
                        }}>{`#${item.invoice_number.toUpperCase()}`}</Text>
                    </View>
                  </View>

                  {/* Product */}
                  <View>
                    <ListItem
                      containerStyle={{ marginVertical: 2 }}
                      title={`${item.transactionDetail[0].name}`}
                      titleStyle={{ fontSize: 14, paddingBottom: 5 }}
                      subtitle={
                        item.transactionDetail.length > 1
                          ? `${item.transactionDetail[0].quantity} pasang + ${item.transactionDetail
                              .length - 1} produk lain`
                          : `${item.transactionDetail[0].quantity} pasang`
                      }
                      leftAvatar={{
                        source: {
                          uri: API.API_URL_STATIC.concat(item.transactionDetail[0].picture),
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
                    <Text style={{ fontSize: 17 }}>{convertToRupiah(item.total_price)}</Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          )}
        />
      </>
    )
  }

  return (
    <View>
      <Modal isVisible={showModal} style={{ margin: 0 }} coverScreen={true}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: colors.WHITE,
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: 310,
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
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Filter</Text>
              <TouchableOpacity onPress={toggleModal}>
                <Icon name="close" size={23} />
              </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
              <View
                style={{
                  width: 90,
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              />
              <Text>Sorting berdasarkan</Text>
              <View style={{ flexDirection: 'row' }}>
                <CheckBox
                  onPress={() => setSortKey(1)}
                  center
                  title="Total "
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={sortKey ? true : false}
                />
                <CheckBox
                  onPress={() => setSortKey(0)}
                  center
                  title="Tanggal"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={!sortKey ? true : false}
                />
              </View>
              <Text>Urutan</Text>
              <View style={{ flexDirection: 'row' }}>
                <CheckBox
                  onPress={() => setSortValue(0)}
                  center
                  title="Terbesar"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={!sortValue ? true : false}
                />
                <CheckBox
                  onPress={() => setSortValue(1)}
                  center
                  title="Terkecil"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={sortValue ? true : false}
                />
              </View>
              <Button
                onPress={filterNow}
                containerStyle={{ marginTop: 10 }}
                titleStyle={{ fontSize: 14 }}
                title="Terapkan"
                buttonStyle={{ backgroundColor: colors.ORANGE }}
              />
            </View>
          </View>
        </View>
      </Modal>
      <View>
        <View style={localStyle.fixedFooter}>
          <View style={{ width: 300 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Button
                onPress={toggleModal}
                containerStyle={{ margin: 0, justifyContent: 'flex-end' }}
                titleStyle={{ fontSize: 14 }}
                title="Filter"
                buttonStyle={{
                  backgroundColor: colors.ORANGE,
                  paddingHorizontal: 20,
                }}
              />
            </View>
          </View>
        </View>
        <View>
          {!isLoading ? (
            <View style={{ marginTop: 10 }}>{items}</View>
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
        </View>
      </View>
    </View>
  )
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
})

const mapStateToProps = state => {
  return {
    data: state.authData.history.data,
    userData: state.authData.profileData,
    pageInfo: state.authData.history.pageInfo,
  }
}

const mapDispatchToProps = { getTransaction, getTransactionLoadMore }
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllTransactions)
