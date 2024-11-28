import { makeAutoObservable, runInAction } from 'mobx';
import debounce from 'debounce';
import charactersApi from '../api/charactersapi';
import IItemCard from '../interface/IItemCard';

class CharactersStore {
    characters: IItemCard[] = [];
    loading: boolean = false;
    error: string | null = null;
    searchTerm: string = '';
    offset: number = 0;
    limit: number = 20;
    totalItems: number = 0;
    pendingSearch: boolean = false;
    hasMore: boolean = true;

    constructor() {
        makeAutoObservable(this);
    }

    private debouncedFetchCharacters = debounce(() => {
        this.fetchCharacters(); 
    }, 3000);

    setSearchTerm(term: string) {
        this.searchTerm = term;

        if (this.characters.length > 0) {
            this.pendingSearch = false; 
        } else {
            this.pendingSearch = true;
            this.debouncedFetchCharacters(); 
        }
    }

    async fetchCharacters(offset: number = this.offset) {
        if (this.loading || !this.hasMore) return;
        this.loading = true;
        this.error = null;

        try {
            const { items, totalItems } = await charactersApi.getCharactersList(
                offset,
                this.limit,
                this.searchTerm || undefined
            );

            runInAction(() => {
                this.characters = offset === 0 ? items : [...this.characters, ...items];
                this.totalItems = totalItems;
                this.pendingSearch = false;

                this.hasMore = this.characters.length < this.totalItems;

                if (this.hasMore) {
                    this.offset = this.characters.length;
                }

                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = 'Ошибка при загрузке данных о персонажах';
                this.loading = false;
                this.pendingSearch = false;
            });
            console.error('Ошибка при загрузке данных о персонажах:', error);
        }
    }

    triggerSearch() {
        this.offset = 0;
        this.fetchCharacters();
    }

    get filteredCharacters() {
        if (this.searchTerm) {
            return this.characters.filter((character) =>
                character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }
        return this.characters;
    }
}

export default new CharactersStore();
