import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { Linking, Platform, Alert } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'

// Screen Import
import LoginScreen from '../screen/Login'
import colors from '../config/colors'
import HomeScreen from '../screen/HomeScreen'
import ProfileScreen from '../screen/ProfileScreen'
import TransactionsList from '../screen/TransactionTav'
import Cart from '../screen/Cart'
import { connect } from 'react-redux'
const BottomTab = createBottomTabNavigator()

function MainHome(props) {
  useEffect(() => {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        navigate(url)
      })
    } else {
      Linking.addEventListener('url', handleOpenURL)
    }
  }, [])
  // B

  const handleOpenURL = event => {
    // D
    navigate(event.url)
  }

  const navigate = url => {
    // E
    const { navigate } = props.navigation
    const route = url.replace(/.*?:\/\//g, '')
    const id = route.match(/\/([^\/]+)\/?$/)[1]
    const routeName = route.split('/')[0]

    if (routeName === 'people') {
      navigate('LoginScreen', { id, name: 'chris' })
    }
  }
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        activeTintColor: colors.MAIN_BLUE,
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Telusuri',
          tabBarIcon: ({ color, size }) => <FeatherIcon name="search" size={size} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Transaction"
        component={props.auth.isLogin ? TransactionsList : LoginScreen}
        options={{
          tabBarLabel: 'Transaksi',
          tabBarIcon: ({ color, size }) => <IonIcon name="md-paper" size={size} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="MyCart"
        component={Cart}
        options={{
          tabBarLabel: 'Keranjang',
          tabBarIcon: ({ color, size }) => <IonIcon name="md-cart" size={size} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={props.auth.isLogin ? ProfileScreen : LoginScreen}
        options={{
          tabBarLabel: 'Akun',
          tabBarIcon: ({ color, size }) => <FeatherIcon name="user" size={size} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.authData,
  }
}
export default connect(
  mapStateToProps,
  null
)(MainHome)
