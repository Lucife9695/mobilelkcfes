import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import IndexScreen from './IndexScreen';
import ShowScreen from './ShowScreen';


const RootStack = createStackNavigator({
  Index: {
    screen: IndexScreen,
  },
  Show: {
    screen: ShowScreen
  },
}, {
  initialRouteName: 'Index',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#a80000',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
  });

const App = createAppContainer(RootStack);

export default App;