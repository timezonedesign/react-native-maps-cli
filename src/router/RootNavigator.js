import {createSwitchNavigator} from 'react-navigation';

import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const RootNavigator = createSwitchNavigator(
    {
        AuthNavigator: {
            screen: AuthNavigator,
        },
        AppNavigator: {
            screen: AppNavigator,
        },
    },
    {
        navigationOptions: {
            header: null,
        },
        initialRouteName: 'AuthNavigator',
    },
);

export default RootNavigator;
