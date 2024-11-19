import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import comicIdStore from '../../stores/ComicIdStore';
import classes from './ComicDetail.module.css';

const ComicDetail = observer(() => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      comicIdStore.fetchComic(id);
    }
  }, [id]);

  const { comic, loading, error } = comicIdStore;

  if (loading) return <div className={classes.loading}>Загрузка...</div>;
  if (error) return <div>{error}</div>;
  if (!comic) return <div>Комикс не найден</div>;

  return (
    <div className={classes.comicDetail}>
      <h1 className={classes.comicName}>{comic.name}</h1>
      <div className={classes.imageWrapper}>
        <img className={classes.comicImage} src={comic.image} alt={comic.name} />
      </div>
      <p className={classes.comicDescription}>{comic.description}</p>
      <h2 className={classes.characterListName}>Персонажи</h2>
      <ul className={classes.characterList}>
        {comic.characters.map((character) => (
          <li key={character.id}>
            <Link to={`/characters/${character.id}`}>{character.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default ComicDetail;
