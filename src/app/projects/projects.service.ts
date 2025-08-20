import { Injectable } from '@angular/core';
import { Project } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private readonly projects: Project[] = [
    {
      title: 'Project Alpha',
      description: 'A description for Project Alpha. This project was built to solve a complex business problem using modern web technologies.',
      technologies: ['Angular', 'TypeScript', 'Node.js', 'Express'],
      liveUrl: 'https://example.com',
      sourceUrl: 'https://github.com/your-profile/project-alpha'
    },
    {
      title: 'Project Beta',
      description: 'A description for Project Beta. This was a freelance project for a local business, focusing on a great user experience.',
      technologies: ['React', 'JavaScript', 'Firebase', 'Material-UI'],
      liveUrl: 'https://example.com',
      sourceUrl: 'https://github.com/your-profile/project-beta'
    },
    {
      title: 'Project Gamma',
      description: 'A personal project to explore new technologies and build something fun. This was a great learning experience.',
      technologies: ['Vue.js', 'GraphQL', 'Apollo', 'Tailwind CSS'],
      sourceUrl: 'https://github.com/your-profile/project-gamma'
    }
  ];

  getProjects(): Project[] {
    return this.projects;
  }
}
