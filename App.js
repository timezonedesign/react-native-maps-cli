import {createAppContainer} from 'react-navigation';
import RootNavigator from './src/router/RootNavigator';

const AppContainer = createAppContainer(RootNavigator);
export default AppContainer;
