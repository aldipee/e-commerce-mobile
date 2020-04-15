import React, {useState} from 'react';
import {SearchBar, Card, ListItem} from 'react-native-elements';
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../config/colors';

function SearchScreen(props) {
  const onSeachKeyword = keyword => {
    console.log(keyword);
  };
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [dummyArray, setDummyArray] = useState(
    Array.from({length: 10}, () => Math.floor(Math.random() * 40)),
  );
  const searchByBrand = data => {
    // going to show product with particular brand
  };

  // Item will be rendered when search show
  const renderItem = ({item}) => (
    <TouchableOpacity>
      <ListItem
        containerStyle={{marginVertical: 2}}
        title={'Sepatu Futsal Nike Original'}
        titleStyle={{fontSize: 14, paddingBottom: 5}}
        subtitle={'Rp 540.000 | AT-3300405'}
        leftAvatar={{
          source: {uri: item.avatar_url},
          rounded: false,
        }}
        bottomDivider
        chevron
      />
    </TouchableOpacity>
  );

  const keyExtractor = [];

  return (
    <SafeAreaView>
      <SearchBar
        onChangeText={keyword => setSearchKeyword(keyword)}
        placeholder="Coba cari 'sepatu nike '...."
        cancelIcon={{name: 'arrow-left', color: 'red', type: 'feather'}}
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
        inputStyle={{fontSize: 14}}
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
        style={{padding: 5}}
        data={dummyArray}
        renderItem={renderItem}
      />
      {/* End Searched Item here */}
      <ScrollView />
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

export default SearchScreen;
