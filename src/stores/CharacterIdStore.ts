import { makeAutoObservable, runInAction } from 'mobx';
import { fetchCharacterById } from '../api/characteridapi';
import ICharacters from '../interface/ICharacter';
class CharacterIdStore {
  character: ICharacters | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchCharacter(id: string) {
    this.loading = true;
    this.error = null;

    try {
      const characterData = await fetchCharacterById(id);
      
      runInAction(() => {
        this.character = characterData;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Ошибка при загрузке данных о персонаже';
      });
      console.error('Ошибка:', error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

const characterIdStore = new CharacterIdStore();
export default characterIdStore;
