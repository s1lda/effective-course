import { observer } from 'mobx-react-lite';
import { useEffect, useCallback } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import ItemCard from '../../components/ItemCard/ItemCard';
import CharactersStore from '../../stores/CharactersStore';
import SearchBar from '../../components/SearchBar/SearchBar';
import classes from './Characters.module.css';

const Characters = observer(() => {
    useEffect(() => {
        CharactersStore.fetchCharacters(0); 
    }, []);

    const loadMore = useCallback(() => {
        if (!CharactersStore.loading && CharactersStore.characters.length < CharactersStore.totalItems) {
            const newOffset = CharactersStore.characters.length;
            CharactersStore.fetchCharacters(newOffset);
        }
    }, []);

    return (
        <section className={classes.characters}>
            <div className={classes.container}>
                <div className={classes.title}>
                    <p>Characters ({CharactersStore.totalItems})</p>
                </div>
                <SearchBar
                    searchTerm={CharactersStore.searchTerm}
                    placeholder="Введите имя персонажа..."
                    onSearchTermChange={(e) => CharactersStore.setSearchTerm(e.target.value)} 
                    onSearch={() => CharactersStore.triggerSearch()} 
                    buttonText="Search"
                />

                <VirtuosoGrid
                    data={CharactersStore.filteredCharacters}  
                    itemContent={(_, character) => (
                        <ItemCard key={character.id} {...character} type="characters" />
                    )}
                    style={{
                        height: "100vh",  
                        width:"100%",
                    }}
                    endReached={loadMore}
                    increaseViewportBy={200}
                    listClassName={classes.characters_items}
                    components={{
                        Footer: observer(() => {
                            return CharactersStore.loading ? <p className={classes.loading}>Загрузка...</p> : null;
                        }),
                    }}
                />

            </div>
        </section>
    );
});

export default Characters;
