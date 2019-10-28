'use strict';
import {Dimensions, StyleSheet} from 'react-native';

//==========const screen value=================
export const DESIGN_WIDTH = 1080;
export const DESIGN_HEIGHT = 1920;
export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;
export const globalPaddingHorVal = 25;
export const globalMaxPaddingHorVal = 50;

export const globalPaddingVerVal = 25;

export function getDeviceWidth(width) {
    return Math.round((width * DEVICE_WIDTH) / DESIGN_WIDTH);
}
export function getDeviceHeight(height) {
    return Math.round((height * DEVICE_HEIGHT) / DESIGN_HEIGHT);
}
//=======const screen value end===================
