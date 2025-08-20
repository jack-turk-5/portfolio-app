import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { SkillsService } from './skills.service';
import { Skill } from './skill.model';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule
  ],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class Skills {
  private readonly skillsService = inject(SkillsService);
  protected readonly skillsByCategory: { [category: string]: Skill[] } = {};

  constructor() {
    this.skillsByCategory = this.skillsService.getSkills().reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {} as { [category: string]: Skill[] });
  }

  protected getCategories(): string[] {
    return Object.keys(this.skillsByCategory);
  }
}
