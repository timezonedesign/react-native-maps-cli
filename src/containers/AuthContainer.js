import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getAuthError, getAuthLoading} from '../selectors';
import {signUpRequest, signInRequest} from '../reducers/auth';

import {getDisplayName} from '../utils';
import {NavigationActions} from 'react-navigation';

function AuthContainer(Component) {
    class AuthContainer extends Component {
        static propTypes = {
            navigation: PropTypes.object.isRequired,
            signUp: PropTypes.func.isRequired,
            signIn: PropTypes.func.isRequired,
            authError: PropTypes.string,
            authLoading: PropTypes.bool.isRequired,
        };
        static defaultProps = {
            signup: () => {},
            signIn: () => {},
            authError: null,
            authLoading: false,
        };
        componentDidUpdate = () => {};
        componentDidMount = () => {};

        navigate = (scene, params = {}) => () => {
            const {navigation} = this.props;
            if (scene === 'MapScreen') {
                const navigateAction = NavigationActions.navigate({
                    routeName: 'AppNavigator',
                    params: {},
                    action: NavigationActions.navigate({routeName: scene}),
                });
                navigation.dispatch(navigateAction);
            } else {
                navigation.navigate(scene);
            }
        };

        render() {
            return <Component {...this.props} navigate={this.navigate} />;
        }
    }

    AuthContainer.displayName = `AuthContainer(${getDisplayName(Component)})`;
    const mapStateToProps = state => {
        return {
            authError: getAuthError(state),
            authLoading: getAuthLoading(state),
        };
    };
    const mapDispatchToProps = {
        signUp: signUpRequest,
        signIn: signInRequest,
    };

    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(AuthContainer);
}

export default AuthContainer;
