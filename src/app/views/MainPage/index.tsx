import React from 'react';
import { Outlet } from 'react-router-dom';

import './index.scss';

const MainPage = () => <div className="main-page">
    <Outlet/>
</div>;
export default MainPage;
