import { createAsyncThunk } from '@reduxjs/toolkit';

import { CoursesApi } from '@/api/courses';
import { Course } from '@/entities/course';

const client = new CoursesApi();

export const getAllCourses = createAsyncThunk(
    'lesson/lesson-by-id',
    async function(): Promise<Course[]> {
        return await client.getAllCurses();
    }
);
