import classes from './Comics.module.css';
import comicsData from '../../constans/ComicsData';
import ItemCard from '../../components/ItemCard/ItemCard';
function Comics() {
    return (
        <section className={classes.characters}>
            <div className={classes.container}>
                <div className={classes.title}>
                    <p>Comics ({comicsData.length})</p>
                </div>
                <div className={classes.search_container}>
                    <input
                        type="text"
                        placeholder="Введите название комикса..."
                        className={classes.search_input}
                    />
                    <button className={classes.search_button}>Поиск</button>
                </div>
                <div className={classes.characters_items}>
                    {comicsData.map((comic, index) => (
                        <ItemCard key={index} {...comic} type='comics' />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Comics;
