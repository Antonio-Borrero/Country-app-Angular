import { Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'by-country',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country-page.html',
})
export class ByCountry { 
  countryService = inject(CountryService)
  query = signal("")

  countryResource = resource({
    params: () => ({query: this.query()}),
    loader: async ({params}) => {
      if (!params.query) return [];
      return await firstValueFrom(this.countryService.searchByCountry(params.query))
    }
  })
}
