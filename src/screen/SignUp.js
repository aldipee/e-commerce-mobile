import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import strings from '../config/strings';
import styles from '../style/index';
import colors from '../config/colors';
import {
  setNewUser,
  checkUsername,
  checkEmail,
} from '../redux/actions/AuthActions';
import {connect} from 'react-redux';

class SignUp extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: null,
    emailError: null,
    fullName: '',
    phoneNumber: '',
    phoneNumberError: '',
  };
  componentDidMount() {}

  checkemail = () => {
    this.props.checkEmail(this.state.email, notAvailable => {
      let req = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      console.log(req.test(this.state.email));
      if (!req.test(this.state.email)) {
        this.setState({emailError: 'Email is invalid!'});
      } else {
        notAvailable
          ? this.setState({emailError: null})
          : this.setState({emailError: 'Email already exist!'});
      }
    });
  };
  checkPhone = () => {
    let req = /^(^\+62\s?|^0)(\d{3,4}?){2}\d{3,4}$/;
    console.log(req.test(this.state.phoneNumber));
    if (!req.test(this.state.phoneNumber)) {
      this.setState({phoneNumberError: 'Phone number is invalid'});
    } else {
      this.setState({phoneNumberError: null});
    }
  };
  checkUser = () => {
    console.log(this.state.username);
    this.props.checkUsername(this.state.username, notAvailable => {
      notAvailable
        ? this.setState({error: null})
        : this.setState({error: 'Username already exist'});
    });
  };
  SignUp = () => {
    const data = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      fullname: this.state.fullName,
      phone: this.state.phoneNumber,
    };
    this.props.setNewUser(data, success => {
      this.props.navigation.navigate('SuccessRegis', {
        username: this.state.username,
      });

      console.log(success, 'THIS FUCKING STATUS');
      if (success) {
        console.log(success, 'THIS FUCKING STATUS');
      } else {
        Alert.alert('Registration failed, please try again later');
      }
    });
  };
  render() {
    return (
      <ScrollView>
        <View style={[styles.parent, localStyles.parent]}>
          <View style={localStyles.formContainer}>
            <View style={localStyles.con}>
              <Input
                autoFocus={true}
                onBlur={() => this.checkUser()}
                placeholder="Pick Username"
                label="Username"
                icon="user"
                onChangeText={text => this.setState({username: text.trim()})}
                errorMessage={this.state.error ? this.state.error : false}
              />
              <Input
                placeholder={'Your full name'}
                label="Full Name"
                icon="user-check"
                onChangeText={text => this.setState({fullName: text.trim()})}
              />
              <Input
                placeholder={strings.EMAIL_PLACEHOLDER}
                label="Email"
                icon="mail"
                onChangeText={text => this.setState({email: text.trim()})}
                onBlur={() => this.checkemail()}
                errorMessage={
                  !this.state.emailError ? false : this.state.emailError
                }
              />
              <Input
                placeholder={'Your Phone Number'}
                keyboardType="phone-pad"
                label="Phone Number"
                icon="phone"
                onChangeText={text => this.setState({phoneNumber: text})}
                onBlur={() => this.checkPhone()}
                errorMessage={
                  !this.state.phoneNumberError
                    ? false
                    : this.state.phoneNumberError
                }
              />
              <Input
                placeholder={strings.PASSWORD_PLACEHOLDER}
                label="Password "
                icon="lock"
                rightIcon="eye"
                rightIconContainerStyle={{marginRight: 12}}
                onChangeText={text => this.setState({password: text.trim()})}
              />
              <Input
                placeholder={strings.CONFIRM_PASSWORD}
                label="Confirm password "
                icon="lock"
                rightIcon="eye"
                rightIconContainerStyle={{marginRight: 12}}
                onChangeText={text =>
                  this.setState({confirmPassword: text.trim()})
                }
              />
            </View>
            <Button
              label={strings.SIGN_UP}
              buttonType="login"
              onPress={this.SignUp}
            />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('LoginScreen')}>
              <Text style={localStyles.or}>Already have a account? Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const localStyles = StyleSheet.create({
  formContainer: {
    flex: 1,
    width: '90%',
    marginTop: '4%',
  },
  forgot: {
    marginLeft: 210,
    marginTop: -17,
    marginBottom: 20,
    color: colors.DODGER_BLUE,
  },
  parent: {
    marginTop: -20,
    backgroundColor: '#fff',
  },
  form: {
    marginTop: 50,
  },
  or: {
    textAlign: 'center',
    marginTop: 8,
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
const mapDispatchToProps = {setNewUser, checkUsername, checkEmail};
export default connect(
  null,
  mapDispatchToProps,
)(SignUp);
