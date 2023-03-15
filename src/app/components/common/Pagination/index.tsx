import React, { useMemo } from 'react';
import { PageButton } from './BlockPages';
import PaginationArrow from '@/static/images/arrow/icons/PaginationArrow';

import appConfig from '@/app/configs/appConfig.json';

import './style.scss';

export const DOTS = '...';

export const Pagination: React.FC<{
    itemsPerPage: number;
    currentPage: number;
    itemsTotal: number;
    onChange: (pageNumber: number) => void;
}> = ({ itemsPerPage, currentPage, itemsTotal, onChange }) => {
    const FIRST_PAGE_INDEX = 1;
    const STEP_FROM_CURRENT_PAGE = 1;

    const generateRange = (length: number) => Array.from({ length }, (_, index) => ++index);

    /** Counts pages number. */
    const pagesCount = useMemo(
        () => Math.ceil(itemsTotal / itemsPerPage),
        [itemsTotal, itemsPerPage]
    );
    const handlePageChange = (pageNumber: number) => () => onChange(Number(pageNumber));

    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(itemsTotal / itemsPerPage);
        const totalPageNumbers = 6;
        const showLeftDots = currentPage >= appConfig.THIRD_INDEX;
        const showRightDots = totalPageCount - currentPage > appConfig.SECOND_INDEX;

        if (totalPageNumbers >= totalPageCount) {
            return generateRange(totalPageCount);
        }

        if (showLeftDots && showRightDots) {
            return [FIRST_PAGE_INDEX, DOTS, currentPage - STEP_FROM_CURRENT_PAGE, currentPage, currentPage + STEP_FROM_CURRENT_PAGE, DOTS, totalPageCount];
        }

        if (!showLeftDots && showRightDots) {
            const pages: Array<string | number> = generateRange(appConfig.FOURTH_INDEX);

            return pages.concat([DOTS, totalPageCount]);
        }

        return [FIRST_PAGE_INDEX, DOTS, totalPageCount - appConfig.THIRD_INDEX, totalPageCount - appConfig.SECOND_INDEX, totalPageCount - STEP_FROM_CURRENT_PAGE, totalPageCount];
    }, [itemsTotal, itemsPerPage, currentPage]);

    /**
     * indicates if current page is first page or last page
     */
    const isFirstPageSelected: boolean = currentPage === FIRST_PAGE_INDEX;
    const isLastPageSelected: boolean = currentPage === pagesCount;
    const previousPageNumber = Math.min(
        currentPage - STEP_FROM_CURRENT_PAGE,
        pagesCount
    );
    const nextPageNumber = Math.min(
        currentPage + STEP_FROM_CURRENT_PAGE,
        pagesCount
    );

    return (
        <div className="pagination-container">
            {itemsTotal > itemsPerPage &&
                <>
                    <button
                        onClick={handlePageChange(previousPageNumber)}
                        className="pagination-btn"
                        disabled={isFirstPageSelected}
                    >
                        <PaginationArrow />
                    </button>
                    <div className="pagination-wrapper">
                        {paginationRange?.map((page) => {
                            if (page === DOTS) {
                                return <li className="pagination__pages__item">&#8230;</li>;
                            }

                            return <PageButton
                                key={page}
                                onClick={handlePageChange(Number(page))}
                                pageNumber={page}
                                isActive={currentPage === page}
                            />;
                        }
                        )}
                    </div>
                    <button
                        onClick={handlePageChange(nextPageNumber)}
                        className="pagination-btn"
                        disabled={isLastPageSelected}
                    >
                        <PaginationArrow />
                    </button>
                </>
            }
        </div>
    );
};
