import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as AOS from 'aos';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isPaused: boolean = false;
  contactForm!: FormGroup;
  numb?: any;

  slidesToShow = 3;
  screenWidth!: number;

  slideConfig = {
    slidesToShow: this.slidesToShow,
    slidesToScroll: 1,
  };

  slideitemss: any = [1, 2];
  slideItems: any[] = [
    {
      smallText: 'Mean Stack',
      bigText: 'Genefyt',
      description: 'NFTs & Crypto Freelance Platform',
    },
    {
      smallText: 'Mean Stack',
      bigText: 'NextGen',
      description: 'Online Education Platform',
    },
    {
      smallText: 'Angular, PHP, MySQL',
      bigText: 'TuniSoul',
      description: 'Tourism Website',
    },
    {
      smallText: 'Mean Stack',
      bigText: 'ChebaLabo',
      description: 'Medical Analysis Lab',
    },
  ];
  constructor(private formBuilder: FormBuilder) {
    this.getScreenSize();
  }

  ngOnInit() {
    AOS.init();

    this.contactForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: [''],
      message: ['', Validators.required],
    });
  }
  ngAfterViewInit() {
    AOS.init();
  }
  submitForm() {
    if (this.contactForm.valid) {
      // Handle form submission
      // You can access the form values using this.contactForm.value
    }
  }
  slides = [
    {
      img: '../../../assets/genefyt.png',
      logo: '../../../assets/genefyt-logo.png',
      tag: 'Marketplace for NFT designers (MEAN)',
      description:
        'Genefyt is a marketplace for NFT designers to sell their NFT collections.',
      github: 'https://github.com/laakri/GENEFYT',
    },
    {
      img: '../../../assets/nextgen.png',
      logo: '../../../assets/nextgen-logo.png',
      tag: 'Education website for online learning (MEAN)',
      description:
        'NextGen is an education website offering online courses and learning materials.',
      github: 'https://github.com/laakri/EducationPFA',
    },
    {
      img: '../../../assets/tasky.png',
      logo: '../../../assets/tasky-logo.png',
      tag: 'Task management made easy (MEAN)',
      description:
        'Tasky is a task manager website that helps you organize and manage your tasks effectively.',
      github: 'https://github.com/laakri/Task-Manager',
    },
    {
      img: '../../../assets/labo.png',
      logo: '../../../assets/labo-logo.png',
      tag: 'Online medical analysis results (MEAN)',
      description:
        'Labocheba provides an online platform for accessing and viewing your medical analysis results.',
      github: 'https://github.com/laakri/laboratoires',
    },
    {
      img: '../../../assets/tourism.jpg',
      logo: '../../../assets/tounisaol-logo.png',
      tag: 'Book hotels in Tunisia (ANGULAR-PHP-MYSQL)',
      description:
        'Tunisaol is a tourism website that allows you to book hotels and accommodations in Tunisia.',
      github: 'https://github.com/laakri/TourismWeb',
    },
  ];

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.screenWidth = window.innerWidth;

    if (this.screenWidth <= 800) {
      this.slidesToShow = 1;
    } else if (this.screenWidth < 1100) {
      this.slidesToShow = 2;
    } else {
      this.slidesToShow = 3;
    }

    // Update the number of slides to show
    this.slideConfig = {
      ...this.slideConfig,
      slidesToShow: this.slidesToShow,
    };
  }
}
