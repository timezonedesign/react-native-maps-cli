import React from 'react';
import {
    StyleSheet,
    StatusBar,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    Modal,
    TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import {
    Container,
    Header,
    Title,
    Content,
    Footer,
    FooterTab,
    Button,
    Left,
    Right,
    Body,
    Icon,
} from 'native-base';

import Spinner from 'react-native-loading-spinner-overlay';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Styles
import styles from './style';

class SignupScreen extends React.Component {
    static propTypes = {};
    static defaultProps = {};
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Header</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Text>This is Content Section</Text>
                </Content>
            </Container>
        );
    }
}

export default SignupScreen;
