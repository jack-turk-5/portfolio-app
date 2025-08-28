import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { SkillsService } from './skills.service';
import { Skill } from './skill.model';
import { map, Observable } from 'rxjs';

interface SkillsByCategory {
  [category: string]: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule
  ],
  templateUrl: './skills.html'
})
export class Skills {
  private readonly skillsService = inject(SkillsService);
  protected readonly skillsByCategory$: Observable<SkillsByCategory> = this.skillsService.getSkills().pipe(
    map(skills => {
      return skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
      }, {} as SkillsByCategory);
    })
  );
}
