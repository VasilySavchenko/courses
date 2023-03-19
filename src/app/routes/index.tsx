import React, { useEffect } from 'react';
import { RouteObject, useNavigate, useRoutes } from 'react-router-dom';

import Auth from '@/app/components/Auth';
import MainPage from '@/app/views/MainPage';
import AllCourses from '@/app/components/Сourses/AllCourses';
import SelectedCourse from '@/app/components/Сourses/SelectedCourse';

/**
 * ComponentRoutes holds all needed information to fill up routes config.
 */
export class ComponentRoutes implements RouteObject {
    /** data route config*/
    constructor(
        public path: string,
        public element: React.ReactNode,
        public children?: ComponentRoutes[]
    ) { }
    /** Method for creating child sub-routes path */
    public with(
        child: ComponentRoutes,
    ): string {
        return `${this.path}/${child.path}`;
    }
    /** Call with method for each child */
    public addChildren(children: ComponentRoutes[]): ComponentRoutes {
        this.children = children;

        return this;
    }
}

/** Route config implementation */
export class RouteConfig {
    public static MainPage: ComponentRoutes = new ComponentRoutes(
        '/',
        <MainPage/>
    );

    public static Auth: ComponentRoutes = new ComponentRoutes(
        'auth',
        <Auth/>
    );
    public static AllCourses: ComponentRoutes = new ComponentRoutes(
        'all-courses',
        <AllCourses/>
    );

    public static SelectedCourse: ComponentRoutes = new ComponentRoutes(
        '/all-courses/course',
        <SelectedCourse/>
    );

    public static routes: ComponentRoutes[] = [
        RouteConfig.MainPage.addChildren([
            RouteConfig.Auth,
            RouteConfig.AllCourses,
            RouteConfig.SelectedCourse,
        ]),
    ];
}

export const Routes = () => {
    const nav = useNavigate();
    const token = window.localStorage.getItem('AUTH_TOKEN');

    useEffect(() => {
        if (!token) {
            nav(`${RouteConfig.Auth.path}`);
        }
        else { nav(`${RouteConfig.AllCourses.path}`); }
    }, [token]);

    return useRoutes(RouteConfig.routes);
};
