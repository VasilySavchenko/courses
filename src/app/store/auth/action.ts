import { createAsyncThunk } from '@reduxjs/toolkit';

import { AuthApi, AuthResponse } from '@/api/auth';

const client = new AuthApi();

export const getToken = createAsyncThunk(
    'auth/token',
    async function(): Promise<AuthResponse> {
        const response = await client.getToken();

        window.localStorage.setItem('AUTH_TOKEN', response.token);

        return response;
    }
);
