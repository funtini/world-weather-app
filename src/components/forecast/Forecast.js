import PropTypes from 'prop-types';

// Components
import ForecastItem from './forecast-item';

// Utils
import { WEATHER_COPY_TEXT } from '../../utils';

// Styles
import styles from './Forecast.module.css';

const Forecast = ({ data, id }) => {
    return (
        <div className={styles.Wrapper}>
            <h3>{ WEATHER_COPY_TEXT.forecast }</h3>
            <ul className={styles.ItemsContainer}>
                {
                    data?.map(item =>
                        <ForecastItem
                            key={`${id}_${item?.weekDay}`}
                            imageSrc={item?.iconSrc}
                            day={item?.weekDay}
                            month={item?.monthDay}
                            description={item?.description}
                            temp={item?.temp} />
                    )
                }
            </ul>
        </div>
    );
}

Forecast.propTypes = {
    data: PropTypes.array,
    id: PropTypes.string
};

export default Forecast;