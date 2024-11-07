import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import classes from './Characters.module.css';
import ItemCard from '../../components/ItemCard/ItemCard';
import CharactersStore from '../../stores/CharactersStore';
import Pagination from '../../components/Pagination/Pagination';
const Characters = observer(() => {
    useEffect(() => {
        CharactersStore.fetchCharacters(0);
    }, []);

    const handlePageChange = (page: number) => {
        const newOffset = (page - 1) * CharactersStore.limit;
        CharactersStore.setOffset(newOffset);
    };

    return (
        <section className={classes.characters}>
            <div className={classes.container}>
                <div className={classes.title}>
                    <p>Characters ({CharactersStore.totalItems})</p>
                </div>
                <div className={classes.search_container}>
                    <input
                        type="text"
                        placeholder="Введите имя персонажа..."
                        className={classes.search_input}
                        value={CharactersStore.searchTerm}
                        onChange={(e) => CharactersStore.setSearchTerm(e.target.value)}
                    />
                    <button className={classes.search_button} onClick={() => CharactersStore.triggerSearch()}>Search</button>
                </div>

                <div className={classes.characters_items}>
                    {CharactersStore.loading ? (
                        <p className={classes.loading}>Загрузка...</p>
                    ) : CharactersStore.filteredCharacters.length > 0 ? (
                        CharactersStore.filteredCharacters.map((character) => (
                            <ItemCard key={character.id} {...character} type="characters" />
                        ))
                    ) : (
                        <p>Персонажи не найдены</p>
                    )}
                </div>
                <Pagination
                    offset={CharactersStore.offset}
                    limit={CharactersStore.limit}
                    totalItems={CharactersStore.totalItems}
                    onPageChange={handlePageChange}
                />
            </div>
        </section>
    );
});

export default Characters;
