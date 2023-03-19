import { createSlice } from '@reduxjs/toolkit';
import { lessonById } from '@/app/store/lesson/action';
import { SingleCourse } from '@/entities/course';

export class CoursesState {
    /** class implementation */
    constructor(
        public lesson: SingleCourse,
        public loading: boolean
    ) { }
}

const initialState: CoursesState = {
    lesson: {} as SingleCourse,
    loading: false,
};

const lessonSlice = createSlice({
    name: 'lesson',
    initialState: initialState,
    reducers: {
        resetLesson: (state) => {
            state.lesson = {} as SingleCourse;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(lessonById.pending, (state,) => {
            state.loading = true;
        });
        builder.addCase(lessonById.fulfilled, (state, action) => {
            state.loading = false;
            state.lesson = action.payload;
        });
    },
});

export const { resetLesson } = lessonSlice.actions;

export default lessonSlice.reducer;
