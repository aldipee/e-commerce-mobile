import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Alert, ToastAndroid } from 'react-native'
import { forgotPassword } from '../../redux/actions/AuthActions'
import Button from '../../components/Button'
import Input from '../../components/Input'
import strings from '../../config/strings'
import styles from '../../style/index'
import colors from '../../config/colors'
import { setLogin, checkUsername } from '../../redux/actions/AuthActions'
import { connect } from 'react-redux'

class ForgotPassword extends Component {
  state = {
    username: '',
    error: null,
  }

  checkUser = () => {
    console.log(this.state.username)
    this.props.checkUsername(this.state.username, notAvailable => {
      if (!notAvailable) {
        this.setState({ error: null })
        this.props.forgotPassword(this.state.username, success => {
          if (success) {
            this.props.navigation.navigate('ConfirmOTP', { username: this.state.username })
          } else {
            ToastAndroid.show('Oppss, there is something error', ToastAndroid.SHORT)
          }
        })
      } else {
        this.setState({ error: `Username does'not exist` })
      }
    })
  }
  toRegister = () => {
    this.props.navigation.navigate('SignUp')
  }
  toHome = () => {
    const data = {
      username: this.state.username,
      password: this.state.password,
    }
    this.props.setLogin(data, status => {
      if (status.status) {
        this.props.navigation.navigate('Home')
      } else if (status.status === 'ERRVERIFY') {
        Alert.alert('Please verify your email first!')
      } else {
        this.setState({ error: 'Username or password invalid!' })
        setTimeout(() => {
          this.setState({ error: null })
        }, 1300)
      }
    })
  }
  render() {
    return (
      <ScrollView>
        <View style={{ backgroundColor: colors.WHITE, height: 600 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: colors.MAIN_GREY,
              marginTop: 60,
              paddingHorizontal: 30,
            }}>
            Forgot your password?
          </Text>
          <Text style={{ paddingHorizontal: 30, color: colors.MAIN_GREY, marginTop: 10 }}>
            Please submit your username, we will send you OTP code to your phone
          </Text>
          <View style={styles.parent}>
            <View style={localStyles.formContainer}>
              <Input
                autoFocus={true}
                placeholder="Your Username"
                label="Username"
                icon="user"
                onChangeText={text => this.setState({ username: text.trim() })}
                errorMessage={this.state.error ? this.state.error : false}
              />
              <Button
                label={'Send me OTP Code'}
                buttonType="login"
                onPress={this.checkUser}
                disabled={this.state.error || this.state.username === '' ? true : null}
              />
              <Text style={localStyles.or}>Don't have an account yet?</Text>
              <Button label={strings.REGISTER} onPress={this.toRegister} />
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const localStyles = StyleSheet.create({
  formContainer: {
    flex: 1,
    width: '90%',
    marginTop: '3%',
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
})
const mapDispatchToProps = { setLogin, checkUsername, forgotPassword }
export default connect(
  null,
  mapDispatchToProps
)(ForgotPassword)
