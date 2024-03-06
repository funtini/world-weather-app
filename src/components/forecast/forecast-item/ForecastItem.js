import PropTypes from 'prop-types';

// Utils
import { WEATHER_COPY_TEXT } from '../../../utils';

// Styles
import styles from './ForecastItem.module.css';

const ForecastItem = ({day, month, description, imageSrc, temp }) => {
    return (
        <li className={styles.Wrapper}>
            <div>
                <p className={styles.WeekDay}>{day}</p>
                <p className={styles.MonthDay}>{month}</p>
                <p className={styles.Description}>{description}</p>
            </div>
            <div>
                <p>
                    <img src={imageSrc} width={50} height={50} alt={day}/>
                </p>
                <p className={styles.Temp}>
                    {temp}{WEATHER_COPY_TEXT.tempSymbol}
                </p>
            </div>
        </li>
    );
}

ForecastItem.propTypes = {
    day: PropTypes.string,
    month: PropTypes.string,
    description: PropTypes.string,
    imageSrc: PropTypes.string,
    temp: PropTypes.number
};

export default ForecastItem;