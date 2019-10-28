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
    AsyncStorage ,
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
import TreeView from 'react-native-final-tree-view';
import icons from './data';
import { SearchBar } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Styles
import styles from './style';
TreeView.defaultProps.getCollapsedNodeHeight= () => 32;
class TagScreen extends React.Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired,
        navigation: PropTypes.object.isRequired,
    };
    static defaultProps = {};
    constructor(props) {
        super(props);
        this.state = {
            data: icons,
            search: '',
        };
    }
    componentDidMount(){
        this._retrieveData();
    }
    _storeData = async (node) => {
        try {
            var equalto = true;
            if(icons[0].children.length>0){
                for(var i=0;i<icons[0].children.length;i++){
                    if(icons[0].children[i].name==node.name) equalto=false;
                }
            }
            if(equalto){
                var node1 = JSON.parse(JSON.stringify(node));
                node1.id = node1.id+10000;
                icons[0].children.unshift(node1);
                if(icons[0].children.length>5) icons[0].children.splice(5,1);
                await AsyncStorage.setItem('name', JSON.stringify(icons[0].children));
                this.setState({data: icons});
            }
        } catch (error) {
            // Error saving data
        }
    }
    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('name');
            if (value !== null) {
                icons[0].children=[];
                icons[0].children=JSON.parse(value);
                this.setState({data: icons});
            }
        } catch (error) {
            // Error retrieving data
        }
    }
    getIndicator = (isExpanded, hasChildrenNodes, url) => {
        return <Image style={{width: 24, height:24}} source={{uri: url}}/>;
        if (!hasChildrenNodes) {
        } else if (isExpanded) {
            return <Icon name="folder-open" />;
        } else {
            return <Icon name="folder" />;
        }
    };

    updateSearch = search => {
        var icons1 = JSON.parse(JSON.stringify(icons));
        var data = this.keywordFilter(icons1, search);
        this.setState({data: data, search: search});
    };
     
    keywordFilter = (nodes, keyword) => {
        var newNodes = [];
        for (var n of nodes) {
            if (n.children) {
            var nextNodes = this.keywordFilter(n.children, keyword);
            if (nextNodes.length > 0) {
                n.children = nextNodes;
            } else if (n.name.toLowerCase().includes(keyword.toLowerCase())) {
                n.children = nextNodes.length > 0 ? nextNodes : [];
            }
            if (
                nextNodes.length > 0 ||
                n.name.toLowerCase().includes(keyword.toLowerCase())
            ) {
                newNodes.push(n);
            }
            } else {
            if (n.name.toLowerCase().includes(keyword.toLowerCase())) {
                newNodes.push(n);
            }
            }
        }
        return newNodes;
    };
    getName=(name, level)=> {
        var edited_name = name;
        if(edited_name.length>26-level*2)edited_name = edited_name.substr(0,24-level*2) + "...";
        return edited_name;
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
                <SearchBar
                    placeholder="Search..."
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                    // style={styles.searchbar}
                />
                <Content style={{marginLeft:20, marginTop:20}}>
                    <View>
                        <TreeView
                            data={this.state.data} // defined above
                            renderNode={({node, level, isExpanded, hasChildrenNodes}) => {
                                return (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingTop: 5,
                                        }}>
                                        <View style={{marginLeft: 25 * level}} />
                                        {this.getIndicator(isExpanded, hasChildrenNodes, node.icon)}
                                        <Text style={{marginLeft: 12, fontSize: 20,}}>{this.getName(node.name, level)}</Text>
                                    </View>
                                );
                            }}
                            onNodePress={({node, level}) => {
                                if (!node.children) {
                                    this._storeData(node);
                                    this.props.navigation.navigate('AddDisasterScreen',{node:node, codeword:navigation.state.params.codeword});
                                }
                            }}
                        />
                    </View>
                </Content>
            </Container>
        );
    }
}

export default TagScreen;
