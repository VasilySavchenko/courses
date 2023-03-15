import { APIClient } from '.';
import { Course } from '@/entities/course';

/** Ethers api client */
export class CoursesApi extends APIClient {
    private readonly ROOT_PATH = 'https://api.wisey.app/api/v1';

    /** get All curses */
    public async getAllCurses(): Promise<Course[]> {
        const path = `${this.ROOT_PATH}/core/preview-courses`;
        const authToken = this.authToken;

        const response = await this.http.get({ path, authToken }
        );

        if (!response.ok) {
            await this.handleError(response);
        }

        const res = await response.json();

        return res.courses;
    }
}
