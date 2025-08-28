import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HomeService, AboutMe } from './home.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './home.html'
})
export class Home {
  private readonly homeService = inject(HomeService);
  protected readonly aboutMe$: Observable<AboutMe> = this.homeService.getAboutMe();
}
