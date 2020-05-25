import React, {Component} from 'react';
import AppNavigator from './Navigator';
import Level from './Screens/Level'
import InputKey from './Screens/InputKey'
import store  from './redux/store';
import { Provider } from 'react-redux';
import GameOver from './Components/GameOver'
import Score from './Components/Score'
import GameWorld from './Screens/PunchMouse/GameWorld'
import Home from './Screens/Home'
import Setting from './Screens/Setting'
class App extends Component {
  render(){
    return(
      <GameWorld/>
      // <Provider store = {store}>
      //   <AppNavigator />
      // </Provider>      
    );
  }
};
export default App;