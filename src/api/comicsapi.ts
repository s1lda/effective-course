import instance from './helpers/axios';
import IItemCard from '../interface/IItemCard';

export default {
  async getComicsList(offset = 0, limit = 20, titleStartsWith?: string): Promise<{ items: IItemCard[], totalItems: number }> {
    const params: any = { offset, limit };
    
    if (titleStartsWith) {
      params.titleStartsWith = titleStartsWith;
    }
    const response = await instance.get('v1/public/comics',{params});
    const comics = response.data.data.results.map((comic: any) => ({
      id: comic.id,
      name: comic.title,
      description: comic.description || 'Описание отсутствует',
      image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
    }));
    return {
      items:comics,
      totalItems:response.data.data.total,
    };
  },
};
