import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../components/Button';
import strings from '../config/strings';
import styles from '../style/index';
import colors from '../config/colors';

class SuccessRegis extends Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    return (
      <>
        <View style={styles.parentBlue}>
          <View style={localStyles.formContainer}>
            <View style={localStyles.notif}>
              <Icon name="check-circle" size={70} color={colors.MAIN_GREY} />
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  marginTop: 15,
                  marginBottom: 10,
                  color: colors.WHITE,
                }}>
                Congratulations !
              </Text>
              <Text style={{marginBottom: 0, color: colors.WHITE}}>
                Your registration is completed.
              </Text>
              <Text style={{marginBottom: 20, color: colors.WHITE}}>
                Please check your email to verify yourself.
              </Text>
            </View>
            <Button label={strings.LOGIN} buttonType="login" />
          </View>
        </View>
      </>
    );
  }
}

const localStyles = StyleSheet.create({
  formContainer: {
    flex: 1,
    width: '80%',
    marginTop: '50%',
  },
  notif: {
    justifyContent: 'center',
  },
  form: {
    marginTop: 50,
  },
  or: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 9,
    color: colors.MAIN_GREY,
    fontWeight: '200',
  },
  icon: {
    position: 'absolute',
    top: 13,
    left: 7,
  },
  con: {
    position: 'relative',
    marginTop: 7,
  },
});
export default SuccessRegis;
