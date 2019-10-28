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
    PermissionsAndroid,
    Platform,
    ToastAndroid,
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
import Geolocation from 'react-native-geolocation-service';

import Spinner from 'react-native-loading-spinner-overlay';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import firebase from '../../../Firebase';

// Styles
import styles from './style';

const latitudeDelta = 0.0922;
const longitudeDelta = 0.0421;
class MapScreen extends React.Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired,
    };
    static defaultProps = {};
    watchId = null;

    constructor(props) {
        super(props);
        const {navigation} = this.props;
        var collection_name = navigation.state.params.codeword;
        if (collection_name == '') collection_name = 'nocodeword';
        this.ref = firebase.firestore().collection(collection_name);
        this.unsubscribe = null;
        this.state = {
            codeword: collection_name,
            loading: false,
            updatesEnabled: false,
            tabs: [],
            location: {},
            latitude: 0,
            longitude: 0,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
            currentPosition: {
                latitude: 0,
                longitude: 0,
            },
            mapType: 'standard',
        };
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
        this.load();
        this.props.navigation.addListener('willFocus', this.load);
        this.getLocation();
    }
    getLocation = async () => {
        const hasLocationPermission = await this.hasLocationPermission();

        if (!hasLocationPermission) {
            return;
        }

        this.setState({loading: true}, () => {
            const self = this;
            Geolocation.getCurrentPosition(
                position => {
                    const {coords} = position;
                    const {latitude, longitude} = coords;
                    this.setState({
                        latitude: latitude,
                        longitude: longitude,
                        currentPosition: {
                            latitude: latitude,
                            longitude: longitude,
                        },
                    });
                },
                error => {
                    this.setState({location: error, loading: false});
                    console.log(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 10000,
                    distanceFilter: 50,
                    forceRequestLocation: true,
                },
            );
        });
    };

    hasLocationPermission = async () => {
        if (Platform.OS === 'ios' || (Platform.OS === 'android' && Platform.Version < 23)) {
            return true;
        }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        }

        if (status === PermissionsAndroid.RESULTS.DENIED) {
            ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
        }

        return false;
    };
    onCollectionUpdate = (querySnapshot) => {
        const tabs = [];
        querySnapshot.forEach((doc) => {
            const { icon, longitude, latitude } = doc.data();
            tabs.push({
            key: doc.id,
            icon,
            doc, // DocumentSnapshot
            longitude,
            latitude,
            });
        });
        this.setState({
            tabs,
            isLoading: false,
        });
    }
    load = () => {
        const { navigation } = this.props;
        var icon = navigation.getParam('icon', 'no_icon');
        if(icon!='' && icon!='no_icon'){
            this.saveBoard();
        }
    }
    saveBoard() {
        this.setState({
            isLoading: true,
        });
        const { navigation } = this.props;
        var icon = navigation.getParam('icon', 'no_icon');
        this.ref.add({
            icon: icon,
            longitude: this.state.longitude,
            latitude: this.state.latitude,
        }).then((docRef) => {
            this.setState({
            isLoading: false,
            });
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            this.setState({
            isLoading: false,
            });
        });
    }
    
    onRegionChange = (region) => {
        if(Math.abs(region.latitude-this.state.latitude)>0.0001 || Math.abs(region.longitude-this.state.longitude)>0.0001 || Math.abs(region.latitudeDelta-this.state.latitudeDelta)>0.0001 || Math.abs(region.longitudeDelta-this.state.longitudeDelta)>0.0001){
            this.setState({
                latitude: region.latitude,
                longitude: region.longitude,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta
            });
        }
    }
    changeMapType = () => {
        var mapType = this.state.mapType;
        switch(this.state.mapType){
        case 'standard':
            mapType = 'hybrid';
            break;
        case 'hybrid':
            mapType = 'satellite';
            break;
        case 'satellite':
            mapType = 'terrain';
            break;
        case 'terrain':
            mapType = 'standard';
            break;
        }
        this.setState({mapType: mapType});
    }
    backViewPoint = () => {
        const latitude = this.state.currentPosition.latitude;
        const longitude = this.state.currentPosition.longitude;
        this.setState({
            latitude: latitude,
            longitude: longitude
        });
    }
    render() {
        const {navigate} = this.props;
        const {currentPosition, initLocation} = this.state;
        return (
            <Container>
                <StatusBar hidden={true} />
                <Content contentContainerStyle={{height: '100%'}}>
                    <Text
                        style={styles.codeword}>
                            {this.state.codeword}
                    </Text>
                    <Text style={styles.crossMark}>+</Text>
                    <Text onPress={this.backViewPoint}  style={styles.backButton}>
                        <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/emergy-19023.appspot.com/o/location_arrow.png?alt=media'}} style={{height: 48, width:48}}/>
                    </Text>
                    <Text onPress={this.changeMapType} style={styles.mapTypeButton}>
                        <Image  source ={{uri: 'https://firebasestorage.googleapis.com/v0/b/emergy-19023.appspot.com/o/disaster_icons%2Fmapstyle.png?alt=media'}} style={{height: 48, width:48}} />
                    </Text>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={{position: 'absolute', left: 0, right: 0, bottom: 0, top: 0}}
                        region={{
                            latitude: this.state.latitude, 
                            longitude: this.state.longitude,
                            latitudeDelta: this.state.latitudeDelta,
                            longitudeDelta: this.state.longitudeDelta
                        }}
                        mapType={this.state.mapType}
                        onRegionChangeComplete={this.onRegionChange}
                        showsUserLocation={true}
                        followUserLocation={true}>

                        {
                            this.state.tabs.map((item, i) => (
                                <Marker
                                key={i}
                                coordinate={{
                                    latitude: item.latitude,
                                    longitude: item.longitude,
                                }}
                                >
                                <Image source ={{uri: item.icon}} style={{height: 35, width:35 }} />
                                </Marker>
                            ))
                            
                        }
                    </MapView>
                    <Button
                        style={{
                            flex: 1,
                            position: 'absolute',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            bottom: 75,
                            width: 200,
                        }}
                        onPress={()=>{this.props.navigation.navigate('TagScreen',{codeword:this.state.codeword})}}
                        success>
                        <Text style={{color: 'white'}}> {'Add'} </Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

export default MapScreen;
