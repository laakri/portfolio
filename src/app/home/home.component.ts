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
  screenWidth?: number;
  slidesToShow = 3;
  numb?: any;

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
  constructor(private formBuilder: FormBuilder) {}

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
    { img: '../../../assets/mitchell-luo-FWoq_ldWlNQ-unsplash.jpg' },
    { img: '../../../assets/mitchell-luo-FWoq_ldWlNQ-unsplash.jpg' },
    { img: '../../../assets/mitchell-luo-FWoq_ldWlNQ-unsplash.jpg' },
    { img: '../../../assets/mitchell-luo-FWoq_ldWlNQ-unsplash.jpg' },
  ];
  slideConfig = { slidesToShow: this.slidesToShow, slidesToScroll: 1 };

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth >= 1126) {
      this.slidesToShow = 1;
    } else {
      this.slidesToShow = 3;
    }
  }
}
