import React, {Component} from 'react';
import AppNavigator from './Navigator';
// import Level from './Screens/RunAway/Level'
// import InputKey from './Screens/RunAway/InputKey'
import store  from './redux/store';
import { Provider } from 'react-redux';
// import GameOver from './Components/GameOver'
// import Score from './Components/Score'
import GameWorld from './Screens/PunchMouse/PunchMouseGameWorld'
import PunchMouseHome from './Screens/PunchMouse/PunchMouseHome'
import Home from './Screens/Home'
import PunchMouseSelectData from './Screens/PunchMouse/PunchMouseSelectData'
import Test from './Screens/Test'
import PunchMouseInputKey from './Screens/PunchMouse/PunchMouseInputKey'
class App extends Component {
  render(){
    return(
      // <Test/>
      <Provider store = {store}>
        <AppNavigator />
      </Provider>      
    );
  }
};
export default App;