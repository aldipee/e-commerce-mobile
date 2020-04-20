import React, { useState } from 'react'
import { SearchBar, Card, ListItem } from 'react-native-elements'
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { connect } from 'react-redux'
import { getProducts } from '../redux/actions/ProductActions'
import colors from '../config/colors'
import { convertToRupiah } from '../utils/convert'
import { API } from '../config/server'

function SearchScreen(props) {
  const onSeachKeyword = keyword => {
    setSearchKeyword(keyword)
    const query = `product/all?search[key]=products.name&search[value]=${keyword}&limit=10`
    props.getProducts(query)
  }
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchData, setSearchData] = useState([])

  const searchByBrand = data => {
    // going to show product with particular brand
  }

  // Item will be rendered when search show
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => props.navigation.navigate('ProductDetails', { data: item })}>
      <ListItem
        containerStyle={{ marginVertical: 2 }}
        title={item.name}
        titleStyle={{ fontSize: 14, paddingBottom: 5 }}
        subtitle={`${convertToRupiah(item.price)} | AT-3300405`}
        leftAvatar={{
          source: { uri: API.API_URL_STATIC.concat(item.picture) },
          rounded: false,
        }}
        bottomDivider
        chevron
      />
    </TouchableOpacity>
  )

  const keyExtractor = []

  return (
    <SafeAreaView>
      <SearchBar
        onChangeText={keyword => onSeachKeyword(keyword)}
        value={searchKeyword}
        placeholder="Coba cari 'sepatu nike '...."
        cancelIcon={{ name: 'arrow-left', color: 'red', type: 'feather' }}
        containerStyle={{
          backgroundColor: colors.SECOND_BLUE,
          borderTopWidth: 0,
          borderBottomColor: '#fff',
          paddingTop: 5,
          paddingBottom: 8,
        }}
        inputContainerStyle={{
          backgroundColor: colors.WHITE,
          height: 46,
        }}
        inputStyle={{ fontSize: 14 }}
        underlineColorAndroid={colors.MAIN_GREY}
      />
      {/* Brand search button card */}
      {!searchKeyword && (
        <View>
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
        </View>
      )}
      {/* End of search brand in here */}

      {/* Searched item will be rendere here with flatlist */}
      <FlatList
        style={{ padding: 5 }}
        data={props.data.data && props.data.data}
        renderItem={searchKeyword ? renderItem : null}
      />
      {/* End Searched Item here */}
      <ScrollView />
    </SafeAreaView>
  )
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
})

const mapStateToProps = state => ({
  data: state.productData,
})

const mapDispatchToProps = { getProducts }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen)
