import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import ShowPasswordSvg from '../assets/svg/eye.svg';
import HidePasswordSvg from '../assets/svg/eye-off.svg';
import {Colors} from '../global';

const TextInputGlobal = ({
  Svg,
  placeHolder,
  state,
  setState,
  show,
  maxLength = null,
  keyboardType = 'default',
  editable = true,
  secureTextEntry
}) => {
  const [password, setPassword] = React.useState(false);
  const toggle = () => setPassword(!password);

  const onChangeText = text => {
    setState(text);
  };
  return (
    <View>
      <View style={styles.TextInput}>
        {Svg && <View style={styles.user}>{Svg}</View>}
        <TextInput
          secureTextEntry={secureTextEntry}
          placeholder={placeHolder}
          keyboardType={keyboardType}
          maxLength={maxLength}
          autoCapitalize={placeHolder == 'Email' ? 'none' : 'none'}
          placeholderTextColor={Colors.GRAY_DARK}
          editable={editable}
          value={state}
          style={styles.bodyTextInput}
          onChangeText={onChangeText}>
          {/* {state} */}
        </TextInput>
        {show ? (
          <TouchableOpacity onPress={toggle} style={{marginRight: 20}}>
            {password ? <ShowPasswordSvg /> : <HidePasswordSvg />}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default TextInputGlobal;

const styles = StyleSheet.create({
  user: {
    justifyContent: 'center',
    // backgroundColor: "red",
    marginHorizontal: 10,
  },
  bodyTextInput: {
    flex: 1,
    paddingRight: 10,
    color: Colors.BLACK,
  },
  TextInput: {
    height: Platform.OS === 'android' ? 'auto' : 47,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.GRAY_MEDIUM,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingLeft: 8,
    // padding: 6,
  },
});
