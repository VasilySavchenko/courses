export class Course {
    constructor(
        public containsLockedLessons: boolean = false,
        public description: string = '',
        public duration: number = 0,
        public id: string = '',
        public launchDate: string = '',
        public lessonsCount: number = 0,
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
        public rating: number = 0,
        public status: string = '',
        public tags: string[] = [],
        public title: string = '',
    ) {}
}
