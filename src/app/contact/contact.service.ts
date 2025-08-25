import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/contact`;

  public sendContactForm(formData: {
    name: string;
    email: string;
    message: string;
  }): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}
