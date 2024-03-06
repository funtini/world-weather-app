import { createSelector, createSlice } from '@reduxjs/toolkit';

// Utils
import { getSerializedStorageItem, storageSetItem, WEATHER_FAVORITE_LIST_KEY } from '../../utils';

const initialState = {
    current: null,
    favorites: getSerializedStorageItem(WEATHER_FAVORITE_LIST_KEY) || []
}

// Use of createSlice function that will auto-generate the action types and action creators
// based on the names of the reducer functions.
const locationSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        addFavorite(state, action) {
            state.favorites.push(action?.payload)
            storageSetItem(WEATHER_FAVORITE_LIST_KEY, state.favorites)
        },
        removeFavorite(state, action) {
            const favorites = state.favorites?.filter(location => location?.id !== action?.payload);
            storageSetItem(WEATHER_FAVORITE_LIST_KEY, favorites)
            return {
                ...state,
                favorites,
            }
        },
        setCurrentLocation(state, action) {
            return {
                ...state,
                current: {
                    ...state.current,
                    ...action.payload
            },
            }
        },
    }
})

// Selectors
export const getFavoriteList = createSelector(
    state => state.locations,
    locations => locations?.favorites
)

export const getCurrentLocation = createSelector(
    state => state.locations,
    locations => locations?.current
)

export const getCurrentCoordinates = createSelector(
    state => state?.locations?.current,
    current => current && ({ lat: current?.lat, lon: current?.lon })
)


// Extract the action creators object and the reducer
const { actions, reducer } = locationSlice

export const { addFavorite, removeFavorite, setCurrentLocation } = actions

export default reducer