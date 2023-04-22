import axios from "axios";

export class SearchImageAPI {
    static API_KEY = '34194701-2813288863e2fdf221136bb42';
    static BASE_URL = 'https://pixabay.com/api/';

    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchImages() {
        const searchParams = new URLSearchParams({
          key: SearchImageAPI.API_KEY,
          q: this.searchQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: 12,
          page: this.page,
        });
    
        const searchURL = `${SearchImageAPI.BASE_URL}?${searchParams}`;
    
        try {

            if (this.searchQuery.trim() === '') {
              console.log('Please, enter your search query!');
            //   return Promise.reject('Invalid query!');
              return
            }
        
            const {data} = await axios.get(searchURL, {
              validateStatus: status => status !== 404,
            })

            return data;
        } catch (e) {console.log(e)};
    }

    // Збільшуємо значення сторінки для наступного пошукового запиту:
    incrementPage() {
        this.page += 1;
    }

    // Скидуємо значення сторінки до дефолтного при кожному новому сабміті пошукової форми:
    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}



