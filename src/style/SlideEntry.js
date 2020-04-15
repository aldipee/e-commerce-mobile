import {Dimensions} from 'react-native';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(96);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth - 10;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;
