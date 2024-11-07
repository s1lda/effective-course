import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import classes from './Comics.module.css';
import ItemCard from '../../components/ItemCard/ItemCard';
import ComicsStore from '../../stores/ComicsStore';
import Pagination from '../../components/Pagination/Pagination';
const Comics = observer(() => {
    useEffect(() => {
        ComicsStore.fetchComics(0); 
    }, []);
    const handlePageChange = (page: number) => {
        const newOffset = (page - 1) * ComicsStore.limit;
        ComicsStore.setOffset(newOffset);
    };
    return (
        <section className={classes.characters}>
            <div className={classes.container}>
                <div className={classes.title}>
                    <p>Comics ({ComicsStore.totalItems})</p>
                </div>
                <div className={classes.search_container}>
                    <input
                        type="text"
                        placeholder="Введите название комикса..."
                        className={classes.search_input}
                        value={ComicsStore.searchTerm}
                        onChange={(e) => ComicsStore.setSearchTerm(e.target.value)} 
                    />
                    <button  className={classes.search_button} onClick={() => ComicsStore.triggerSearch()}>Search</button>
                </div>
                <div className={classes.characters_items}>
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
