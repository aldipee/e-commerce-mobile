/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {SearchBar, Card, ListItem} from 'react-native-elements';
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Slider,
  Button,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {getProducts} from '../redux/actions/ProductActions';
import colors from '../config/colors';
import RadioButton from '../components/RadioButton';
import Modal from 'react-native-modal';
import {convertToRupiah} from '../utils/convert';
import {API} from '../config/server';
function SearchScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [maxFilter, setMaxFilter] = useState(props.route.params.maxPrice);
  const [minFilter, setMinFilter] = useState(props.route.params.minPrice);
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState({
    key: {key: 'idProduct', value: '0'},
  });

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    console.log(ref.current, value.data, 'Shi');
    return ref.current;
  }
  const onSeachKeyword = keyword => {
    setLoading(true);
    if (showData !== '') {
      setShowData(true);
    } else {
      setShowData(false);
    }

    const query2 = `product/all?search[key]=products.name&search[value]=${keyword}&sort[key]=${
      filterData.key.key
    }&sort[value]=${
      filterData.key.value
    }&limit=10&maxPrice=${maxFilter}&minPrice=${minFilter}`;
    const query = `product/all?search[key]=products.name&search[value]=${keyword}&limit=10`;
    props.getProducts(query2, success => {
      if (success) {
        setLoading(false);
      }
    });
  };
  const optionsSort = [
    {
      id: 1,
      key: {value: 0, key: 'idProduct'},
      text: 'Terbaru',
    },
    // {
    //   id: 2,
    //   key: 'terlaris',
    //   text: 'Terlaris',
    // },
    {
      id: 3,
      key: {value: 1, key: 'price'},
      text: 'Termurah',
    },
    {
      id: 4,
      key: {value: 0, key: 'price'},
      text: 'Termahal',
    },
  ];

  const options = [
    // {
    //   key: 'pay',
    //   text: 'Man',
    // },
    // {
    //   key: 'performance',
    //   text: 'Woman',
    // },
    // {
    //   key: 'aToZ',
    //   text: 'Sport',
    // },
  ];

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const onSubmitFilter = () => {
    setLoading(true);
    if (filterData) {
      const query = `product/all?search[key]=products.name&search[value]=${searchKeyword}&sort[key]=${
        filterData.key.key
      }&sort[value]=${
        filterData.key.value
      }&limit=10&maxPrice=${maxFilter}&minPrice=${minFilter}`;
      props.getProducts(query, status => {
        if (status) {
          setLoading(false);
        }
      });
      setShowFilter(!showFilter);
    }
  };

  // Item will be rendered when search show
  const renderItem = ({item}) => {
    console.log(API.API_URL_STATIC.concat(item.thumbnail));
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('ProductDetails', {data: item})
        }>
        <ListItem
          containerStyle={{marginVertical: 2}}
          title={item.name}
          titleStyle={{fontSize: 14, paddingBottom: 5}}
          subtitle={`${convertToRupiah(item.price)} | AT-3300405`}
          leftAvatar={{
            source: {uri: API.API_URL_STATIC.concat(item.picture)},
            rounded: false,
          }}
          bottomDivider
          chevron
        />
      </TouchableOpacity>
    );
  };

  const renderFlatList = !loading ? (
    <FlatList
      style={{padding: 5}}
      data={props.data.searchData && props.data.searchData}
      renderItem={searchKeyword ? renderItem : null}
    />
  ) : (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );

  return (
    <SafeAreaView>
      {/* Modal for Filtering */}
      <Modal isVisible={showFilter} style={{margin: 0}} coverScreen={true}>
        <View style={{flex: 1}}>
          <View
            style={{
              backgroundColor: colors.WHITE,
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: 380,
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
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                Filter Search
              </Text>
              <TouchableOpacity onPress={() => toggleFilter()}>
                <Icon name="md-close" size={23} />
              </TouchableOpacity>
            </View>
            {/* Start of Minimum Price */}
            <View style={{paddingHorizontal: 15, paddingVertical: 10}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    color: colors.MAIN_GREY,
                    fontWeight: 'bold',
                  }}>
                  Minimum Price
                </Text>
                <Text style={{fontWeight: 'bold'}}>
                  {convertToRupiah(Math.round(minFilter))}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  marginBottom: -10,
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    color: colors.DODGER_BLUE,
                  }}>
                  {convertToRupiah(props.route.params.minPrice)}
                </Text>
                <Text
                  style={{
                    color: colors.DODGER_BLUE,
                  }}>
                  {convertToRupiah(props.route.params.maxPrice)}
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'stretch',
                    justifyContent: 'center',
                  }}>
                  <Slider
                    value={minFilter}
                    minimumValue={props.route.params.minPrice}
                    thumbTintColor={colors.DODGER_BLUE}
                    trackStyle={{backgroundColor: colors.DODGER_BLUE}}
                    maximumValue={props.route.params.maxPrice}
                    onValueChange={value => setMinFilter(Math.round(value))}
                  />
                </View>
              </View>
            </View>
            {/* Maximum Price */}
            <View style={{paddingHorizontal: 15, paddingVertical: 10}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    color: colors.MAIN_GREY,
                    fontWeight: 'bold',
                  }}>
                  Maximum Price
                </Text>
                <Text style={{fontWeight: 'bold'}}>
                  {convertToRupiah(Math.round(maxFilter))}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  marginBottom: -10,
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    color: colors.DODGER_BLUE,
                  }}>
                  {convertToRupiah(props.route.params.minPrice)}
                </Text>
                <Text
                  style={{
                    color: colors.DODGER_BLUE,
                  }}>
                  {convertToRupiah(props.route.params.maxPrice)}
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'stretch',
                    justifyContent: 'center',
                  }}>
                  <Slider
                    value={maxFilter}
                    minimumValue={props.route.params.minPrice}
                    thumbTintColor={colors.DODGER_BLUE}
                    maximumValue={props.route.params.maxPrice}
                    onValueChange={value => setMaxFilter(Math.round(value))}
                  />
                </View>
              </View>
            </View>
            {/* End of Maximum Price */}
            <View style={{paddingHorizontal: 15}}>
              <Text
                style={{
                  color: colors.MAIN_GREY,
                  fontWeight: 'bold',
                  marginBottom: 8,
                }}>
                Urutkan
              </Text>
              <RadioButton
                options={optionsSort}
                callback={data => setFilterData(data)}
              />
            </View>
            <View style={{paddingHorizontal: 20}}>
              <Button
                title="Filter"
                onPress={onSubmitFilter}
                loading={loading}
                disabled={loading}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* End of Modal for Filtering */}
      <View style={{backgroundColor: '#fff', height: '100%'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Icon
              name="ios-arrow-round-back"
              size={33}
              color={colors.MAIN_GREY}
            />
          </TouchableOpacity>
          <SearchBar
            onChangeText={keyword => setSearchKeyword(keyword)}
            value={searchKeyword}
            searchIcon={false}
            onSubmitEditing={() => onSeachKeyword(searchKeyword)}
            placeholder="Coba cari 'sepatu nike '...."
            cancelIcon={{name: 'arrow-left', color: 'red', type: 'feather'}}
            containerStyle={{
              backgroundColor: colors.WHITE,
              borderTopWidth: 0,
              borderBottomColor: '#fff',
              paddingTop: 5,
              paddingBottom: -3,
              width: '98%',
            }}
            inputContainerStyle={{
              backgroundColor: colors.WHITE,
              height: 46,
            }}
            inputStyle={{fontSize: 14}}
            underlineColorAndroid={colors.MAIN_GREY}
          />
        </View>

        {/* Brand search button card */}

        {/* <View>
          <Card containerStyle={localStyle.cardBrand}>
            <View style={localStyle.iconContianer}>
              <TouchableOpacity style={localStyle.iconItem}>
                <Icon />
                <Text>Nike</Text>
              </TouchableOpacity>
              <TouchableOpacity style={localStyle.iconItem}>
                <Icon />
                <Text>Nike</Text>
              </TouchableOpacity>
              <TouchableOpacity style={localStyle.iconItem}>
                <Icon />
                <Text>Nike</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View> */}
        {showData && (
          <View
            style={{
              paddingHorizontal: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <RadioButton options={options} />
            <TouchableOpacity onPress={() => toggleFilter()}>
              <Icon name="ios-options" size={30} />
            </TouchableOpacity>
          </View>
        )}
        {showData && renderFlatList}

        <ScrollView />
      </View>
    </SafeAreaView>
  );
}

const localStyle = StyleSheet.create({
  cardBrand: {
    marginVertical: 10,
    borderRadius: 4,
    backgroundColor: colors.WHITE,
    padding: 5,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  iconContianer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  iconItem: {
    backgroundColor: 'red',
    padding: 15,
    marginTop: 9,
    marginHorizontal: 15,
  },
});

const mapStateToProps = state => ({
  data: state.productData,
});

const mapDispatchToProps = {getProducts};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchScreen);
