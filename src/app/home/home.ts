import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './home.html'
})
export class Home {
  private readonly homeService = inject(HomeService);
  protected readonly aboutMe = this.homeService.getAboutMe();
}
