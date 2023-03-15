import { createSlice } from '@reduxjs/toolkit';
import { getToken } from '@/app/store/auth/action';

export class AuthState {
    /** class implementation */
    constructor(
        public token: string
    ) { }
}

const initialState: AuthState = {
    token: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getToken.fulfilled, (state, action) => {
            state.token = action.payload.token;
        });
    },
});

export default authSlice.reducer;
