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
import {Card, Tile, SearchBar} from 'react-native-elements';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {itemWidth, sliderWidth} from '../style/SlideEntry';
import Icon from 'react-native-vector-icons/Ionicons';
//ICON
import SoccerIcon from 'react-native-vector-icons/FontAwesome';
import BasketBallIcon from 'react-native-vector-icons/FontAwesome5';
import SneakerIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CasualIcon from 'react-native-vector-icons/Fontisto';

// Redux
import {connect} from 'react-redux';
import {getProducts} from '../redux/actions/ProductActions';
import {getProfileDetail} from '../redux/actions/AuthActions';
// Lokal Config
import BalanceCard from '../components/MainHome/BalanceCard';
import colors from '../config/colors';
import HorizontalProducts from '../components/MainHome/HorizontalProducts';
import VerticalProducts from '../components/MainHome/VerticalProducts';

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
    flexWrap: 'wrap',
  },
  iconItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: colors.SECOND_GREY,
    padding: 8,
    marginTop: 9,
    width: 110,
  },
});

const HomeForm = props => {
  const searchOnFocus = () => {
    props.navigation.navigate('SearchScreen');
  };
  const [currentSlider, setCurrentSlider] = useState(1);
  const [slider1ActiveSlide, setSlider1ActiveSlide] = useState(1);

  useFocusEffect(
    useCallback(() => {
      props.getProducts();
      props.getProfileDetail();
    }, []),
  );

  const _renderItem = ({item, index}) => {
    return (
      <Tile
        imageSrc={require('../../src/banner.jpeg')}
        titleStyle={{fontSize: 10}}
        contentContainerStyle={{
          backgroundColor: 'red',
          height: 0,
          flex: 0,
        }}
        width={300}
        height={150}
      />
    );
  };

  const _renderItemHorizontalProduct = ({item, index}) => {
    return (
      <Tile
        imageSrc={require('../../src/product.jpg')}
        width={'100%'}
        height={400}
        imageContainerStyle={{borderRadius: 3}}>
        <View>
          <View style={{marginTop: -30}}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: colors.BLACK,
              }}>
              Sepatu Futsal Nike Phantom Venom
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: colors.ORANGE,
                  fontWeight: 'bold',
                }}>
                Rp 874.000
              </Text>
              <Text style={{color: colors.MAIN_GREY, fontWeight: 'bold'}}>
                340 Terjual
              </Text>
            </View>
          </View>
        </View>
      </Tile>
    );
  };

  return (
    <>
      <StatusBar backgroundColor="#fff" />
      <SafeAreaView>
        <SearchBar
          onFocus={() => searchOnFocus()}
          placeholder="Type Here..."
          containerStyle={{
            backgroundColor: colors.SECOND_BLUE,
            borderBottomColor: '#fff',
            borderTopColor: '#fff',
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

        <ScrollView style={localStyle.cardContainer}>
          <View>
            <Card>
              <Carousel
                ref={c => setCurrentSlider(c)}
                data={[1, 2, 3, 4, 5]}
                renderItem={_renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                hasParallaxImages={true}
                inactiveSlideScale={0.94}
                inactiveSlideOpacity={0.7}
                loop={true}
                loopClonesPerSide={2}
                autoplay={true}
                autoplayDelay={500}
                autoplayInterval={1400}
                onSnapToItem={index => setSlider1ActiveSlide(index)}
              />
            </Card>
            <Pagination
              style={{paddingTop: -40}}
              dotsLength={5}
              activeDotIndex={slider1ActiveSlide}
              dotColor={'rgba(255, 255, 255, 0.92)'}
              dotStyle={localStyle.paginationDot}
              inactiveDotColor={colors.black}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={currentSlider}
              tappableDots={!!currentSlider}
            />
          </View>

          <Card
            containerStyle={{
              borderTopWidth: 0,
              borderRightWidth: 0,
              borderLeftWidth: 0,
              borderBottomWidth: 0,
              borderRadius: 5,
              marginBottom: 30,
              marginTop: -10,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.8,
              shadowRadius: 2,
            }}>
            <View style={localStyle.iconContianer}>
              <TouchableOpacity style={localStyle.iconItem}>
                <BasketBallIcon
                  name="basketball-ball"
                  color={colors.SECOND_BLUE}
                  size={35}
                />
                <Text
                  style={{
                    marginTop: 5,
                    fontSize: 11,
                    fontWeight: 'bold',
                    color: colors.MAIN_GREY,
                    textTransform: 'uppercase',
                  }}>
                  Sepatu Futsal
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={localStyle.iconItem}>
                <SoccerIcon
                  name="soccer-ball-o"
                  color={colors.SECOND_BLUE}
                  size={35}
                />
                <Text
                  style={{
                    marginTop: 5,
                    fontSize: 11,
                    fontWeight: 'bold',
                    color: colors.MAIN_GREY,
                    textTransform: 'uppercase',
                  }}>
                  Sepatu Bola
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={localStyle.iconItem}>
                <CasualIcon
                  name="sunglasses-alt"
                  color={colors.SECOND_BLUE}
                  size={35}
                />
                <Text
                  style={{
                    marginTop: 5,
                    fontSize: 11,
                    fontWeight: 'bold',
                    color: colors.MAIN_GREY,
                    textTransform: 'uppercase',
                  }}>
                  Sepatu Casual
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={localStyle.iconItem}>
                <SneakerIcon
                  name="run-fast"
                  color={colors.SECOND_BLUE}
                  size={35}
                />
                <Text
                  style={{
                    marginTop: 5,
                    fontSize: 11,
                    fontWeight: 'bold',
                    color: colors.MAIN_GREY,
                    textTransform: 'uppercase',
                  }}>
                  Sepatu Sneaker
                </Text>
              </TouchableOpacity>
            </View>

            <View />
          </Card>
          {props.userData && props.userData.username && (
            <BalanceCard balance={props.userData.balance} />
          )}

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
                marginTop: 10,
                marginBottom: -10,
              }}>
              New Arrivals!
            </Text>
            <HorizontalProducts
              items={props.data.data && props.data.data}
              navigation={props.navigation}
              buttonColor="orange"
            />
          </View>
          {/* End of Horizontal Scroll */}

          <HorizontalProducts
            title="Product Terbaik"
            items={props.data.data && props.data.data}
            navigation={props.navigation}
          />

          {/* Start Scroll Vertical */}
          <VerticalProducts
            title="Paling laris"
            items={props.data.data && props.data.data}
            navigation={props.navigation}
          />
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
  getProducts,
  getProfileDetail,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeForm);
