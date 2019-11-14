import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Root from 'features/Root'
import { store } from 'redux/store';


ReactDOM.render(
        <Provider store={store}>
            <Root />
        </Provider>,
    document.getElementById('root'),
);
