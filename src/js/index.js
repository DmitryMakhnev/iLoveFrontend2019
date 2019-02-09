import ReactDOM from 'react-dom';
import React from 'react';
import { configure } from 'mobx';

import { App } from './ui/components/app/app';
import '../styles/default.scss';
import { inject } from 'diii';
import { DeviceData } from './deviceData';


configure({
    enforceActions: 'always',
});

const deviceData = /** @type {DeviceData} */ inject(DeviceData);
if (!deviceData.isMobile) {
    document.body.classList.add('hover');
}

const appNode = document.querySelector('.app');
ReactDOM.render(<App />, appNode);

