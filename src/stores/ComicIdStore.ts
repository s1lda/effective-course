import { makeAutoObservable, runInAction } from 'mobx';
import { fetchComicById } from '../api/comicIdapi';
import IComics from '../interface/IComics';
class ComicIdStore {
  comic: IComics | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchComic(id: string) {
    this.loading = true;
    this.error = null;

    try {
      const comicData = await fetchComicById(id);

      runInAction(() => {
        this.comic = comicData;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Ошибка при загрузке данных о комиксе';
      });
      console.error('Ошибка:', error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

const comicIdStore = new ComicIdStore();
export default comicIdStore;
