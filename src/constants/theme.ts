import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const SIZES = {
  // global sizes
  radius: 8,
  padding: 10,
  margin: 10,

  // font sizes
  h1: 25,
  h2: 20,
  h3: 17,
  h4: 15,
  h5: 12,
  h6: 11,
  body1: 17,
  body2: 15,
  body3: 14,
  body4: 12,
  body5: 11,
  body6: 10,

  // app dimensions
  width,
  height,
};

export const FONTFAMILY = {
  title: {
    black: 'SFProDisplay-Black',
    bold: 'SFProDisplay-Bold',
    semibold: 'SFProDisplay-Semibold',
    regular: 'SFProDisplay-Regular',
  },
  text: {
    semibold: 'SFProText-Semibold',
    medium: 'SFProText-Medium',
    regular: 'SFProText-Regular',
  },
};

export const COLORS = {
  // base colors
  primary: '#38B8E0',
  secondary: '#F1FAFD',

  backgroundLight: '#FFFFFF',
  backgroundCodeField: '#F0F2F4',
  backgroundCodeFieldError: '#FBEDEC',
  backgroundActiveSwitch: '#55B468',
  backgroundPicker: '#dfdfdf',
  backgroundConfirmed: '#EAFAEE',
  backgroundUnconfirmed: '#E6F6FB',
  backgroundSkipped: '#FAE9E8',
  backgroundBreak: '#F0F2F4',
  backgroundAlert: '#435155',
  backgroundToast: '#435155',
  text: '#1E1F20',
  textModal: '#353535',
  error: '#D64641',
  border: '#EAECEE',
  borderSwitch: '#E6E6E6',
  disabled: '#EAECEE',
  placeholderLight: '#ACACB7',
  confirmedStatus: '#EAFAED',

  // colors
  black: '#000000',
  white: '#FFFFFF',
  blue: '#007AFF',
  gray: '#787880',
  lightGray: '#D1D3D6',
  lightGray2: '#F5F7F8',
  lightGray3: '#EBEDEF',
  ligthGray4: '#A4A9AE',
  silverGray: '#858C93',
  red: '#D64641',
  textBlack: '#1C1C1E',
  grayBlue: '#C5C2CB',
  lightBlue: '#43C1EB',
};

const appTheme = { SIZES, FONTFAMILY, COLORS };

export default appTheme;
