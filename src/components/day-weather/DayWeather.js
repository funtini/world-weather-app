import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as starFilled } from "@fortawesome/free-solid-svg-icons";
import { faStar as starEmpty } from "@fortawesome/free-regular-svg-icons";

// Utils
import { WEATHER_COPY_TEXT } from '../../utils';

// Styles
import styles from './DayWeather.module.css';

const DayWeather = ({ data, name, country, onAddLocation, onRemoveLocation, isFavorite }) => {
    const starButtonClass = classnames(styles.StarButton, isFavorite && styles.StarFilled)

    const _handleStarClick = () => isFavorite ? onRemoveLocation() : onAddLocation();

    return (
        <div className={styles.Wrapper}>
            <div className={starButtonClass} onClick={_handleStarClick}>
                {
                    isFavorite ? <FontAwesomeIcon icon={starFilled} /> :
                        <FontAwesomeIcon icon={starEmpty} />
                }
            </div>
            <h1> {name} </h1>
            <div className={styles.Country}>
                {` (${country})`}
            </div>
            <div className={styles.Description}>
                {data?.description}
            </div>
            <div className={styles.Temp}>
                {data?.temp}{' '}{WEATHER_COPY_TEXT.celsius}
            </div>
            <div className={styles.Description}>
                {WEATHER_COPY_TEXT.feelsLike}{' '}{data?.feelsLike}{WEATHER_COPY_TEXT.tempSymbol}
            </div>
            <img
                src={data?.iconSrc}
                width={150}
                height={150}
                alt={name}
            />
        </div>
    );
}

DayWeather.propTypes = {
    data: PropTypes.object,
    name: PropTypes.string,
    country: PropTypes.string,
    onAddLocation: PropTypes.func,
    onRemoveLocation: PropTypes.func,
    isFavorite: PropTypes.bool
};

export default DayWeather;