/// <reference types="react-scripts" />

declare module '*.png' {
    const value: any;
    export default value;
}

declare module 'react-step-progress-bar' {
    import React from 'react';

    interface ProgressBarProps {
        percent: number;
        stepPositions?: number[];
        unfilledBackground?: string;
        filledBackground?: string;
        width?: number;
        height?: number;
        hasStepZero?: boolean;
        text?: string;
    };
    interface StepProps {
        children: (props: {
            accomplished: boolean;
            transitionState: string;
            index: number;
            position: number;
        }) => React.ReactNode;
        transition?: 'scale' | 'rotate' | 'skew';
        transitionDuration?: number;
    };

    /** Class typisation for library for ProgressBar component */
    class ProgressBar extends React.Component<ProgressBarProps, any> {}
    /** Class typisation for library for Step component */
    class Step extends React.Component<StepProps, any> {}
}
