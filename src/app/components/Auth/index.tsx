import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '@/app/store/auth/action';
import { useAppDispatch } from '@/app/store';

import './index.scss';

const Auth = () => {
    const dispatch = useAppDispatch();
    const nav = useNavigate();
    const authorization = async () => {
        await dispatch(getToken());
        nav('all-courses');
    };

    return <div className="authorization">
        <h1>Do you want to see my beautiful application?</h1>
        <button onClick={() => authorization()}>Yes</button>
    </div>;
};
export default Auth;
