import React, { Component } from 'react';
import { createAppContainer , createSwitchNavigator} from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
import GameWorld from './Screens/RunAway/GameWorld';
// import SettingBar from './Components/SettingBar'
import Login from './Screens/Login'
import SignUp from './Screens/Signup'
import RunAwayHome from './Screens/RunAway/RunAwayHome'
import Home from './Screens/Home'
import Loading from './Screens/Loading'
import Level from './Screens/RunAway/Level'
import InputKey from './Screens/RunAway/InputKey'
import PunchMouseGameWorld from './Screens/PunchMouse/PunchMouseGameWorld'
import PunchMouseHome from './Screens/PunchMouse/PunchMouseHome'
import PunchMouseLevel from './Screens/PunchMouse/PunchMouseLevel'
import PunchMouseInputKey from './Screens/PunchMouse/PunchMouseInputKey'
import Setting from './Screens/RunAway/Setting'
import PunchMouseSetting from './Screens/PunchMouse/PunchMouseSetting'
import SelectData from './Screens/RunAway/SelectData'
import PunchMouseSelectData from './Screens/PunchMouse/PunchMouseSelectData';

const switchNavigator = createSwitchNavigator(
    {
    SignUp: SignUp,
    Login: Login,
    Home: Home,
    RunAwayHome: RunAwayHome,
    GameWorld: GameWorld,
    Loading: Loading,
    Level: Level,
    InputKey: InputKey,
    PunchMouseGameWorld: PunchMouseGameWorld,
    PunchMouseHome: PunchMouseHome,
    PunchMouseLevel: PunchMouseLevel,
    PunchMouseInputKey: PunchMouseInputKey,
    Setting: Setting,
    PunchMouseSetting: PunchMouseSetting,
    SelectData: SelectData,
    PunchMouseSelectData: PunchMouseSelectData
    },
    {
        initialRouteName: "Loading",
      }
  );
// const  AppContainer = createAppContainer(AppNavigator);
const AppNavigator = createAppContainer(switchNavigator);
export default AppNavigator;