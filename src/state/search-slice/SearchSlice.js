// DUCKS pattern
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { setCurrentLocation } from '../location-slice/LocationSlice';

const initialState = {
    query: '',
}

// Use of createSlice function that will auto-generate the action types and action creators
// based on the names of the reducer functions.
const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setNewQuery(state, action) {
            return {
                query: action?.payload,
            }
        },
    },
    extraReducers: {
        [setCurrentLocation]: (state, action) => {
            state.query = ''
        },
    },
})

// Selectors
export const getSearchQuery = createSelector(
    state => state.search,
    search => search?.query
)

// Extracting Actions and Reducer
const { actions, reducer } = searchSlice

export const { setNewQuery } = actions

export default reducer