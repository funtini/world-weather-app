import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {
    OPEN_WEATHER_API_BASE_URL,
    forecastResponseAdapter,
    weatherResponseAdapter,
    locationResponseAdapter
} from '../../utils';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: OPEN_WEATHER_API_BASE_URL,
        prepareHeaders(headers) {
            return headers;
        }
    }),
    endpoints(builder) {
        return {
            fetchLocationBySearch: builder.query({
                query: (searchQuery) => `/data/2.5/weather?units=metric&q=${searchQuery}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`,
                transformResponse: (response) => weatherResponseAdapter(response)
            }),
            fetchWeatherForecast: builder.query({
                query: ({lat , lon}) => `/data/2.5/onecall?units=metric&lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${process.env.REACT_APP_WEATHER_API_KEY}`,
                transformResponse: (response) => forecastResponseAdapter(response)
            }),
            fetchLocationByCoordinates: builder.query({
                query: ({lat , lon}) => `/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.REACT_APP_WEATHER_API_KEY}`,
                transformResponse: (response) => locationResponseAdapter(response)
            }),
        };
    },
});

export const { useFetchLocationBySearchQuery, useFetchWeatherForecastQuery, useFetchLocationByCoordinatesQuery } = apiSlice;