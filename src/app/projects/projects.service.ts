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
      description: 'A reactive Micronaut backend (using R2DBC and PostgreSQL) to support non-blocking I/O, high concurrency, and seamless real-time ticket workflows. Built a PDF Generation Microservice to automatically generate and deliver work tickets, eliminating the need for manual data entry. Developed a .NET MAUI iOS client for ticket generation, boosting data-capture efficiency for oilfield contractors by 90%.',
      technologies: ['Micronaut', 'PostgreSQL', 'R2DBC', 'Docker', '.NET MAUI', 'Keycloak', 'Caddy', 'WireGuard']
    },
    {
      title: 'WireGuard Pro',
      description: 'Engineered a fully rootless WireGuard VPN-In-A-Container using Podman Quadlets and BoringTun, eliminating the need for kernel modules and minimizing attack surface while cutting setup time by 75% and simplifying administration. Built a custom Systemd socket-activation-based network stack to forward encrypted traffic to the internet while isolating the host LAN, improving throughput by 40% and achieving near-native user-space performance.',
      technologies: ['Podman', 'BoringTun', 'Systemd', 'Rust', 'WireGuard', 'FastAPI', 'Angular'],
      sourceUrl: `${AppConstants.GITHUB_URL}/wireguard-pro`
    },
    {
      title: 'Data Lineage Visualization Tool',
      description: 'Designed and implemented a Graph Database-backed data lineage visualization tool using Micronaut, consolidating disparate data sources to accelerate audit traceability. Built a Kafka-backed streaming event ledger and updated system to support real-time, event-driven graph modifications and historical metadata recall.',
      technologies: ['Micronaut', 'Kafka', 'Graph Database', 'Kubernetes', 'Argo Workflows', 'Docker']
    }
  ];

  getProjects(): Project[] {
    return this.projects;
  }
}
