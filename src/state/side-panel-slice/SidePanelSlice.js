// DUCKS pattern
import {createSelector, createSlice} from '@reduxjs/toolkit';

const initialState = {
    activeKey: null,
}

// Use of createSlice function that will auto-generate the action types and action creators
// based on the names of the reducer functions.
const sidePanelSlice = createSlice({
    name: 'sidePanel',
    initialState,
    reducers: {
        setActiveKey(state, action) {
            return { activeKey: action?.payload }
        },
    }
})

// Selector
export const getActiveKey = createSelector(
    state => state.sidePanel,
    sidePanel => sidePanel?.activeKey
)

// Extract the action creators object and the reducer
const { actions, reducer } = sidePanelSlice

export const { setActiveKey } = actions

export default reducer