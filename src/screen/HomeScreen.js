import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Card, Button, Tile, SearchBar} from 'react-native-elements';
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
});

const HomeForm = () => {
  const searchOnFocus = () => {
    Alert.alert('OOOO');
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
            title={`Pick up your trip !`}
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
              <Text>Hola</Text>
            </View>

            <View />
            <Button
              icon={{name: 'search', color: '#fff'}}
              backgroundColor={colors.ORANGE}
              buttonStyle={localStyle.button}
              title="Search "
            />
          </Card>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeForm;
