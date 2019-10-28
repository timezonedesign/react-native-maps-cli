import {createStackNavigator} from 'react-navigation-stack';
import {MapScreen, AddDisasterScreen, TagScreen} from '../screens';
import AppContainer from '../containers/AppContainer';

const AuthStackNavigator = createStackNavigator(
    {
        MapScreen: {
            screen: AppContainer(MapScreen),
            navigationOptions: {
                header: null,
            },
        },
        TagScreen: {
            screen: AppContainer(TagScreen),
            navigationOptions: {
                header: null,
            },
        },
        AddDisasterScreen: {
            screen: AppContainer(AddDisasterScreen),
            navigationOptions: {
                header: null,
            },
        },
    },
    {
        initialRouteName: 'MapScreen',
        navigationOptions: {
            header: null,
        },
    },
);

export default AuthStackNavigator;
