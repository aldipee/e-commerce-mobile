import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Card, SearchBar} from 'react-native-elements';
//ICON
import SoccerIcon from 'react-native-vector-icons/FontAwesome';
import BasketBallIcon from 'react-native-vector-icons/FontAwesome5';
import SneakerIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CasualIcon from 'react-native-vector-icons/Fontisto';

// Redux
import {connect} from 'react-redux';
import {getProductsHome} from '../redux/actions/ProductActions';
import {getProfileDetail} from '../redux/actions/AuthActions';
// Lokal Config
import BalanceCard from '../components/MainHome/BalanceCard';
import colors from '../config/colors';
import SecondHorizontalProducts from '../components/MainHome/HorizontalProducts2';
import VerticalProducts from '../components/MainHome/VerticalProducts';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

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
  paginationDot: {
    width: 8,
    height: 5,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  iconContianer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconItem: {
    alignItems: 'center',
    padding: 8,
    marginTop: 9,
    width: 110,
  },
});

const HomeForm = props => {
  const searchOnFocus = () => {
    const priceData = {
      maxPrice: Math.max.apply(null, props.data.data.map(item => item.price)),
      minPrice: Math.min.apply(null, props.data.data.map(item => item.price)),
    };
    props.navigation.navigate('SearchScreen', priceData);
  };

  useFocusEffect(
    useCallback(() => {
      props.getProductsHome();
      props.getProfileDetail();
    }, []),
  );

  return (
    <>
      <StatusBar backgroundColor="#fff" />
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={searchOnFocus}>
          <SearchBar
            disabled={true}
            placeholder="Type Here..."
            containerStyle={{
              backgroundColor: colors.SECOND_BLUE,
              borderBottomColor: '#fff',
              borderTopColor: '#fff',
              borderBottomWidth: 0,
              paddingTop: 5,
              paddingBottom: 8,
            }}
            inputContainerStyle={{
              backgroundColor: colors.SECOND_GREY,
              height: 46,
            }}
            inputStyle={{fontSize: 14}}
            underlineColorAndroid={colors.MAIN_GREY}
          />
        </TouchableWithoutFeedback>

        <Card
          containerStyle={{
            borderTopWidth: 0,
            borderRightWidth: 0,
            borderLeftWidth: 0,
            borderBottomWidth: 0,
            borderRadius: 5,
            marginBottom: 10,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.8,
            shadowRadius: 2,
          }}
        />

        <ScrollView style={localStyle.cardContainer}>
          <SecondHorizontalProducts
            items={props.data.data && props.data.data}
            navigation={props.navigation}
            buttonColor="orange"
          />

          {/* Horizontal Scroll */}
          <View
            style={{
              backgroundColor: colors.SECOND_BLUE,
              paddingBottom: 20,
              marginTop: 9,
              marginBottom: 20,
            }}>
            <Text
              style={{
                color: colors.WHITE,
                fontSize: 20,
                fontWeight: 'bold',
                marginLeft: 15,
                marginTop: 5,
                marginBottom: -30,
              }}>
              New Arrivals!
            </Text>
            <SecondHorizontalProducts
              items={props.data.data && props.data.data}
              navigation={props.navigation}
              buttonColor="orange"
            />
          </View>
          {/* End of Horizontal Scroll */}
        </ScrollView>
        {/* End of Scroll Vertical */}
      </SafeAreaView>
    </>
  );
};

const mapStateToProps = state => ({
  data: state.productData,
  userData: state.authData.profileData,
});

const mapDispatchToProps = {
  getProductsHome,
  getProfileDetail,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeForm);
