import classes from './Characters.module.css';
import charactersData from '../../constans/CharactersData';
import ItemCard from '../../components/ItemCard/ItemCard';
function Characters() {
    return (
        <section className={classes.characters}>
            <div className={classes.container}>
                <div className={classes.title}>
                    <p>Characters ({charactersData.length})</p>
                </div>
                <div className={classes.search_container}>
                    <input
                        type="text"
                        placeholder="Введите имя персонажа..."
                        className={classes.search_input}
                    />
                    <button className={classes.search_button}>Поиск</button>
                </div>
                <div className={classes.characters_items}>
                    {charactersData.map((character, index) => (
                        <ItemCard key={index} {...character} type='characters' />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Characters;
