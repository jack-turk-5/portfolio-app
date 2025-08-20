import { Injectable } from '@angular/core';
import { Project } from './project.model';
import { AppConstants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private readonly projects: Project[] = [
    {
      title: 'FastFill',
      description: 'A full stack work ticketing solution developed for Panhandle Oilfield Services. Simplifies and automates the invoicing process and eliminates underbilling. Complete with client-side caching, fillable PDF generation, and the ability to forward tickets directly to bookkeeping software.',
      technologies: ['.NET Maui', 'Micronaut', 'PostgreSQL', 'Docker'],
      sourceUrl: `${AppConstants.GITHUB_URL}`
    },
    {
      title: 'WireGuard Pro',
      description: 'A simple Angular UI sitting on top of CloudFlare\'s Rust version of WireGuard. Engineered to be run as a Podman container quadlet 100% rootlessly. Currently working on my own BoringTun fork to extend socket activation for 100% native performence.',
      technologies: ['Angular', 'BoringTun', 'Flask', 'Podman', 'Systemd'],
      liveUrl: 'https://example.com',
      sourceUrl: `${AppConstants.GITHUB_URL}/wireguard-pro`
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
