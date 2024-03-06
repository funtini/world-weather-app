import React, { useEffect, useRef, useCallback } from 'react';

// Components
import DayWeather from '../../components/day-weather';
import Forecast from '../../components/forecast';
import Loader from '../../components/loader';
import Alert from '../../components/alert';

// Slice Actions/Selectors
import {
    showNotification,
    hideNotification,
    getNotificationStatus
} from '../../state/notication-slice/NotificationSlice';
import { addFavorite, removeFavorite } from '../../state/location-slice/LocationSlice'

// Hooks
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import useCurrentWeather from '../../hooks/useCurrentWeather';

// Utils
import { NOTIFICATION_TIMEOUT, NOTIFICATION_TYPES } from '../../utils';

// Styles
import styles from './CurrentWeather.module.css';


const CurrentWeather = () => {
    const timerRef = useRef(null);

    const dispatch = useAppDispatch();
    const notification = useAppSelector(getNotificationStatus);
    const {
        isLoading,
        error,
        isFavorite,
        currentLocation,
        currentWeather,
        forecast
    } = useCurrentWeather();

    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current);
        };
    }, [])

    // Error Notification handling
    useEffect(() => {
        if (error?.data) {
            dispatch(
                showNotification({
                    message: `Ooops! ${error?.data?.message} !`,
                    type: NOTIFICATION_TYPES.error
                })
            )
        }
    }, [error?.data, dispatch])

    const _handleAddLocation = useCallback(() => {
            dispatch(addFavorite({
                    ...currentLocation,
                    temp: currentWeather?.temp
                })
            )

            dispatch(showNotification({
                message: `Added ${currentLocation?.name} to favorites!`,
                type: NOTIFICATION_TYPES.success
            }))
        }, [currentLocation, currentWeather, dispatch]
    );

    const _handleRemoveLocation = useCallback( () => {
            const { id, name } = currentLocation;

            dispatch(removeFavorite(id));

            dispatch(showNotification({
                    message: `Removed ${name} from list!`,
                    type: NOTIFICATION_TYPES.default
                })
            )
        }, [currentLocation, dispatch]
    );

    const renderNotification = () => {
        if (!notification?.show || !notification?.message) {
            return;
        }

        // If a current notification is "active" clear the timeout, so the new notification won't be dismissed
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        // Dismiss the notification after NOTIFICATION_TIMEOUT
        timerRef.current = setTimeout(() => {
            dispatch(hideNotification());
        }, NOTIFICATION_TIMEOUT)

        return (
            <Alert
                className={styles.Alert}
                show={notification?.show}
                message={notification?.message}
                type={notification?.type} />
        );
    };

    if (isLoading) {
        return <Loader className={styles.Loader} secondary />
    }

    return (
        <section className={styles.Wrapper}>
            <DayWeather
                isFavorite={isFavorite}
                name={currentLocation?.name}
                country={currentLocation?.country}
                data={currentWeather}
                onAddLocation={_handleAddLocation}
                onRemoveLocation={_handleRemoveLocation}
            />
            <Forecast
                id={currentLocation?.id}
                data={forecast}
            />
            { renderNotification() }
        </section>
    );
}

export default CurrentWeather;