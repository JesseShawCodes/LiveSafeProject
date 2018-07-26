import { Component, OnInit } from '@angular/core';
import { NewsService, NewsItem } from '../core';
import * as $ from 'jquery';

const API = 'http://localhost:3000/data';
@Component({
  selector: 'app-home',
  template: `
    <div class="input-container">
      <input type="text" placeholder="Search News" #search (keyup)="onKeyUp(search.value)">
    </div>

    <app-feed *ngIf="!loading" [news]="news"></app-feed>

    <app-loader *ngIf="loading"></app-loader>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading = false;
  news: NewsItem[] = [];

  constructor(private hn: NewsService) {}

  ngOnInit() {
    this.loading = true;

    this.hn.getNews().subscribe(data => {
      this.loading = false;
      this.news = data;
    });
  }
  /* Updated onKeyUp function to change this.news as user types in Search Bar*/
  onKeyUp(value: string) {
    // this.loading = true;
    console.log(value);
    var link = `${API}/${value}`
    this.hn.getNews().subscribe(data => {
      this.loading = false;
      // this.news = data;
      var newData = [];
      $.getJSON( link, function( data ) {
        for (var i = 0; i < data.length; i++) {
          newData.push(data[i])
        }
      });
      console.log(newData);
      this.news = newData
    });

  }
}
