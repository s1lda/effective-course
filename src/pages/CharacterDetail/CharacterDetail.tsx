import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import characterIdStore from '../../stores/CharacterIdStore';
import classes from './CharacterDetail.module.css';

const CharacterDetail = observer(() => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      characterIdStore.fetchCharacter(id);
    }
  }, [id]);

  const { character, loading, error } = characterIdStore;

  if (loading) return <div className={classes.loading}>Загрузка...</div>;
  if (error) return <div>{error}</div>;
  if (!character) return <div>Персонаж не найден</div>;

  return (
    <div className={classes.characterDetail}>
      <h1 className={classes.characterName}>{character.name}</h1>
      <div className={classes.imageWrapper}>
        <img className={classes.characterImage} src={character.image} alt={character.name} />
      </div>
      <p className={classes.characterDescription}>{character.description}</p>
      <h2 className={classes.comicListName}>Комиксы</h2>
      <ul className={classes.comicList}>
        {character.comics.map((comic) => (
          <li key={comic.id}>
            <Link to={`/comics/${comic.id}`}>{comic.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default CharacterDetail;
