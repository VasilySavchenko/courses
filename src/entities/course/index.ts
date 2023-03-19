import appConfig from '@/app/configs/appConfig.json';
export class Course {
    constructor(
        public containsLockedLessons: boolean = false,
        public description: string = '',
        public duration: number = appConfig.DEFAULT_ID,
        public id: string = '',
        public launchDate: string = '',
        public lessonsCount: number = appConfig.DEFAULT_ID,
        public meta: {
            slug: string;
            skills: string[];
            courseVideoPreview: {
                link: string;
                duration: number;
                previewImageLink: string;
            };
        },
        public previewImageLink: string = '',
        public rating: number = appConfig.DEFAULT_ID,
        public status: string = '',
        public tags: string[] = [],
        public title: string = '',
    ) {}
}

export class Lesson {
    constructor(
        public id: string = '',
        public title: string = '',
        public duration: number = appConfig.DEFAULT_ID,
        public order: number = appConfig.DEFAULT_ID,
        public type: string = '',
        public status: string = '',
        public link: string = '',
        public previewImageLink: string = '',
        public meta: null = null
    ) {}
}

export class SingleCourse {
    constructor(
        public containsLockedLessons: boolean = false,
        public description: string = '',
        public duration: number = appConfig.DEFAULT_ID,
        public id: string = '',
        public launchDate: string = '',
        public lessonsCount: number = appConfig.DEFAULT_ID,
        public meta: {
            slug: string;
            skills: string[];
            courseVideoPreview: {
                link: string;
                duration: number;
                previewImageLink: string;
            };
        },
        public lessons: Lesson[] = [],
        public previewImageLink: string = '',
        public rating: number = appConfig.DEFAULT_ID,
        public status: string = '',
        public tags: string[] = [],
        public title: string = '',
    ) {}
}
