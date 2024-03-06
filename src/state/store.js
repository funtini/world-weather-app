import { configureStore } from '@reduxjs/toolkit';

// Slice Reducers
import SidePanelReducer from './side-panel-slice/SidePanelSlice';
import SearchReducer from './search-slice/SearchSlice';
import LocationReducer from './location-slice/LocationSlice';
import NotificationReducer from './notication-slice/NotificationSlice';
import { apiSlice } from './weather-api-slice/WeatherApiSlice';

export const store = configureStore({
    reducer: {
        search: SearchReducer,
        locations: LocationReducer,
        sidePanel: SidePanelReducer,
        notification: NotificationReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat(apiSlice.middleware);
    }
})
