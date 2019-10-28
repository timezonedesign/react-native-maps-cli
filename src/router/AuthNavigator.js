import {createStackNavigator} from 'react-navigation-stack';
import {SignupScreen, SigninScreen} from '../screens';
import AuthContainer from '../containers/AuthContainer';

const AuthStackNavigator = createStackNavigator(
    {
        SigninScreen: {
            screen: AuthContainer(SigninScreen),
            navigationOptions: {
                header: null,
            },
        },
        SignupScreen: {
            screen: AuthContainer(SignupScreen),
            navigationOptions: {
                header: null,
            },
        },
    },
    {
        navigationOptions: {
            header: null,
        },
    },
);

export default AuthStackNavigator;
