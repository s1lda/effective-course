interface PaginationProps {
    offset: number;
    limit: number;
    totalItems: number;
    onPageChange: (page: number) => void;
}
export default PaginationProps;