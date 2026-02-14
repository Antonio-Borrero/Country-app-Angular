import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { map, catchError, throwError, Observable, of, tap } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient)
  private queryCacheCapital = new Map<string, Country[]>();

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();

    if (this.queryCacheCapital.has(query)){
      return of(this.queryCacheCapital.get(query) ?? [])
    }

    return this.http.get<RESTCountry[]>(`${environment.apiUrl}/name/${query}`)
      .pipe(
        map((restCountries) => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        tap((countries) => this.queryCacheCapital.set(query, countries)),
        catchError((error) => {
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

  searchByCode(code: string) {

    return this.http.get<RESTCountry[]>(`${environment.apiUrl}/alpha/${code}`)
      .pipe(
        map((restCountries) => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        map((countries) => countries.at(0)),
        catchError((error) => {
          console.log("Error fetching: ", error);
          return throwError(() => new Error(`No se pudo obtener países con "${code}"`))
        })
      )
  }
}
