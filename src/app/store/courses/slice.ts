import { createSlice } from '@reduxjs/toolkit';
import { getAllCourses } from '@/app/store/courses/action';
import { Course } from '@/entities/course';

export class CoursesState {
    /** class implementation */
    constructor(
        public courses: Course[]
    ) { }
}

const initialState: CoursesState = {
    courses: [],
};

const coursesSlice = createSlice({
    name: 'courses',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            state.courses = action.payload;
        });
    },
});

export default coursesSlice.reducer;
