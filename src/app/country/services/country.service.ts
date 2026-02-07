import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient)

  searchByCapital(query: string) {
    query = query.toLocaleLowerCase();

    return this.http.get(`${environment.apiUrl}/capital/${query}`)
  }

}
