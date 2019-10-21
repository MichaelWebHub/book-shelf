import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    const db = localStorage.getItem('db');
    if (!db) {
      localStorage.setItem('db', JSON.stringify([]));
    }
  }
}
