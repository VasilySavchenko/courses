import React, { useEffect, useMemo, useState } from 'react';

import './index.scss';
import { Pagination } from '@components/common/Pagination';
import CourseComponent from '@components/Сourses/AllCourses/Course';
import appConfig from '@/app/configs/appConfig.json';
import { getAllCourses } from '@/app/store/courses/action';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { Course } from '@/entities/course';

const AllCourses = () => {
    const dispatch = useAppDispatch();
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(appConfig.FIRST_INDEX);
    const { courses } = useAppSelector((state) => state.coursesSlice);

    useEffect(() => {
        dispatch(getAllCourses());
    }, []);

    //  Get the number of items to be displayed
    const allCurses = useMemo(() => {
        if (courses) {
            const lastPageIndex = currentPageNumber * appConfig.COUNT_PAGE_ITEM;
            const firstPageIndex = lastPageIndex - appConfig.COUNT_PAGE_ITEM;

            return courses.slice(firstPageIndex, lastPageIndex);
        }

        return [];
    },
    [currentPageNumber, courses]
    );

    const onPageChange = (pageNumber: number) => {
        setCurrentPageNumber(pageNumber);
    };

    return <div>
        {allCurses.map((course: Course) => <CourseComponent course={course}/>)}
        <Pagination
            onChange={onPageChange}
            currentPage={currentPageNumber}
            itemsTotal={courses.length}
            itemsPerPage={appConfig.COUNT_PAGE_ITEM}
        />
    </div>;
};
export default AllCourses;
