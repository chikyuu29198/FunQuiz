import React, {Component} from 'react';
import AppNavigator from './Navigator';
import Level from './Screens/Level'
import InputKey from './Screens/InputKey'
import store  from './redux/store';
import { Provider } from 'react-redux';
import GameOver from './Components/GameOver'
class App extends Component {
  render(){
    return(
      // <AppNavigator/>
      <Provider store = {store}>
        <AppNavigator />
      </Provider>      
    );
  }
};
export default App;