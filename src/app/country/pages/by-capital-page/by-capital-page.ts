import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPage {

  countryService = inject(CountryService)
  
  onSearch(query:string){
    this.countryService.searchByCapital(query).subscribe( resp => {
        console.log(resp)
      })
  }
}
