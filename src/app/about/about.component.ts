import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatProgressBar } from '@angular/material/progress-bar';
import {
  animate,
  style,
  transition,
  trigger,
  AnimationEvent,
} from '@angular/animations';
import { filter, map, startWith } from 'rxjs/operators';
import * as AOS from 'aos';

export interface Code {
  name: string;
  imgPath: string;
  discription: string;
  type: string;
}
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ width: '0%' }),
        animate('2000ms', style({ width: '{{progressValueback}}%' })),
        animate('2000ms', style({ width: '{{progressValuefront}}%' })),
      ]),
    ]),
  ],
})
export class AboutComponent implements OnInit {
  @ViewChild('progressBar') progressBar!: MatProgressBar;
  progressValuefront = 0;
  progressValueback = 0;
  myControl = new FormControl();
  filteredOptions!: Observable<Code[]>;

  private _filter(name: string): Code[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit(): void {
    AOS.init();
    setTimeout(() => {
      this.progressValuefront = 80;
    }, 1000);
    setTimeout(() => {
      this.progressValueback = 70;
    }, 1000);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.options.slice()))
    );
  }
  ngAfterViewInit() {
    AOS.init();
  }
  onAnimationEnd(event: AnimationEvent): void {
    if (event.toState === '80') {
      this.progressBar.mode = 'determinate';
    }
  }
  options = [
    {
      name: 'Typescript',
      imgPath: 'https://i.ibb.co/VYKcVZC/5968566.png',
      discription: 'TypeScript is a strongly typed programming language .',
      type: 'Front-end',
    },

    {
      name: 'Angular',
      imgPath: 'https://i.ibb.co/WnnssMZ/1250px-Angular-JS-logo.png',
      discription: 'Angular is a frontend platform .',
      type: 'Front-end',
    },

    {
      name: 'Css',
      imgPath:
        'https://i.ibb.co/kybbQFW/Crypto-Market-Bloodbath-Wipes-Out-Vast-Amounts-of-Wealth-as-Several-Tokens-Hit-0-1120x669.jpg',
      discription: 'used for describing the presentation of a document .',
      type: 'Front-end',
    },
    {
      name: 'Express Js',
      imgPath:
        'https://i.ibb.co/f4Ljfm4/st-small-507x507-pad-600x600-f8f8f8-u2.jpg',
      discription: 'back end web application framework for Node.js .',
      type: 'Back-end',
    },
    {
      name: 'Node Js',
      imgPath: 'https://i.ibb.co/VCFGCn6/node.png',
      discription: 'Node.js is an open source, cross platform .',
      type: 'Back-end',
    },
    {
      name: 'MongoDB',
      imgPath: 'https://i.ibb.co/2WjG7zR/mongodb-logo.png',
      discription: 'database program. Classified as a NoSQL database program .',
      type: 'Back-end',
    },
    {
      name: 'Mongoose',
      imgPath: 'https://i.ibb.co/8jVXhzZ/mongoose-logo-6287d9fc.png',
      discription: 'JavaScript object-oriented programming library .',
      type: 'Back-end',
    },
    {
      name: 'Nodemailer',
      imgPath: 'https://i.ibb.co/dfcgXTK/images.png',
      discription:
        ' module for Node.js applications to allow easy as cake email sending .',
      type: 'Back-end',
    },
    {
      name: 'Javascript',
      imgPath: 'https://i.ibb.co/vDXCnZ0/js.png',
      discription: ' JavaScript is a strongly typed programming language .',
      type: 'Back-end',
    },
    {
      name: 'Github',
      imgPath: 'https://i.ibb.co/ZhRRH46/download.png',
      discription: ' Internet hosting for software development  using Git .',
      type: 'Hoster',
    },
    {
      name: 'Postman',
      imgPath: 'https://i.ibb.co/TvHy5qf/download.png',
      discription:
        ' API platform for developers to design, build, test their APIs .',
      type: 'API Platform',
    },
    {
      name: 'Nginx',
      imgPath: 'https://i.ibb.co/N2tJsCC/nginx-logo.png',
      discription: ' A web server that can also be used as a reverse proxy .',
      type: 'Web Server',
    },
  ];
}
