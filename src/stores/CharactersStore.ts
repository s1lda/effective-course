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
        this.triggerSearch();
    }, 3000);

    setSearchTerm(term: string) {
        this.searchTerm = term;
        this.pendingSearch = true;
        this.offset = 0;
        this.debouncedFetchCharacters(); 
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
                this.characters = items;
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
        this.offset=0;
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
}

export default new CharactersStore();
