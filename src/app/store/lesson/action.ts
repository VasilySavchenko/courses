import { createAsyncThunk } from '@reduxjs/toolkit';

import { LessonApi } from '@/api/lesson';
import { SingleCourse } from '@/entities/course';

const client = new LessonApi();

export const lessonById = createAsyncThunk(
    'courses/all-courses',
    async function(id: string): Promise<SingleCourse> {
        return await client.lessonById(id);
    }
);
