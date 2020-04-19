import React from 'react';
import {Text} from 'react-native';
import myColors from '../config/colors';
export function getStatus(idStatus) {
  if (idStatus === 0) {
    return (
      <Text
        style={{
          backgroundColor: myColors.ORANGE,
          color: myColors.WHITE,
          padding: 4,
          borderRadius: 4,
        }}>
        Belum Dibayar
      </Text>
    );
  } else if (idStatus === 1) {
    return (
      <Text
        style={{
          backgroundColor: myColors.HOME_HEADER_CONTAINER,
          color: myColors.WHITE,
          padding: 4,
          borderRadius: 4,
        }}>
        Item Dibayar
      </Text>
    );
  } else if (idStatus === 2) {
    return (
      <Text
        style={{
          backgroundColor: myColors.GREEN,
          color: myColors.WHITE,
          padding: 4,
          borderRadius: 4,
        }}>
        Dalam Pengiriman
      </Text>
    );
  } else if (idStatus === 3) {
    return (
      <Text
        style={{
          backgroundColor: myColors.MAIN_BLUE,
          color: myColors.WHITE,
          padding: 4,
          borderRadius: 4,
        }}>
        Selesau
      </Text>
    );
  }
}
