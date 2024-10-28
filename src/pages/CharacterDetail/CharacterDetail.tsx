import { useParams, Link } from 'react-router-dom';
import charactersData from '../../constans/CharactersData'; 
import comicsData from '../../constans/ComicsData'; 
import classes from './CharacterDetail.module.css'; 

const CharacterDetail = () => {
    const { id } = useParams<{ id: string }>();
    const character = charactersData.find(ch => ch.id === id);

    if (!character) {
        return <div>Character not found</div>;
    }

    return (
        <div className={classes.characterDetail}>
            <h1 className={classes.characterName}>{character.name}</h1>
            <img className={classes.characterImage} src={character.image} alt={character.name} />
            <p className={classes.characterDescription}>{character.description}</p>
            <h2>Комиксы</h2>
            <ul className={classes.comicList}>
                {character.comics.map(comicId => {
                    const comic = comicsData.find(c => c.id === comicId);
                    return (
                        comic && (
                            <li key={comicId}>
                                <Link to={`/comics/${comic.id}`}>{comic.name}</Link>
                            </li>
                        )
                    );
                })}
            </ul>
        </div>
    );
};

export default CharacterDetail;
