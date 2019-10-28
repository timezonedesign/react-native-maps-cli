import React, {Fragment} from 'react';
import {
    StyleSheet,
    StatusBar,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    Modal,
    TextInput,
    Linking,
} from 'react-native';
import PropTypes from 'prop-types';
import {Container, Header, Content, Form, Item, Input, Label, Button} from 'native-base';

import Spinner from 'react-native-loading-spinner-overlay';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Styles
import styles from './style';
import * as globals from '../../constants/global';

class SigninScreen extends React.Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired,
    };
    static defaultProps = {};
    constructor(props) {
        super(props);
        this.state = {codeword:''};
    }

    render() {
        const {navigation, navigate} = this.props;
        return (
            <Container style={{backgroundColor: '#6cb8d9'}}>
                <Content
                    padder
                    contentContainerStyle={{
                        flex: 1,
                        width: globals.DEVICE_WIDTH,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 28,
                            fontStyle: 'italic',
                            color: 'white',
                            marginBottom: 25,
                        }}>
                        {'-MiniCarta-'}
                    </Text>
                    <View
                        style={{
                            width: '80%',
                            marginHorizontal: '5%',
                            paddingHorizontal: '5%',
                            borderWidth: 1,
                            borderColor: 'grey',
                            backgroundColor: 'white',
                        }}>
                        <Item regular style={{marginBottom: 5, marginTop: 15}}>
                            <Input 
                                placeholder="CodeWord" 
                                onChangeText={(codeword) => this.setState({codeword})}/>
                        </Item>
                        <Button
                            primary
                            onPress={()=>{this.props.navigation.navigate('MapScreen',{codeword: this.state.codeword})}}
                            style={{marginBottom: 15, marginTop: 5, justifyContent: 'center'}}>
                            <Text> {'Login'} </Text>
                        </Button>
                    </View>
                    <Text
                        style={{
                            position: 'absolute',
                            bottom: '1%',
                            left: '2%',
                            fontSize: 16,
                            color: '#0000ff',
                            textDecorationLine: 'underline',}}
                        onPress={() => {Linking.openURL('https://firebasestorage.googleapis.com/v0/b/emergy-19023.appspot.com/o/minicarta-legal.html?alt=media')}}
                        >
                        Terms and Conditions
                    </Text>
                </Content>
            </Container>
        );
    }
}

export default SigninScreen;
