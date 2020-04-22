import React, { Component } from 'react';
import { createAppContainer , createSwitchNavigator} from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import Home from './Screens/Home';
import RunAway from './Screens/RunAway';
// import SettingBar from './Components/SettingBar'
import Login from './Screens/Login'
import SignUp from './Screens/Signup'
import Home from './Screens/Home'
// const NavStack = createStackNavigator({
//   Home: { 
//         screen: Home,
//     },
//     RunAway: { 
//         screen: RunAway,
//     },
//     SettingBar: {
//         screen: SettingBar,
//     }
// });

const switchNavigator = createSwitchNavigator(
    {
    SignUp: SignUp,
    Login: Login,
    Home: Home,
    RunAway: RunAway,   
    },
    {
        initialRouteName: "SignUp",
      }
  );
// const  AppContainer = createAppContainer(AppNavigator);
const AppNavigator = createAppContainer(switchNavigator);
export default AppNavigator;