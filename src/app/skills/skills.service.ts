import { Injectable } from '@angular/core';
import { Skill } from './skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private readonly skills: Skill[] = [
    // Frameworks & Languages
    { name: 'Java', category: 'Frameworks & Languages' },
    { name: 'Micronaut', category: 'Frameworks & Languages' },
    { name: 'Spring Boot', category: 'Frameworks & Languages' },
    { name: 'C#', category: 'Frameworks & Languages' },
    { name: '.NET MAUI', category: 'Frameworks & Languages' },
    { name: 'TypeScript', category: 'Frameworks & Languages' },
    { name: 'Angular', category: 'Frameworks & Languages' },
    { name: 'Python', category: 'Frameworks & Languages' },
    { name: 'FastAPI', category: 'Frameworks & Languages' },
    { name: 'Flask', category: 'Frameworks & Languages' },

    // Databases & Streaming
    { name: 'PostgreSQL', category: 'Databases & Streaming' },
    { name: 'Apache Kafka', category: 'Databases & Streaming' },
    { name: 'Graph Database', category: 'Databases & Streaming' },

    // Containerization & Orchestration
    { name: 'Docker', category: 'Containerization & Orchestration' },
    { name: 'Podman', category: 'Containerization & Orchestration' },
    { name: 'Proxmox', category: 'Containerization & Orchestration' },
    { name: 'Kubernetes', category: 'Containerization & Orchestration' },
    { name: 'Argo Workflows', category: 'Containerization & Orchestration' },

    // DevOps & Security
    { name: 'Keycloak (OAuth2 SSO)', category: 'DevOps & Security' },
    { name: 'Nginx', category: 'DevOps & Security' },
    { name: 'Caddy', category: 'DevOps & Security' },
    { name: 'WireGuard', category: 'DevOps & Security' },
    { name: 'Argo', category: 'DevOps & Security' },

    // Operating Systems
    { name: 'Windows', category: 'Operating Systems' },
    { name: 'macOS', category: 'Operating Systems' },
    { name: 'Ubuntu', category: 'Operating Systems' },
    { name: 'iOS', category: 'Operating Systems' },
    { name: 'Alpine Linux', category: 'Operating Systems' },
    { name: 'Arch Linux', category: 'Operating Systems' },
  ];

  getSkills(): Skill[] {
    return this.skills;
  }
}
