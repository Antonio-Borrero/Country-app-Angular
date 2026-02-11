import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { map, Observable, catchError, throwError } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient)

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();

    return this.http.get<RESTCountry[]>(`${environment.apiUrl}/name/${query}`)
      .pipe(
        map(restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        catchError(error => {
          console.log("Error fetching: ", error);
          return throwError(() => new Error(`No se pudo obtener países con "${query}"`))
        })
      )
  }

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();

    return this.http.get<RESTCountry[]>(`${environment.apiUrl}/capital/${query}`)
      .pipe(
        map(restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        catchError(error => {
          console.log("Error fetching: ", error);
          return throwError(() => new Error(`No se pudo obtener países con "${query}"`))
        })
      )
  }
}
