import { useState, useEffect } from 'react';
import classnames from 'classnames';

// Hooks
import { useAppDispatch, useAppSelector } from '../../state/hooks';

// Slice Actions / Selectors
import { setActiveKey, getActiveKey } from '../../state/side-panel-slice/SidePanelSlice'

// Styles
import styles from './SidePanel.module.css';
import PropTypes from "prop-types";

const ESC_KEY = 27;

const SidePanel = ({ id, onClosePanel, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const activePanelKey = useAppSelector(getActiveKey)
    const dispatch = useAppDispatch();

    const panelContainerStyle = classnames(
        styles.Container,
        { [styles.Hidden]: !isOpen },
    );
    const panelOutsideStyle = classnames(styles.Outside, {
        [styles.CloseOutside]: !isOpen
    });
    const panelContentStyle = classnames(
        styles.Content,
        { [styles.Content]: !isOpen }
    );

    useEffect(() => {
        if (activePanelKey === id) {
            !isOpen && setIsOpen(true);
        } else {
            isOpen && setIsOpen(false);
        }
    }, [activePanelKey, isOpen, id]);

    const _handleClosePanel = event => {
        event.preventDefault();

        dispatch(setActiveKey(null))
        setIsOpen(false);

        onClosePanel && onClosePanel();
    };

    const _handleKeyDown = event => {
        if (event.keyCode === ESC_KEY) {
            event.stopPropagation();

            _handleClosePanel(event);
        }
    };

    return (
        <div className={panelContainerStyle} onKeyDown={_handleKeyDown}>
            <div className={panelOutsideStyle} onClick={_handleClosePanel} />
            <div className={panelContentStyle}>
                { children }
            </div>
        </div>
    );
}

SidePanel.propTypes = {
    children: PropTypes.node,
    id: PropTypes.string,
    onClosePanel: PropTypes.func
};

export default SidePanel;