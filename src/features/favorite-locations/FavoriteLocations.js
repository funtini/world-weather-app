// Components
import SidePanel from '../../components/side-panel';
import FavoriteLocationItem from './favorite-location-item';

// Slice
import { showNotification } from '../../state/notication-slice/NotificationSlice';
import { getFavoriteList, removeFavorite, setCurrentLocation } from '../../state/location-slice/LocationSlice';

// Hooks
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import useViewport from '../../hooks/useViewport';

// Utils
import { SIDE_PANEL_KEYS, NOTIFICATION_TYPES, WEATHER_COPY_TEXT } from '../../utils';

// Styles
import styles from './FavoriteLocations.module.css';

const FavoriteLocations = () => {
    const dispatch = useAppDispatch();
    const favoriteList = useAppSelector(getFavoriteList);
    const hasLocations = favoriteList?.length

    const { isMobile } = useViewport();

    const _handleRemoveLocation = ({id, name}) => {
        dispatch(removeFavorite(id));
        dispatch(showNotification({
            message: `Removed ${name} from list!`,
            type: NOTIFICATION_TYPES.default
        }))
    }

    const _handleClickLocation = (location) => {
        dispatch(setCurrentLocation(location));
    }

    const renderHeader = () => (
        <div className={styles.Header}>
            <h3>{ WEATHER_COPY_TEXT.myLocations }</h3>
        </div>
    );

    const renderEmptyLabel = () => (
        <div className={styles.EmptyLabel}>
            { WEATHER_COPY_TEXT.emptyList }
        </div>
    )

    const renderFavoriteList = () => (
        <ul className={styles.FavoriteList}>
            { favoriteList?.map( item => (
                    <FavoriteLocationItem
                        key={item?.id}
                        data={item}
                        onClick={_handleClickLocation}
                        onRemove={_handleRemoveLocation} />
                )
            )
            }
        </ul>
    )

    return isMobile ?
        <SidePanel id={SIDE_PANEL_KEYS.favoriteLocations}>
            { renderHeader() }
            { hasLocations ? renderFavoriteList() : renderEmptyLabel() }
        </SidePanel> :
        <div className={styles.Sidebar}>
            { renderHeader() }
            { hasLocations ? renderFavoriteList() : renderEmptyLabel() }
        </div>
}

export default FavoriteLocations;