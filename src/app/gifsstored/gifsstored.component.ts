import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-gifsstored',
  templateUrl: './gifsstored.component.html',
  styleUrls: ['./gifsstored.component.css']
})
export class GifsstoredComponent {

  constructor(private dataService: DataService) { }

  term: string;

  data = localStorage.getItem('gifStored');
  filterData = JSON.parse(this.data!);

   search(searchTerm: string) {
    if (searchTerm !== '') {
      this.dataService.searchGifsstored(searchTerm);
    }
  }

  gifStored: any;

  loadData() {
    let data = localStorage.getItem('gifStored');
    this.gifStored = JSON.parse(data!);
    localStorage.setItem('gifStored', JSON.stringify(this.gifStored))
  }

  deleteData(url: any) {
    
    let temp = this.gifStored.filter((item: any) => item.url != url);
    localStorage.setItem('gifStored', JSON.stringify(temp))
  }

  sortAsc() {
    const sortedAsc = this.gifStored.sort(
      (objA:any, objB:any) => Number(objA.date) - Number(objB.date),
    );
    localStorage.setItem('gifStored', JSON.stringify(sortedAsc));
  }

  sortDsc() {
    const sortedDsc = this.gifStored.sort(
      (objA:any, objB:any) => Number(objB.date) - Number(objA.date),
    );
    localStorage.setItem('gifStored', JSON.stringify(sortedDsc));
  }

  async download(link: any) {
    //create new a element
    let a = document.createElement('a');
    // get image as blob
    let response = await fetch(link);
    let file = await response.blob();
    // use download attribute https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Attributes
    a.download = 'myGif';
    a.href = window.URL.createObjectURL(file);
    //store download url in javascript https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes#JavaScript_access
    //a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    //click on element to start download
    a.click();
  };


  public dragIconId: number;
  public dropTileId: number;

  public onIconDropped(ev: any) {
      ev.drag.dropFinished();
  }

  public onEnterHandler(ev: any): void {
      this.dropTileId = parseInt(ev.owner.element.nativeElement.id, 10);
      // the event gets raised immediately, but we want to swap only when we drag over another icon
      if (this.dragIconId === this.dropTileId) {
          return;
      }
      const dragIndex = this.filterData.findIndex((filterData: any) => filterData.index === this.dragIconId);
      const dropIndex = this.filterData.findIndex((filterData: any) => filterData.index === this.dropTileId);
      this.swapIcons(dragIndex, dropIndex);
  }

  public dragStartHandler(index: number): void {
      this.dragIconId = index;
  }

  public dragEndHandler(dragRef: HTMLElement) {
      dragRef.style.visibility = 'visible';
  }

  public ghostCreateHandler(dragRef: HTMLElement) {
      dragRef.style.visibility = 'hidden';
  }

  private swapIcons(dragIndex: number, dropIndex: number) {
      const tempObj = this.gifStored[dragIndex];
      this.gifStored.splice(dragIndex, 1);
      this.gifStored.splice(dropIndex, 0, tempObj);
  }
}
