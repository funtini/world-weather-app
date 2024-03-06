import { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

// Styles
import styles from './SearchBar.module.css';

const SearchBar = ({ className, onSearchSubmit }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const _handleSubmit = (event) => {
        event?.preventDefault();
        onSearchSubmit(searchTerm)
        setSearchTerm('');
    }

    const _handleOnChange = (event) => {
        setSearchTerm(event?.target?.value)
    }

    return (
        <form className={classnames(styles.Wrapper, className)} onSubmit={_handleSubmit}>
            <input
                className={styles.Input}
                type={'search'}
                name={'search-location'}
                placeholder={'Search your location'}
                value={searchTerm}
                onChange={_handleOnChange}
            />
            <div
                role="button"
                className={styles.Icon}
            >
                <FontAwesomeIcon icon={faSearch} />
            </div>
        </form>

    );
}

SearchBar.propTypes = {
    className: PropTypes.string,
    onSearchSubmit: PropTypes.func
};

export default SearchBar;