import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import ItemCard from '../../components/ItemCard/ItemCard';
import ComicsStore from '../../stores/ComicsStore';
import Pagination from '../../components/Pagination/Pagination';
import SearchBar from '../../components/SearchBar/SearchBar';
import classes from './Comics.module.css';

const Comics = observer(() => {
    useEffect(() => {
        ComicsStore.fetchComics(0); 
    }, []);
    const handlePageChange = (page: number) => {
        const newOffset = (page - 1) * ComicsStore.limit;
        ComicsStore.setOffset(newOffset);
    };
    return (
        <section className={classes.comics}>
            <div className={classes.container}>
                <div className={classes.title}>
                    <p>Comics ({ComicsStore.totalItems})</p>
                </div>
                <SearchBar
                    searchTerm={ComicsStore.searchTerm}
                    placeholder="Введите название комикса..."
                    onSearchTermChange={(e) => ComicsStore.setSearchTerm(e.target.value)} 
                    onSearch={() => ComicsStore.triggerSearch()}
                    buttonText="Search"
                />
                <div className={classes.comics_items}>
                    {ComicsStore.loading ? (
                        <p className={classes.loading}>Загрузка...</p>
                    ) : ComicsStore.filteredComics.length > 0 ? (
                        ComicsStore.filteredComics.map((comic) => (
                            <ItemCard key={comic.id} {...comic} type="comics" />
                        ))
                    ) : (
                        <p>Комиксы не найдены</p>
                    )}
                </div>
                <Pagination
                    offset={ComicsStore.offset}
                    limit={ComicsStore.limit}
                    totalItems={ComicsStore.totalItems}
                    onPageChange={handlePageChange}
                />
            </div>
        </section>
    );
});

export default Comics;
