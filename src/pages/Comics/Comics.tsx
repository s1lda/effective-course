import { useEffect,useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { VirtuosoGrid } from 'react-virtuoso';
import ItemCard from '../../components/ItemCard/ItemCard';
import ComicsStore from '../../stores/ComicsStore';
import SearchBar from '../../components/SearchBar/SearchBar';
import classes from './Comics.module.css';

const Comics = observer(() => {
    useEffect(() => {
        ComicsStore.fetchComics(0); 
    }, []);
    const loadMore = useCallback(() => {
        if (!ComicsStore.loading && ComicsStore.comics.length < ComicsStore.totalItems) {
            const newOffset = ComicsStore.comics.length;
            ComicsStore.fetchComics(newOffset);
        }
    }, []);

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
               
               <VirtuosoGrid
                    data={ComicsStore.filteredComics}  
                    itemContent={(_, comic) => (
                        <ItemCard key={comic.id} {...comic} type="comics" />
                    )}
                    style={{
                        height: "100vh",  
                        width:"100%",
                    }}
                    endReached={loadMore}
                    increaseViewportBy={200}
                    listClassName={classes.comics_items}
                    components={{
                        Footer: observer(() => {
                            return ComicsStore.loading ? <p className={classes.loading}>Загрузка...</p> : null;
                        }),
                    }}
                />
            </div>
        </section>
    );
});

export default Comics;
