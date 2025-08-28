import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { ProjectsService } from './projects.service';
import { Project } from './project.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule
  ],
  templateUrl: './projects.html'
})
export class Projects {
  private readonly projectsService = inject(ProjectsService);
  protected readonly projects$: Observable<Project[]> = this.projectsService.getProjects();
}
