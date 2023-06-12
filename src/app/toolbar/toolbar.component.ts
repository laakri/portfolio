import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  isBrightTheme: any;

  constructor() {}

  ngOnInit(): void {
    this.isBrightTheme = document.body.classList.contains('bright-theme');
    const savedTheme = localStorage.getItem('mode');

    if (savedTheme) {
      document.body.classList.add(savedTheme);
    }
  }
  change_theme(): void {
    const currentTheme = document.body.classList.contains('bright-theme')
      ? 'bright-theme'
      : 'dark-theme';
    const newTheme =
      currentTheme === 'bright-theme' ? 'dark-theme' : 'bright-theme';

    localStorage.setItem('mode', newTheme);

    document.body.classList.remove(currentTheme);
    document.body.classList.add(newTheme);
  }
}
