import PropTypes from "prop-types";
import classnames from 'classnames';

// Styles
import styles from './Button.module.css';

const Button = ({ children, className, ...props }) => {
    return (
        <button
            className={classnames(styles.Button, className)}
            { ...props }
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
};

export default Button;