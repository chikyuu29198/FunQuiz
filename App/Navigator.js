import React, { Component } from 'react';
import { createAppContainer , createSwitchNavigator} from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
import RunAway from './Screens/RunAway';
// import SettingBar from './Components/SettingBar'
import Login from './Screens/Login'
import SignUp from './Screens/Signup'
import Home from './Screens/Home'
import Loading from './Screens/Loading'
import Level from './Screens/Level'
import InputKey from './Screens/InputKey'
const switchNavigator = createSwitchNavigator(
    {
    SignUp: SignUp,
    Login: Login,
    Home: Home,
    RunAway: RunAway,
    Loading: Loading,
    Level: Level,
    InputKey: InputKey
    },
    {
        initialRouteName: "Loading",
      }
  );
// const  AppContainer = createAppContainer(AppNavigator);
const AppNavigator = createAppContainer(switchNavigator);
export default AppNavigator;