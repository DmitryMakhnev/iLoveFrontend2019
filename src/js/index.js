import ReactDOM from 'react-dom';
import React from 'react';
import { configure } from 'mobx';

import { App } from './ui/components/app/app';
import '../styles/default.scss';


configure({
    enforceActions: 'always',
});


const appNode = document.querySelector('.app');
ReactDOM.render(<App />, appNode);

