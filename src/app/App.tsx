import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Routes } from './routes';
import { store } from './store';

import './App.scss';

const App: FC = () =>
    <Provider store={store}>
        <BrowserRouter basename="/">
            <Routes />
        </BrowserRouter>
    </Provider>;

export default App;
