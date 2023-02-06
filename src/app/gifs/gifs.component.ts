import { JsonPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.css']
})
export class GifsComponent implements OnInit, OnDestroy {

  constructor(private dataService: DataService) { }

  search(searchTerm: string) {
    if (searchTerm !== '') {
      this.dataService.searchGifs(searchTerm);
    }
  }
  
  gifs: any[] = [];
  subscription: Subscription;


  ngOnInit(): void {
    this.dataService.getTrendingGifs();
    this.subscription = this.dataService.getGifs()
    .subscribe((responce: any) => {
      this.gifs = responce;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  gifStored: any;
  index = 0;

  saveData(url: any, title: any) {
    let newdata = {url, title, index: this.index, date: Date.now()};
    
    if (!localStorage.getItem('gifStored')) {
      localStorage.setItem('gifStored', '[]');
    }

    var old_data = JSON.parse(localStorage.getItem('gifStored')!);
    if (!old_data.some((item: any) => item.url === url)) { old_data.push(newdata);}
    
    localStorage.setItem('gifStored', JSON.stringify(old_data))
    
    this.loadData();
    this.index = this.index+1
  }

  loadData() {
    let data = localStorage.getItem('gifStored');
    this.gifStored = JSON.parse(data!);
    localStorage.setItem('gifStored', JSON.stringify(this.gifStored))
  }
}
