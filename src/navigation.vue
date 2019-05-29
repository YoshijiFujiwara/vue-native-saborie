<template>
  <root>
    <app-navigation />
  </root>
</template>

<script>
import LoginScreen from '@/screens/LoginScreen'
import RegisterScreen from '@/screens/RegisterScreen'

import HomeScreen from '@/screens/HomeScreen'
import SabotaCreateScreen from '@/screens/SabotaCreateScreen'
import SabotaDetailScreen from '@/screens/SabotaDetailScreen'
import SabotaSearchScreen from '@/screens/SabotaSearchScreen'

import { Root } from 'native-base'
import { createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer } from 'react-navigation'

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
    一覧: SabotaListStack,
    検索: SabotaSearchStack,
    作成: SabotaCreateStack
  },
  {
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray'
    }
  }
)

// auth, tabsは、並びで優先度が変わりますね。
// ログインしてなくても閲覧系はできるので、初期のページはサボタの一覧ページで良いでしょう
const AppNavigation = createAppContainer(createSwitchNavigator({
  auth: AuthStack,
  tabs: TabNavigation,
}))

export default {
  components: {
    AppNavigation, Root
  }
}
</script>
