import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RouteConfig } from '@/app/routes';
import { Course } from '@/entities/course';

type CourseProps = {
    course: Course;
};

import './index.scss';

const CourseComponent: React.FC<CourseProps> = ({ course }) => {
    const nav = useNavigate();

    return (
        <div className="course" onClick={() => nav(`${RouteConfig.SelectedCourse.path}?id=${course.id}`)}>
            <div className="course-header">
                <h2>{course.title}</h2>
            </div>
            <div className="course-img">
                <img src={`${course.previewImageLink}/cover.webp`} alt={course.title} />
            </div>
            <div className="course-info">
                <p>{course.lessonsCount} lessons</p>
                <p>{course.description}</p>
                <p>Rating: {course.rating}</p>
            </div>
        </div>
    );
};

export default CourseComponent;
