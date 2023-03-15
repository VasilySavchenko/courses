import { APIClient } from '.';

export type AuthResponse = {
    token: string;
};

/** Ethers api client */
export class AuthApi extends APIClient {
    private readonly ROOT_PATH = 'https://api.wisey.app/api/v1';

    /** get auth token */
    public async getToken(): Promise<AuthResponse> {
        const path = `${this.ROOT_PATH}/auth/anonymous?platform=subscriptions`;

        const response = await this.http.get({
            path,
        }
        );

        if (!response.ok) {
            await this.handleError(response);
        }

        return await response.json();
    }
}
