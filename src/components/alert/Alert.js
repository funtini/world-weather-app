import classnames from 'classnames';
import PropTypes from 'prop-types';

// Utils
import { NOTIFICATION_TYPES } from '../../utils';

// Styles.
import styles from './Alert.module.css';

const Alert = ({ className, show, message, type }) => {
    const isSuccess = type === NOTIFICATION_TYPES.success;
    const isError = type === NOTIFICATION_TYPES.error;

    const contentClassName = classnames(
        styles.Content,
        show && styles.Show,
        isSuccess && styles.Success,
        isError && styles.Error
    );

    return (
        <div className={className}>
            <div className={contentClassName}>
                {message}
            </div>
        </div>
    )
};

Alert.propTypes = {
    className: PropTypes.string,
    show: PropTypes.bool,
    message: PropTypes.string,
    type: PropTypes.string
};

export default Alert;
