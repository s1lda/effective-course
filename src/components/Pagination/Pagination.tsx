import React from 'react';
import PaginationProps from '../../interface/PaginationProps';
import classes from './Pagination.module.css';
const Pagination: React.FC<PaginationProps> = ({ offset, limit, totalItems, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = Math.floor(offset / limit) + 1;

    const getVisiblePages = () => {
        const startPage = Math.floor((currentPage - 1) / 7) * 7 + 1;
        const endPage = Math.min(startPage + 6, totalPages);
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    const handlePrevGroup = () => {
        const prevGroupStart = Math.max(1, Math.floor((currentPage - 1) / 7) * 7 - 6);
        onPageChange(prevGroupStart);
    };

    const handleNextGroup = () => {
        const nextGroupStart = Math.floor((currentPage - 1) / 7) * 7 + 8;
        if (nextGroupStart <= totalPages) {
            onPageChange(nextGroupStart);
        }
    };

    const goToStart = () => {
        onPageChange(1);
    };

    const goToEnd = () => {
        onPageChange(totalPages);
    };

    return (
        <div className={classes.pagination}>
            <button onClick={goToStart} disabled={offset === 0}>В начало</button>
            <button onClick={handlePrevGroup} disabled={currentPage <= 1}>Назад</button>
            {getVisiblePages().map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    disabled={offset / limit === page - 1}
                    className={offset / limit === page - 1 ? 'active' : ''}
                >
                    {page}
                </button>
            ))}
            <button onClick={handleNextGroup} disabled={currentPage >= totalPages - 7}>
                Далее
            </button>
            <button onClick={goToEnd} disabled={offset === (totalPages - 1) * limit}>В конец</button>
        </div>
    );
};

export default Pagination;
