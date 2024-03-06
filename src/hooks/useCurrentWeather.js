import { useEffect, useCallback, useMemo } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';

// Slice
import { getSearchQuery } from '../state/search-slice/SearchSlice';
import {
    getCurrentCoordinates,
    getCurrentLocation,
    getFavoriteList,
    setCurrentLocation
} from '../state/location-slice/LocationSlice';
import {
    useFetchLocationByCoordinatesQuery,
    useFetchLocationBySearchQuery,
    useFetchWeatherForecastQuery
} from '../state/weather-api-slice/WeatherApiSlice';

// Hooks
import { useAppDispatch, useAppSelector } from '../state/hooks';

// Utils
import { DEFAULT_LOCATION_COORDINATES, GEO_LOCATION_OPTIONS } from '../utils';

const useCurrentWeather = () => {
    const dispatch = useAppDispatch();
    const favorites = useAppSelector(getFavoriteList);
    const currentLocation = useAppSelector(getCurrentLocation);
    const coordinates = useAppSelector(getCurrentCoordinates);
    const searchQuery = useAppSelector(getSearchQuery);

    const hasLocationInfo = currentLocation?.name && currentLocation?.country;

    // Using of skip argument to avoid making requests in specific conditions and
    // skipToken to prevent requests while coordinates have not yet been populated
    const {
        isFetching: isLoadingSearch,
        currentData: dataSearch,
        error: errorSearch
    } = useFetchLocationBySearchQuery(searchQuery, {
        skip: !searchQuery?.length,
    });
    const {
        isUninitialized,
        isFetching: isLoadingWeather,
        data: dataWeather
    } = useFetchWeatherForecastQuery(coordinates || skipToken);
    const {
        isFetching: isLoadingLocation,
        data: dataLocation
    } = useFetchLocationByCoordinatesQuery(coordinates || skipToken, {
        skip: hasLocationInfo
    });

    const isFavorite = useMemo(() => (
        favorites?.some(location => location?.id === currentLocation?.id)
    ), [favorites, currentLocation?.id])

    const getUserLocation = useCallback((position) => {
        dispatch(
            setCurrentLocation({
                lat: position?.coords?.latitude,
                lon: position?.coords?.longitude
            })
        );
    },[dispatch]);

    const getDefaultLocation = useCallback( () => {
        dispatch(
            setCurrentLocation(DEFAULT_LOCATION_COORDINATES)
        )
    },[dispatch]);

    // Get users location by geolocation web API
    useEffect(() => {
        if (navigator?.geolocation) {
            navigator.geolocation.getCurrentPosition(getUserLocation, getDefaultLocation, GEO_LOCATION_OPTIONS);
        } else {
            getDefaultLocation();
        }
    }, [getUserLocation, getDefaultLocation])

    useEffect(() => {
        dataSearch && dispatch(
            setCurrentLocation(dataSearch)
        );

    }, [dataSearch, dispatch])

    useEffect(() => {
        dataLocation && dispatch(
            setCurrentLocation(dataLocation)
        );

    }, [dataLocation, dispatch])

    const isLoading = useMemo(
        () => isUninitialized || isLoadingWeather || isLoadingSearch || isLoadingLocation,
        [isUninitialized, isLoadingSearch, isLoadingWeather, isLoadingLocation]
    );

    return {
        isLoading,
        error: errorSearch,
        isFavorite,
        currentLocation,
        currentWeather: dataWeather?.current,
        forecast: dataWeather?.forecast,
    };
}

export default useCurrentWeather;