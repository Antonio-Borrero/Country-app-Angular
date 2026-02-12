import { Component, inject, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'by-country',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country-page.html',
})
export class ByCountry { 
  countryService = inject(CountryService)
  query = signal("")

  countryResource = rxResource({
    params: () => ({query: this.query()}),
    stream: ({params}) => {
      if (!params.query) return of([])
      return this.countryService.searchByCountry(params.query)
    }
  })
}
