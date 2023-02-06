import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
//import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  gifs = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) { }
  readonly gifyApiKey = 'CwsPWZ4SCkLnvqABiiD76CKWeuI5fYYF'
  getTrendingGifs() {
    return this.http.get(`https://api.giphy.com/v1/gifs/trending?api_key=${this.gifyApiKey}&limit=10&rating=g`)
    .subscribe((response: any) => {
      this.gifs.next(response.data);
    });
  }

  searchGifs(gifName: string) {
    return this.http.get(`https://api.giphy.com/v1/gifs/search?q=${gifName}&api_key=${this.gifyApiKey}&limit=10&rating=g`)
    .subscribe((response: any) => {
      this.gifs.next(response.data);
    });
  }

  searchGifsstored(gifName: string) {
    let data = localStorage.getItem('gifStored');
    return this.http.get(`https://api.giphy.com/v1/gifs/search?q=${gifName}&api_key=${this.gifyApiKey}&limit=10&rating=g`)
    .subscribe((response: any) => {
      this.gifs.next(response.data);
    });
  }

  getGifs() {
    return this.gifs.asObservable();
  }

}
