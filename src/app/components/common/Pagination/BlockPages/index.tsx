import React from 'react';

export const PageButton: React.FC<{
    pageNumber: number | string;
    onClick: (n: number) => void;
    isActive: boolean;
}> = ({ pageNumber, isActive, onClick }) => {
    const changePage = () => onClick(Number(pageNumber));

    const className = `pagination__pages__item ${
        isActive ? 'pagination__pages__item--active' : ''
    }`;

    return (
        <button className={className} onClick={changePage}>
            {pageNumber}
        </button>
    );
};
