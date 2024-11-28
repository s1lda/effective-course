import { makeAutoObservable, runInAction } from 'mobx';
import debounce from 'debounce';
import comicsApi from '../api/comicsapi';
import IItemCard from '../interface/IItemCard';
class ComicsStore {
    comics: IItemCard[] = [];       
    loading: boolean = false;      
    error: string | null = null;    
    searchTerm: string = '';   
    offset: number = 0;
    limit: number = 20;
    totalItems: number = 0;
    pendingSearch: boolean = false;    
    hasMore:boolean=true;  

    constructor() {
        makeAutoObservable(this);     
    }
    private debouncedFetchComics = debounce(() => {
        this.fetchComics();
    }, 3000);

    setSearchTerm(term: string) {
        this.searchTerm = term;
        if (this.comics.length > 0) {
            this.pendingSearch = false; 
        } else {
            this.pendingSearch = true;
            this.debouncedFetchComics(); 
        }
    }

    async fetchComics (offset: number = this.offset) {
        if (this.loading || !this.hasMore) return;
        this.loading = true;            
        this.error = null;              

        try {
            const { items, totalItems } = await comicsApi.getComicsList(
                offset,
                this.limit,
                this.searchTerm || undefined
            );  
            runInAction(() => {
                this.comics = offset === 0 ? items : [...this.comics, ...items];; 
                this.totalItems = totalItems;
                this.pendingSearch = false; 
                this.hasMore = this.comics.length < this.totalItems;

                if (this.hasMore) {
                    this.offset = this.comics.length;
                }

                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = 'Ошибка при загрузке данных о комиксах';
                this.loading = false;
                this.pendingSearch = false;
            });
            console.error('Ошибка при загрузке данных о комиксах:', error);
        }
    };
    triggerSearch() {
        this.offset=0;
        this.fetchComics();
    }
    get filteredComics() {
        if (this.searchTerm) {
            return this.comics.filter((comic) =>
                comic.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }
        return this.comics;
    }
}

export default new ComicsStore();
