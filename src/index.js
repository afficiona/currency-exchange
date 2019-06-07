import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './style/app.css';
import App from './containers/App';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
