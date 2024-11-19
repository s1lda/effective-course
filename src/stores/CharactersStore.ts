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

    constructor() {
        makeAutoObservable(this);
    }

    private debouncedFetchCharacters = debounce(() => {
        this.fetchCharacters();
    }, 3000);

    setSearchTerm(term: string) {
        this.searchTerm = term;
        this.pendingSearch = true; 
        this.offset = 0;
        this.debouncedFetchCharacters();
    }

    async fetchCharacters(offset: number = this.offset) {
        this.loading = true;
        this.error = null;

        try {
            const { items, totalItems } = await charactersApi.getCharactersList(
                offset,
                this.limit,
                this.searchTerm || undefined
            );

            runInAction(() => {
                this.characters = items; 
                this.totalItems = totalItems;
                this.loading = false;
                this.pendingSearch = false; 
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

    setOffset(newOffset: number) {
        if (this.offset !== newOffset) {
            this.offset = newOffset;
            this.fetchCharacters(newOffset);
        }
    }

    triggerSearch() {
        this.offset = 0;
        this.fetchCharacters();
    }

    get filteredCharacters() {
        if (this.pendingSearch) {
            return this.characters;
        }

        return this.characters.filter(character =>
            character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }

    get totalPages() {
        return Math.ceil(this.totalItems / this.limit);
    }
}

export default new CharactersStore();
