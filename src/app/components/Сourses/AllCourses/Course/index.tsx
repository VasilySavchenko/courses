import React, { useState } from 'react';
import { Course } from '@/entities/course';

type CourseProps = {
    course: Course;
};

import './index.scss';

const CourseComponent: React.FC<CourseProps> = ({ course }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="course">
            <div className="course-header">
                <img src={`${course.previewImageLink}/cover.webp`} alt={course.title} />
                <h2>{course.title}</h2>
            </div>
            <div className="course-info">
                <p>{course.lessonsCount} уроков</p>
                <p>{course.description}</p>
                <p>Рейтинг: {course.rating}</p>
            </div>
            <video controls src={course.meta.courseVideoPreview.link} onMouseOver={() => setIsPlaying(true)} onMouseOut={() => setIsPlaying(false)} muted loop>
            </video>
            {isPlaying &&
        <div className="video-overlay">
            <p>Видео курса "{course.title}"</p>
        </div>
            }
        </div>
    );
};

export default CourseComponent;
