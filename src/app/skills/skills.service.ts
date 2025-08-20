import { Injectable } from '@angular/core';
import { Skill } from './skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private readonly skills: Skill[] = [
    // Frontend
    { name: 'Angular', category: 'Frontend' },
    { name: 'TypeScript', category: 'Frontend' },
    { name: 'RxJS', category: 'Frontend' },
    { name: 'HTML5', category: 'Frontend' },
    { name: 'SCSS', category: 'Frontend' },

    // Backend
    { name: 'Node.js', category: 'Backend' },
    { name: 'Express', category: 'Backend' },
    { name: 'Python', category: 'Backend' },
    { name: 'FastAPI', category: 'Backend' },
    { name: 'PostgreSQL', category: 'Backend' },

    // DevOps
    { name: 'Docker', category: 'DevOps' },
    { name: 'Google Cloud', category: 'DevOps' },
    { name: 'CI/CD', category: 'DevOps' },

    // Tools
    { name: 'Git', category: 'Tools' },
    { name: 'VS Code', category: 'Tools' },
    { name: 'Figma', category: 'Tools' },
  ];

  getSkills(): Skill[] {
    return this.skills;
  }
}
