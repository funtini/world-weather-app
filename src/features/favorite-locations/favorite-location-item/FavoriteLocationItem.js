import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

// Utils
import { WEATHER_COPY_TEXT } from '../../../utils';

// Styles
import styles from './FavoriteLocationItem.module.css';

const FavoriteLocationItem = ({ data, onRemove, onClick }) => {
    const _handleClickRemove = () => onRemove(data);
    const _handleClickLocation = () => onClick(data);

    return (
        <li className={ styles.Wrapper }>
            <div className={ styles.Info } onClick={_handleClickLocation}>
                <div>
                    <p className={styles.Name}>{ data?.name }</p>
                    <p className={styles.Country}>{data?.country}</p>
                </div>
                <div className={styles.Temp}>
                    { data?.temp }{ WEATHER_COPY_TEXT.celsius }
                </div>
            </div>
            <div className={styles.Button} role={'button'} onClick={_handleClickRemove}>
                <FontAwesomeIcon icon={ faCircleXmark } />
            </div>
        </li>
    );
}

FavoriteLocationItem.propTypes = {
    data: PropTypes.object,
    onRemove: PropTypes.func,
    onClick: PropTypes.func
};

export default FavoriteLocationItem;