import {Platform, StyleSheet} from 'react-native';
// import {Colors, Constants, Fonts} from '../global';

import {Dimensions} from 'react-native';

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;

// export const HEADER_HEIGHT = 60;

// export const BUTTON_OPACITY = 1;

export const PRIMARY = '#F99026';
export const PRIMARY_LIGHT = '#FDF1E5';

export const SECONDARY = '#fbb772';

// export const TERTIARY = '#d66264';

export const WHITE = '#FFFFFF';
export const BLACK = '#000000';
export const OUTER_SPACE = '#444444';

export const MERCHANT_BG = '#4b4b4b'

export const OUTER_SPACE_50 = '#44444450';

export const OUTER_SPACE_70 = '#44444470';
export const LINK = '#0070CA';

export const TRANSPARENT = '#ffffff00';
export const TRANSPARENT_BLACK = 'rgba(0, 0, 0, 0.4)';

//Actions
export const SUCCESS = '#3adb76';
export const WARNING = '#ffae00';
export const ALERT = '#cc4b37';

// GRAYSCALE
export const GRAY_LIGHT = '#e6e6e6';
export const GRAY_MEDIUM = '#cacaca';
export const GRAY_DARK = '#8a8a8a';

// TEXT
export const TEXT = '#272727';

export const MUNSELL = '#f2f4f5';

export const BORDER = '#730E06';

export const SMOKEWHITE = '#44444410';

export const BLUE = '#027ABE';
export const YELLOW = '#FFC145';
export const GREEN = '#4EC33B';


export const globalStyles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: PRIMARY,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: 20,
    marginBottom: 15,
  },
  buttonText: {
    // fontFamily: Fonts.MEDIUM,
    fontSize: 19,
    color: WHITE,
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText2: {
    // fontFamily: Fonts.MEDIUM,
    fontSize: 12,
    color: WHITE,
  },

  TextInput: {
    height: Platform.OS === 'android' ? 'auto' : 47,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: GRAY_MEDIUM,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    // padding: 6,
  },
  Applybutton: {
    height: 50,
    width: SCREEN_WIDTH / 2.4,
    backgroundColor: BLACK,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: 20,
    marginBottom: 15,
    marginHorizontal: 10,
  },
  ApplybuttonText: {
    // fontFamily: Fonts.MEDIUM,
    fontSize: 19,
    color: WHITE,
    marginTop: Platform.OS == 'android' ? 3 : 0,
  },
});
