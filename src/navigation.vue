<template>
  <root>
    <app-navigation />
  </root>
</template>

<script>
import MyAccountScreen from '@/screens/MyAccountScreen'

import LoginScreen from '@/screens/LoginScreen'
import RegisterScreen from '@/screens/RegisterScreen'

import HomeScreen from '@/screens/HomeScreen'
import SabotaCreateScreen from '@/screens/SabotaCreateScreen'
import SabotaDetailScreen from '@/screens/SabotaDetailScreen'
import SabotaSearchScreen from '@/screens/SabotaSearchScreen'

import React from 'react'
import { Root, Icon } from 'native-base'
import { createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer } from 'react-navigation'

// アカウント設定関連
const AccountStack = createStackNavigator(
  {
    MyAccount: MyAccountScreen
  },
  {
    initialRouteName: 'MyAccount',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
)

// 認証系
const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
)

// サボタ閲覧系
const SabotaListStack = createStackNavigator(
  {
    Home: HomeScreen,
    SabotaDetail: SabotaDetailScreen
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
)

// サボタ検索系
const SabotaSearchStack = createStackNavigator(
  {
    SabotaSearch: SabotaSearchScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
)

// サボタ作成系
const SabotaCreateStack = createStackNavigator(
  {
    SabotaCreate: SabotaCreateScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
)

const TabNavigation = createBottomTabNavigator(
  {
    SabotaListStack: {
      screen: SabotaListStack,
      navigationOptions: {
        title: '一覧',
        tabBarIcon: ({ tintColor }) => (
          createIcon(tintColor, 'list')
        )
      }
    },
    SabotaSearchStack: {
      screen: SabotaSearchStack,
      navigationOptions: {
        title: '検索',
        tabBarIcon: ({ tintColor }) => (
          createIcon(tintColor, 'search')
        )
      }
    },
    SabotaCreateStack: {
      screen: SabotaCreateStack,
      navigationOptions: {
        title: '作成',
        tabBarIcon: ({ tintColor }) => (
          createIcon(tintColor, 'create')
        )
      }
    },
    AccountStack: {
      screen: AccountStack,
      navigationOptions: {
        title: 'マイページ',
        tabBarIcon: ({ tintColor }) => (
          createIcon(tintColor, 'happy')
        )
      }
    }
  }
)

// auth, tabsは、並びで優先度が変わりますね。
// ログインしてなくても閲覧系はできるので、初期のページはサボタの一覧ページで良いでしょう
const AppNavigation = createAppContainer(createSwitchNavigator({
  auth: AuthStack,
  account: AccountStack,
  tabs: TabNavigation
}))

// helper
const createIcon = (tintColor, iconName) => {
  return React.createElement(Icon, {
    name: iconName,
    style: {
      color: tintColor
    },
    size: 24
  })
}

export default {
  components: {
    AppNavigation, Root
  }
}
</script>
