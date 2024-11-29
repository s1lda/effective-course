import instance from './helpers/axios';
import ICharacters from '../interface/ICharacter';

export const fetchCharacterById = async (id: string): Promise<ICharacters> => {
  const response = await instance.get(`v1/public/characters/${id}`);
  const data = response.data.data.results[0];

  const characterData: ICharacters = {
    id: data.id,
    name: data.name,
    description: data.description || 'Описание отсутствует',
    image: `${data.thumbnail.path}.${data.thumbnail.extension}`,
    comics: data.comics.items.map((comic: { name: string, resourceURI: string }) => ({
      id: comic.resourceURI.split('/').pop()!,
      title: comic.name || 'Название не найдено',
    })),
  };

  return characterData;
};
