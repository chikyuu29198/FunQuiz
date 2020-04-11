import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './Screens/Home';
import RunAway from './Screens/RunAway';
import SettingBar from './Components/SettingBar'

const NavStack = createStackNavigator({
  Home: { 
        screen: Home,
    },
    RunAway: { 
        screen: RunAway,
    },
    SettingBar: {
        screen: SettingBar,
    }
});

const AppNavigator = createAppContainer(NavStack);
export default AppNavigator;