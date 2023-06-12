import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isBrightTheme: any;
  title = 'prof-web';
  showLoadingScreen = true;

  ngOnInit(): void {
    this.isBrightTheme = document.body.classList.contains('bright-theme');
    const savedTheme = localStorage.getItem('mode');

    if (savedTheme) {
      document.body.classList.add(savedTheme);
    }
    window.addEventListener('load', () => {
      this.showLoadingScreen = false;
      document.querySelector('.root')?.setAttribute('style', 'display: block');
    });
  }
}
