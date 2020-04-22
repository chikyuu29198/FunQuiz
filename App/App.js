import React, {Component} from 'react';
import AppNavigator from './Navigator';
import LoginScreen from './Screens/Login'
import SignupScreen from './Screens/Signup'
class App extends Component {
  render(){
    return(
      <AppNavigator/>
    );
  }
};
export default App;