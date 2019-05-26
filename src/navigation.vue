<template>
  <Root>
    <AppNavigation />
  </Root>
</template>

<script>
import HomeScreen from '@/screens/HomeScreen'
import SabotaDetailScreen from '@/screens/SabotaDetailScreen'
import LoginScreen from '@/screens/LoginScreen'
import RegisterScreen from '@/screens/RegisterScreen'
import Screen1 from '@/screens/Screen1'
import Screen2 from '@/screens/Screen2'
import Screen3 from '@/screens/Screen3'
import { Root } from 'native-base'
import { createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  createAppContainer } from 'react-navigation'

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    SabotaDetail: SabotaDetailScreen,
    ScreenOne: Screen1
  },
  {
    initialRouteName: 'Home'
  }
)

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
})

const SomeOtherStack = createStackNavigator(
  {
    Screen2
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
)
const SomeOtherOtherStack = createStackNavigator(
  {
    Screen3
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
)

const DrawerNavigation = createDrawerNavigator({
  DrawerStack1: SomeOtherStack,
  DrawerStack2: SomeOtherOtherStack
})

const TabNavigation = createBottomTabNavigator({
  Meetups: HomeStack,
  Other: DrawerNavigation
})

// auth, tabsは、並びで優先度が変わりますね
const AppNavigation = createAppContainer(createSwitchNavigator({
  auth: AuthStack,
  tabs: TabNavigation
}))

export default {
  components: {
    AppNavigation, Root
  }
}
</script>
