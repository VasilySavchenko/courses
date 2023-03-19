import React, { useEffect, useState } from 'react';
import Hls from 'hls.js';
import { Lesson } from '@/entities/course';
import { useAppSelector } from '@/app/store';

import './index.scss';

const LessonItem:React.FC = () => {
    const selectedCourse = useAppSelector((state) => state.lessonSlice.lesson);

    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

    const activeClass = (id: string) => selectedLesson?.id === id ? 'active' : '';

    const handleLessonSelect = (lesson: Lesson) => {
        setSelectedLesson(lesson);
    };
    useEffect(() => {
        let hls: Hls | null = null;
        if (Hls.isSupported() && selectedLesson) {
            const video = document.getElementById(selectedLesson.id) as HTMLVideoElement;
            hls = new Hls();
            hls.loadSource(`${selectedLesson?.link}`);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                video?.play();
            });

            hls.attachMedia(video);
        }

        return () => {
            hls?.destroy();
        };
    }, [selectedLesson?.id, selectedLesson?.link]);

    return <div className="lesson-player">
        <h2>Select a lesson:</h2>
        <ul>
            {selectedCourse?.lessons?.map((lesson) =>
                <li key={lesson.id}>
                    <button
                        onClick={() => handleLessonSelect(lesson)}
                        className={`${activeClass(lesson.id)}`}
                        disabled={lesson.status === 'locked'}>
                        {lesson.title}
                    </button>
                </li>
            )}
        </ul>
        {selectedLesson &&
          <div key={selectedLesson.id}>
              <video
                  style={{ width: '100%' }}
                  id={selectedLesson?.id}
                  controls
                  muted
                  poster={`${selectedLesson.previewImageLink}/cover.webp`}
                  src={`${selectedLesson.link}`}
              />
          </div>
        }
    </div>;
};

export default LessonItem;
