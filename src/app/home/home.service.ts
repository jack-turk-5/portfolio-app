import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AboutMe {
  title: string;
  summary: string;
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/about`;

  getAboutMe(): Observable<AboutMe> {
    return this.http.get<AboutMe>(this.apiUrl);
  }
}
