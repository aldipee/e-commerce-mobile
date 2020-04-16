import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Alert,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Card, Button, Tile, SearchBar, Image} from 'react-native-elements';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {itemWidth, sliderWidth} from '../style/SlideEntry';

import Icon from 'react-native-vector-icons/Ionicons';

// Lokal Config
import {convertToRupiah} from '../utils/convert';
import colors from '../config/colors';

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
    borderColor: colors.MAIN_GREY,
    padding: 15,
    marginTop: 9,
    width: 130,
  },
});

const HomeForm = props => {
  const searchOnFocus = () => {
    props.navigation.navigate('SearchScreen');
  };
  const [currentSlider, setCurrentSlider] = useState(1);
  const [slider1ActiveSlide, setSlider1ActiveSlide] = useState(1);
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
      <Card containerStyle={{padding: 5, borderRadius: 3, width: '80%'}}>
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
      </Card>
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
            backgroundColor: '#fff',
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
          showLoading={true}
          underlineColorAndroid={colors.MAIN_GREY}
        />

        <ScrollView style={localStyle.cardContainer}>
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
              autoplayInterval={3000}
              onSnapToItem={index => setSlider1ActiveSlide(index)}
            />
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
          </Card>

          <Card
            containerStyle={{
              borderTopWidth: 0,
              borderRightWidth: 0,
              borderLeftWidth: 0,
              borderBottomWidth: 0,
              borderRadius: 5,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.8,
              shadowRadius: 2,
            }}>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  textTransform: 'uppercase',
                  color: colors.MAIN_GREY,
                }}>
                Your balance
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  {convertToRupiah(130000)}
                </Text>
                <Button
                  containerStyle={{marginTop: -16}}
                  icon={<Icon name="md-wallet" size={18} color="#fff" />}
                  title="Top up"
                />
              </View>
            </View>
          </Card>
          <Card
            containerStyle={{
              borderTopWidth: 0,
              borderRightWidth: 0,
              borderLeftWidth: 0,
              borderBottomWidth: 0,
              borderRadius: 5,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.8,
              shadowRadius: 2,
            }}>
            <View style={localStyle.iconContianer}>
              <TouchableOpacity style={localStyle.iconItem}>
                <Icon name="md-tennisball" color={colors.ORANGE} size={35} />
                <Text>Sepatu Futsal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={localStyle.iconItem}>
                <Icon name="md-tennisball" color={colors.ORANGE} size={35} />
                <Text>Sepatu Bola</Text>
              </TouchableOpacity>
              <TouchableOpacity style={localStyle.iconItem}>
                <Icon name="md-tennisball" color={colors.ORANGE} size={35} />
                <Text>Sepatu Casual</Text>
              </TouchableOpacity>
              <TouchableOpacity style={localStyle.iconItem}>
                <Icon name="md-tennisball" color={colors.ORANGE} size={35} />
                <Text>Sepatu Sneaker</Text>
              </TouchableOpacity>
            </View>

            <View />
          </Card>
          {/* Horizontal Scroll */}
          <View
            style={{
              backgroundColor: colors.SECOND_BLUE,
              paddingBottom: 20,
              marginTop: 9,
              marginBottom: 20,
            }}>
            <Carousel
              data={[1, 2, 3, 4, 5]}
              renderItem={_renderItemHorizontalProduct}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              inactiveSlideScale={0.95}
              inactiveSlideOpacity={1}
              enableMomentum={false}
              activeSlideAlignment={'start'}
              containerCustomStyle={{
                marginRight: 0,
              }}
              contentContainerCustomStyle={{
                paddingRight: 0,
              }}
              activeAnimationType={'spring'}
              activeAnimationOptions={{
                friction: 4,
                tension: 40,
              }}
            />
          </View>
          {/* End of Horizontal Scroll */}

          {/* Start Scroll Vertical */}
          <Text style={{marginLeft: 8, fontSize: 18, fontWeight: 'bold'}}>
            Terlaris
          </Text>
          <View
            style={{
              marginBottom: 100,
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {[1, 2, 3, 4, 5, 6].map((data, index) => (
              <Card
                containerStyle={{
                  borderTopWidth: 0,
                  borderRightWidth: 0,
                  borderLeftWidth: 0,
                  borderBottomWidth: 0,
                  marginHorizontal: 0,
                  width: '48%',
                  padding: 2,
                  marginLeft: 5,
                  borderRadius: 1,
                  marginBottom: 0,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                }}>
                <Image
                  source={{
                    uri:
                      'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/2/22/batch-upload/batch-upload_bd2f7280-355f-4985-8353-accfd559937a.jpg',
                  }}
                  style={{width: '100%', height: 150}}
                  PlaceholderContent={<ActivityIndicator />}
                />
                <View style={{padding: 5}}>
                  <Text style={{textAlign: 'center'}}>
                    Sepatu Futsal Adidas Nemeziz 19.3
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        color: colors.ORANGE,
                        marginTop: 5,
                      }}>
                      Rp 860.000
                    </Text>
                    <Text style={{fontSize: 9, marginTop: 9}}>300 Terjual</Text>
                  </View>
                </View>
                <View style={{padding: 10}}>
                  <Button
                    title="Beli"
                    buttonStyle={{borderRadius: 1}}
                    titleStyle={{fontSize: 14}}
                  />
                </View>
              </Card>
            ))}
          </View>
          {/* End of Scroll Vertical */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeForm;
