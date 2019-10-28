/**
 * @format
 */

import React from 'react';
import {AppRegistry, View, StyleSheet} from 'react-native';
import App from './App';
import configureStore from './src/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {name as appName} from './app.json';
// import 'react-native-gesture-handler';
import {Root, Spinner} from 'native-base';
export const {store, persistor} = configureStore();

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
const engine = () => (
    <Provider store={store}>
        <PersistGate
            loading={
                <Root>
                    <View style={styles.container}>
                        <Spinner color="#219653" />
                    </View>
                </Root>
            }
            persistor={persistor}>
            <Root>
                <App />
            </Root>
        </PersistGate>
    </Provider>
);
AppRegistry.registerComponent(appName, () => engine);
