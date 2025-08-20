import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [MatCardModule, MatListModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class Skills {

}
