import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconRegistry {
  constructor(
    private readonly iconRegistry: MatIconRegistry,
    private readonly sanitizer: DomSanitizer
  ) {}

  public registerIcons(): void {
    this.iconRegistry.addSvgIcon(
      'linkedin',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/linkedin.svg')
    );
    this.iconRegistry.addSvgIcon(
      'github',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg')
    );
    this.iconRegistry.addSvgIcon(
      'j-icon',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/j-icon.svg')
    );
  }
}
