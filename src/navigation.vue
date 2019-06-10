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
import SabotaEditScreen from '@/screens/SabotaEditScreen'
import SabotaDetailScreen from '@/screens/SabotaDetailScreen'
import SabotaSearchScreen from '@/screens/SabotaSearchScreen'
import SabotaSearchResultScreen from '@/screens/SabotaSearchResultScreen'
import LinkedSabotasScreen from '@/screens/LinkedSabotasScreen'

import React from 'react'
import { Root, Icon } from 'native-base'
import { createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer } from 'react-navigation'

import { ACCENT_COLOR, PRIMARY_COLOR, WHITE_COLOR } from './styles/colors'

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
    SabotaDetail: SabotaDetailScreen,
    SabotaEdit: SabotaEditScreen,
    LinkedSabotas: LinkedSabotasScreen
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
    SabotaSearch: SabotaSearchScreen,
    SabotaSearchResult: SabotaSearchResultScreen
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
        tabBarIcon: ({ tintColor }) => (
          createIcon(tintColor, 'list')
        )
      }
    },
    SabotaSearchStack: {
      screen: SabotaSearchStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          createIcon(tintColor, 'search')
        )
      }
    },
    SabotaCreateStack: {
      screen: SabotaCreateStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          createIcon(tintColor, 'create')
        )
      }
    },
    AccountStack: {
      screen: AccountStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          createIcon(tintColor, 'happy')
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: WHITE_COLOR,
      inactiveTintColor: ACCENT_COLOR,
      labelStyle: {
        fontSize: 12
      },
      style: {
        backgroundColor: PRIMARY_COLOR,
        borderTopWidth: 0
      },
      showLabel: false
    }
  }
)

// auth, tabsは、並びで優先度が変わりますね。
// ログインしてなくても閲覧系はできるので、初期のページはサボタの一覧ページで良いでしょう
const AppNavigation = createAppContainer(createSwitchNavigator({
  tabs: TabNavigation,
  auth: AuthStack,
  account: AccountStack
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
