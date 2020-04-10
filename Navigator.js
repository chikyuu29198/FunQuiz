import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './Screens/Home';
import RunAway from './Screens/RunAway';

const NavStack = createStackNavigator({
  Home: { 
        screen: Home,
    },
    RunAway: { 
        screen: RunAway,
    },
});

const AppNavigator = createAppContainer(NavStack);
export default AppNavigator;