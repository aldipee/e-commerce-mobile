import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../config/colors';

function RadioButton(props) {
  const [value, setValue] = useState({id: 0});
  const onSetValue = key => {
    setValue(key);
    props.callback(key);
  };
  return (
    <View style={{flexDirection: 'row', marginTop: 5}}>
      {props.options.map(item => (
        <View key={item.key} style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.circle}
            onPress={() => onSetValue({...item})}>
            <Text
              style={value.id === item.id ? styles.textActive : styles.text}>
              {item.text}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    borderColor: '#ACACAC',
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: colors.SECOND_GREY,
    borderRadius: 3,
  },
  buttonContainerChecked: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    borderColor: '#ACACAC',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'red',
    marginHorizontal: 5,
    borderRadius: 3,
  },
  circle: {
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCircle: {
    // width: 14,
    // height: 14,
    // borderRadius: 7,
    backgroundColor: '#794F9B',
  },
  text: {
    color: colors.MAIN_GREY,
    fontWeight: 'bold',
  },
  textActive: {
    color: colors.BLACK,
    fontWeight: 'bold',
  },
});

export default RadioButton;
