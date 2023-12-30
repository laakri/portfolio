import { ResumeComponent } from './resume/resume.component';
import { AboutComponent } from './about/about.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './mainpage/mainpage.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: MainpageComponent },
  { path: 'main', component: MainpageComponent },
  {
    path: 'h',
    component: ToolbarComponent,
    children: [
      { path: '', redirectTo: '/h/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'resume', component: ResumeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
