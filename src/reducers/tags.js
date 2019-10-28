import {createAction, handleActions, combineActions} from 'redux-actions';

const initialState = {
    tags: [],
    loading: false,
    error: null,
};
export const setTags = createAction('SET_TAGS');

export const resetTags = createAction('RESET_TAGS');

export const fetchTagsRequest = createAction('FETCH_TAGS_REQUEST');
export const fetchTagsSuccess = createAction('FETCH_TAGS_SUCCESS');
export const fetchTagsFail = createAction('FETCH_TAGS_FAIL');

export default handleActions(
    {
        [combineActions(fetchTagsRequest)]: (state, action) => {
            return {
                ...state,
                loading: true,
                error: null,
            };
        },
        [combineActions(fetchTagsSuccess, setTags)]: (state, action) => {
            return {
                ...state,
                tags: action.payload,
                loading: false,
                error: null,
            };
        },
        [combineActions(fetchTagsFail)]: (state, action) => {
            const {message} = action.payload;

            return {
                ...state,
                loading: false,
                error: message,
            };
        },
        [combineActions(resetTags)]: (state, action) => {
            return initialState;
        },
    },
    initialState,
);
