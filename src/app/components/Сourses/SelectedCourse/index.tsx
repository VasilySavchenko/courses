import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import LessonItem from '@components/LessonItem/inde';
import Loader from '@components/Loader';
import { resetLesson } from '@/app/store/lesson/slice';
import { lessonById } from '@/app/store/lesson/action';
import { useAppDispatch, useAppSelector } from '@/app/store';

import './index.scss';

const SelectedCourse = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const id = searchParams.get('id');

    const selectedCourse = useAppSelector((state) => state.lessonSlice.lesson);
    const loading = useAppSelector((state) => state.lessonSlice.loading);

    useEffect(() => {
        dispatch(lessonById(`${id}`));

        return () => {
            dispatch(resetLesson);
        };
    }, []);

    return <>
        {loading ? <Loader/> : <div className="selected-course">
            <div className="course-header">{selectedCourse.title}</div>
            <p className="course-info">{selectedCourse?.description}</p>
            <img src={`${selectedCourse?.previewImageLink}/cover.webp`} className="course-img" alt={'course-img'}/>
            <div>
                <LessonItem />
            </div>
        </div>}
    </>;
};

export default SelectedCourse;
