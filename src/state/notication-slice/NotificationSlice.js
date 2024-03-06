// DUCKS pattern
import {createSelector, createSlice} from '@reduxjs/toolkit';

const initialState = {
    show: false,
    message: null,
    type: null,
}

// Use of createSlice function that will auto-generate the action types and action creators
// based on the names of the reducer functions.
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification(state, action) {
            return {
                ...state,
                show: true,
                message: action.payload.message,
                type: action.payload.type,
            }
        },
        hideNotification(state, action) {
            return {
                ...state,
                show: false,
            }
        }
    }
})

// Selectors
export const getNotificationStatus = createSelector(
    state => state.notification,
    notification => notification
)


// Extract the action creators object and the reducer
const { actions, reducer } = notificationSlice

export const { showNotification, hideNotification } = actions

export default reducer