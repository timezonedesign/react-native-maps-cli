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
    Image,
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
import testTagIcon from '../../assets/images/testTag.png';

// Styles
import styles from './style';

class AddDisasterScreen extends React.Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired,
        navigation: PropTypes.object.isRequired,
    };
    static defaultProps = {};
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {navigate, navigation} = this.props;
        return (
            <Container>
                <StatusBar hidden={true} />
                <Header style={{backgroundColor: '#2aac72'}}>
                    <Left>
                        <Button
                            iconLeft
                            transparent
                            onPress={() => {
                                navigation.goBack();
                            }}>
                            <Text style={{color: 'white'}}>{'<- Back'}</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Text 
                            style={{
                                color: 'white', 
                                textAlign:'right', 
                                width:'100%',
                                fontSize: 24}}>
                            {navigation.state.params.codeword}
                        </Text>
                    </Body>
                    <Right />
                </Header>
                <Content
                    padder
                    contentContainerStyle={{
                        alignItems: 'center',
                        width: '100%',
                        flex: 1,
                    }}>
                    <View style={{marginVertical: hp('5%')}}>
                        <Image
                            style={{
                                width: hp('30.0%'),
                                height: hp('30.0%'),
                                resizeMode: 'cover',
                                alignItems: 'center',
                            }}
                            source={{uri: navigation.state.params.node.icon}}
                        />
                    </View>

                    <View style={{alignItems: 'center', marginVertical: hp('5%')}}>
                        <Text style={{fontSize: 25, fontWeight: 'bold', textAlign:'center'}}>{navigation.state.params.node.name.toUpperCase()}</Text>
                        <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: hp('5%'), textAlign:'center'}}>
                        This symbol represents{"\n"} a {navigation.state.params.node.name.toLowerCase()}
                        </Text>
                    </View>
                    <Button
                        style={{
                            flex: 1,
                            position: 'absolute',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            bottom: 75,
                            width: 200,
                        }}
                        onPress={()=>{this.props.navigation.navigate('MapScreen',{icon: navigation.state.params.node.icon})}}
                        success>
                        <Text style={{color: 'white'}}> {'Add to Map'} </Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

export default AddDisasterScreen;
