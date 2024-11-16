import instance from './helpers/axios';
import IComics from '../interface/IComics';
export const fetchComicById = async (id: string): Promise<IComics> => {
  const response = await instance.get(`v1/public/comics/${id}`);
  const data = response.data.data.results[0];

  const comicData: IComics = {
    id: data.id,
    name: data.title,
    description: data.description || 'Описание отсутствует',
    image: `${data.thumbnail.path}.${data.thumbnail.extension}`,
    characters: data.characters.items.map((character: { name: string, resourceURI: string }) => ({
      id: character.resourceURI.split('/').pop()!,
      name: character.name || 'Название не найдено',
    })),
  };

  return comicData;
};
