import { makeAutoObservable, runInAction } from 'mobx';
import comicsApi from '../api/comicsapi';
import IItemCard from '../interface/IItemCard';
import debounce from 'debounce';
class ComicsStore {
    comics: IItemCard[] = [];       
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
    private debouncedFetchComics = debounce(() => {
        this.fetchComics();
    }, 3000);

    setSearchTerm(term: string) {
        this.searchTerm = term;
        this.pendingSearch = true; 
        this.offset=0;
        this.debouncedFetchComics();
    }

    async fetchComics (offset: number = this.offset) {
        this.loading = true;            
        this.error = null;              

        try {
            const { items, totalItems } = await comicsApi.getComicsList(
                offset,
                this.limit,
                this.searchTerm || undefined
            );  
            runInAction(() => {
                this.comics = items; 
                this.totalItems = totalItems;
                this.loading = false;  
                this.pendingSearch = false; 
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
    setOffset(newOffset: number) {
        if (this.offset !== newOffset) {
            this.offset = newOffset;
            this.fetchComics(newOffset);
        }
    }
    triggerSearch() {
        this.offset=0;
        this.fetchComics();
    }
    get filteredComics() {
        if (this.pendingSearch){
            return this.comics;
        }
        return this.comics.filter(comic =>
            comic.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }
    get totalPages(){
        return Math.ceil(this.totalItems/this.limit)
    }
}

export default new ComicsStore();
