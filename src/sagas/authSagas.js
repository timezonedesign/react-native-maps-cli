import {all, takeLatest, call, put} from 'redux-saga/effects';
import {
    signUpRequest,
    signUpSuccess,
    signUpFail,
    signInFail,
    signInRequest,
    signInSuccess,
    signOutRequest,
    signOutFail,
    signOutSuccess,
} from '../reducers/auth';

export function* handleSignup(action) {}
export function* handleSignin(action) {}
export function* handleSignout(action) {}
export default function* authSagas() {
    yield all([
        takeLatest(signUpRequest.toString(), handleSignup),
        takeLatest(signInRequest.toString(), handleSignin),
        takeLatest(signOutRequest.toString(), handleSignout),
    ]);
}
