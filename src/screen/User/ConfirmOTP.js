import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Alert } from 'react-native'
import { setNewPassword } from '../../redux/actions/AuthActions'
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
    password: '',
    confirmPassword: '',
    error: null,
  }

  changePassword = () => {
    const otp = this.state.username
    const data = {
      username: this.props.route.params.username,
      password: this.state.password,
      confirmPass: this.state.confirmPassword,
    }
    this.props.setNewPassword(otp, data, success => {
      if (success) {
        this.props.navigation.navigate('PasswordChanged')
      } else {
        this.setState({ error: 'OTP Code wrong!' })

        setTimeout(() => {
          this.setState({ error: null })
        }, 3000)
      }
    })
  }

  render() {
    return (
      <ScrollView>
        <View style={{ backgroundColor: colors.WHITE, height: 630 }}>
          <Text style={{ paddingHorizontal: 30, color: colors.MAIN_GREY, marginTop: 90 }}>
            Please input OTP code that we've just sent to your phone number, and set your new
            password
          </Text>
          <View style={styles.parent}>
            <View style={localStyles.formContainer}>
              <Input
                autoFocus={true}
                placeholder="Your OTP Code"
                label="OTP Code"
                icon="external-link"
                onChangeText={text => this.setState({ username: text.trim() })}
                errorMessage={this.state.error ? this.state.error : false}
              />
              <Input
                placeholder={strings.PASSWORD_PLACEHOLDER}
                label="New Password "
                icon="lock"
                rightIcon="eye"
                rightIconContainerStyle={{ marginRight: 12 }}
                onChangeText={text => this.setState({ password: text.trim() })}
              />
              <Input
                placeholder={strings.CONFIRM_PASSWORD}
                label="Confirm New password "
                icon="lock"
                rightIcon="eye"
                rightIconContainerStyle={{ marginRight: 12 }}
                onChangeText={text => this.setState({ confirmPassword: text.trim() })}
              />
              <Button
                label={'Verify my self'}
                onPress={this.changePassword}
                buttonType="login"
                disabled={this.state.username === '' ? true : null}
              />
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
const mapDispatchToProps = { setLogin, checkUsername, setNewPassword }
export default connect(
  null,
  mapDispatchToProps
)(ForgotPassword)
