import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../components/Button';
import Input from '../components/Input';
import strings from '../config/strings';
import styles from '../style/index';
import colors from '../config/colors';
import AsyncStorage from '@react-native-community/async-storage';
import {setLogin} from '../redux/actions/AuthActions';
import {connect} from 'react-redux';

class Login extends Component {
  state = {
    username: '',
    password: '',
    error: null,
  };
  componentDidMount() {
    AsyncStorage.getItem('token', (err, result) => {
      if (result) {
        console.log('HEREEEEE', result);
      }
    });
  }
  toRegister = () => {
    this.props.navigation.navigate('SignUp');
  };
  toHome = () => {
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.setLogin(data, status => {
      console.log(status, 'FFFF');
      if (status.status) {
        this.props.navigation.navigate('Home');
      } else if (status.status === 'ERRVERIFY') {
        Alert.alert('Please verify your email first!');
      } else {
        this.setState({error: 'Username or password invalid!'});
        setTimeout(() => {
          this.setState({error: null});
        }, 1300);
      }
    });
  };
  render() {
    return (
      <ScrollView>
        <View style={{backgroundColor: colors.WHITE, height: 600}}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: colors.MAIN_GREY,
              marginTop: 60,
              paddingHorizontal: 30,
            }}>
            Welcome back!
          </Text>
          <View style={styles.parent}>
            <View style={localStyles.formContainer}>
              <Input
                autoFocus={true}
                placeholder="Your Username"
                label="Username"
                icon="user"
                onChangeText={text => this.setState({username: text.trim()})}
              />
              <Input
                autoFocus={true}
                placeholder="Your password"
                label="Password"
                icon="lock"
                onChangeText={text => this.setState({password: text.trim()})}
                errorStyle={{color: this.state.error ? 'red' : 'white'}}
                errorMessage={'Username or password invalid'}
              />
              <View>
                <Text style={localStyles.forgot}>Forgot password?</Text>
              </View>
              <Button
                label={strings.LOGIN}
                buttonType="login"
                onPress={this.toHome}
              />
              <Text style={localStyles.or}>Don't have an account yet?</Text>
              <Button label={strings.REGISTER} onPress={this.toRegister} />
            </View>
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
    marginTop: '10%',
  },
  forgot: {
    marginLeft: 200,
    marginTop: -7,
    marginBottom: 20,
    color: colors.DODGER_BLUE,
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
const mapDispatchToProps = {setLogin};
export default connect(
  null,
  mapDispatchToProps,
)(Login);
