import { APIClient } from '.';
import { SingleCourse } from '@/entities/course';

/** Lesson api client */
export class LessonApi extends APIClient {
    private readonly ROOT_PATH = 'https://api.wisey.app/api/v1';

    /** get lesson by id */
    public async lessonById(id: string): Promise<SingleCourse> {
        const path = `${this.ROOT_PATH}/core/preview-courses/${id}`;
        const authToken = this.authToken;

        const response = await this.http.get({ path, authToken }
        );

        if (!response.ok) {
            await this.handleError(response);
        }

        return await response.json();
    }
}
