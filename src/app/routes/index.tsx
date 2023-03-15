import React from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

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

    public static AllCourses: ComponentRoutes = new ComponentRoutes(
        'all-courses',
        <AllCourses/>
    );

    public static SelectedCourse: ComponentRoutes = new ComponentRoutes(
        'course',
        <SelectedCourse/>
    );

    public static routes: ComponentRoutes[] = [
        RouteConfig.MainPage.addChildren([
            RouteConfig.AllCourses,
        ]),
    ];
}

export const Routes = () =>
    /** New feature of react-router v6.4.3, allows to implement routes tree according to config. */
    useRoutes(RouteConfig.routes);
