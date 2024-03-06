import classnames from 'classnames';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

// Styles.
import styles from './Loader.module.css';

const Loader = ({ className, primary, secondary }) => (
    <div className={classnames(styles.Wrapper, className)}>
        <FontAwesomeIcon
            className={classnames(styles.Spinner,
                primary && styles.Primary,
                secondary && styles.Secondary)}
            icon={faSpinner} />
    </div>
);

Loader.propTypes = {
    className: PropTypes.string,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
};

export default Loader;
