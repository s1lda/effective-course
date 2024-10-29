import { useParams, Link } from 'react-router-dom';
import charactersData from '../../constans/CharactersData'; 
import comicsData from '../../constans/ComicsData'; 
import classes from './ComicDetail.module.css'; 

const ComicDetail = () => {
    const { id } = useParams<{ id: string }>();
    const comic = comicsData.find(ch => ch.id === id);

    if (!comic) {
        return <div>Comic not found</div>;
    }

    return (
        <div className={classes.comicDetail}>
            <h1 className={classes.comicName}>{comic.name}</h1>
            <div className={classes.imageWrapper}>
                <img className={classes.comicImage} src={comic.image} alt={comic.name} />
            </div>
            <p className={classes.comicDescription}>{comic.description}</p>
            <h2 className={classes.characterListName}>Персонажи</h2>
            <ul className={classes.characterList}>
                {comic.characters.map(characterId => {
                    const character = charactersData.find(c => c.id === characterId);
                    return (
                        character && (
                            <li key={characterId}>
                                <Link to={`/characters/${character.id}`}>{character.name}</Link>
                            </li>
                        )
                    );
                })}
            </ul>
        </div>
    );
};

export default ComicDetail;