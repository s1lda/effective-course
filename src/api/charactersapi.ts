import instance from './helpers/axios';
import IItemCard from '../interface/IItemCard';

export default {
  async getCharactersList(offset = 0, limit = 20, nameStartsWith?: string): Promise<{ items: IItemCard[], totalItems: number }> {
    const params: any = { offset, limit };
    
    if (nameStartsWith) {
      params.nameStartsWith = nameStartsWith;
    }

    const response = await instance.get('v1/public/characters', { params });

    const characters = response.data.data.results.map((character: any) => ({
      id: character.id,
      name: character.name,
      description: character.description || 'Описание отсутствует',
      image: `${character.thumbnail.path}.${character.thumbnail.extension}`,
    }));

    return {
      items: characters,
      totalItems: response.data.data.total,
    };
  },
};

