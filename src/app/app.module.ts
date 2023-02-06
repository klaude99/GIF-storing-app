import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GifsComponent } from './gifs/gifs.component';
import { GifsstoredComponent } from './gifsstored/gifsstored.component';

import { Ng2SearchPipeModule } from "ng2-search-filter";
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { 
	IgxDragDirective,
	IgxDropDirective,
	IgxDragDropModule,
	IgxDialogModule
 } from "igniteui-angular";

 import { DragDropModule } from '@angular/cdk/drag-drop';

 import { NgHttpLoaderModule } from 'ng-http-loader';
 
@NgModule({
  declarations: [
    AppComponent,
    GifsComponent,
    GifsstoredComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    FormsModule,
    IgxDragDropModule,
    IgxDialogModule,
    DragDropModule,
    NgHttpLoaderModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
