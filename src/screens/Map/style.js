'use strict';
import {StyleSheet, Platform} from 'react-native';
const styles = StyleSheet.create({
    codeword: {
        position: 'absolute',
        top: 15,
        width: '100%',
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        zIndex: 1,
    },
    crossMark: {
        position: 'absolute',
        top:'49%',
        left: '49%',
        zIndex: 1,
        color: 'red',
        height: '2%',
        width: '2%',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    backButton: {
        position: 'absolute',
        bottom: '15%',
        left: '4%',
        height: 72,
        width: 72,
        zIndex: 1,

    },
    mapTypeButton: {
        position: 'absolute',
        top: '5%',
        right: '1%',
        height: 72,
        width: 72,
        zIndex: 1,

    }
});
export default styles;
