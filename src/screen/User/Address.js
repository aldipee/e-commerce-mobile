import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {sButton} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {getAllCity} from '../../redux/actions/ShippingActions';
import {addNewAddress} from '../../redux/actions/UserActions';
import PickerModal from 'react-native-picker-modal-view';
import Input from '../../components/Input';
import myColors from '../../config/colors';

function myAddress(props) {
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const fetchData = () => {
    return new Promise((resolve, reject) => {
      if (props.cities.data.length !== 0) {
        resolve(props.cities.data);
      }
    });
  };
  const onSubmit = () => {
    const data = {
      idCity: selectedAddress.idCity,
      city: selectedAddress.cityName,
      street: address,
      postcode: selectedAddress.postal_code,
      district: selectedAddress.province,
    };

    props.addNewAddress(data, status => {
      console.log(status);
      if (status.success) {
        ToastAndroid.show('Alamat berhasil ditambahkan', ToastAndroid.SHORT);
        props.navigation.navigate('Profile');
      } else {
        ToastAndroid.show('Gagal cobalagi nanti', ToastAndroid.SHORT);
      }
    });
  };

  useEffect(() => {
    props.getAllCity();
    async function getData() {
      const data = fetchData();
      return data;
    }
    getData()
      .then(data => {
        setCities(data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <ScrollView>
      <View style={localStyle.container}>
        <View>
          <Input
            placeholder={'Alamat Lengkap'}
            label="Alamat Lengkap"
            keyboardType="default"
            onChangeText={text => setAddress(text.trim())}
          />
          <View style={{paddingHorizontal: 10}}>
            <PickerModal
              style={localStyle.input}
              onSelected={data => setSelectedAddress(data.Value)}
              onRequestClosed={() => console.warn('closed...')}
              onBackRequest={() => console.warn('back key pressed')}
              items={cities}
              sortingLanguage={'tr'}
              showToTopButton={true}
              defaultSelected={'none'}
              autoCorrect={false}
              autoGenerateAlphabet={true}
              chooseText={'Choose one'}
              searchText={'Search...'}
              forceSelect={false}
              autoSort={true}
            />
          </View>

          {selectedAddress && (
            <>
              <Input
                defaultValue={selectedAddress.province}
                placeholder={'Alamat Lengkap'}
                label="Provinsi"
                disabled={true}
              />
              <Input
                defaultValue={selectedAddress.postal_code}
                placeholder={'Contoh : 23444'}
                label="Kode Pos"
                disabled={true}
              />
            </>
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              marginRight: 10,
              marginTop: 10,
            }}>
            <Button
              title="Simpan"
              onPress={onSubmit}
              disabled={!selectedAddress ? true : null}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const localStyle = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  details: {
    marginTop: 5,
    paddingTop: 2,
  },
  totalContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: myColors.SECOND_GREY,
  },
  total: {
    fontSize: 18,
  },
  containerInfo: {
    marginVertical: 5,
    paddingVertical: 0,
  },
  justifyContent: {
    alignItems: 'center',
  },
  inline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoLabel: {
    fontSize: 13,
    color: myColors.MAIN_GREY,
  },
  status: {
    color: myColors.GREEN,
  },
});

const mapStatToProps = state => {
  return {
    cities: state.shippingData,
  };
};
const mapDispatchToProps = {getAllCity, addNewAddress};

export default connect(
  mapStatToProps,
  mapDispatchToProps,
)(myAddress);
