import React from 'react';
import classnames from 'classnames';

import styles from './baseButton.scss';


export const BaseButton = ({
    className,
    children,
    ...otherProps
}) =>
    <button
        className={ classnames(styles.root, className) }
        { ...otherProps }
    >
        { children }
    </button>;



