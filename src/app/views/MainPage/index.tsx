import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { getToken } from '@/app/store/auth/action';
import { useAppDispatch } from '@/app/store';

const MainPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getToken());
    }, []);

    return <div>
        <Outlet/>
    </div>;
};
export default MainPage;
