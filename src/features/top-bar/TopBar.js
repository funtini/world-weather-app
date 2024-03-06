import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'

// Components
import SearchBar from '../../components/search-bar';
import Button from '../../components/button';

// Slices
import { setNewQuery } from '../../state/search-slice/SearchSlice';
import { setActiveKey } from '../../state/side-panel-slice/SidePanelSlice';

// Hooks
import useViewport from '../../hooks/useViewport';
import { useAppDispatch } from '../../state/hooks';

// Utils
import { SIDE_PANEL_KEYS } from '../../utils';

// Styles
import styles from './TopBar.module.css';


const TopBar = () => {
    const dispatch = useAppDispatch();
    const { isMobile } = useViewport();

    console.log('api key', process.env.REACT_APP_WEATHER_API_KEY)

    const _handleSearchSubmit = (searchTerm) => {
        dispatch(setNewQuery(searchTerm));
    }

    const _handleClickStarButton = () => {
        dispatch(setActiveKey(SIDE_PANEL_KEYS.favoriteLocations));
    }

    return (
        <div className={styles.Wrapper}>
            <SearchBar
                className={styles.SearchBar}
                onSearchSubmit={_handleSearchSubmit}/>
            {isMobile &&
                <Button
                    className={styles.Button}
                    onClick={_handleClickStarButton}>
                    <FontAwesomeIcon className={styles.Icon} icon={faList}/>
                </Button>
            }
        </div>
    )
}

export default TopBar;