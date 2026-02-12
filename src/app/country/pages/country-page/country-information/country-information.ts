import { Component, inject, input } from '@angular/core';
import type { Country } from '../../../interfaces/country.interface';
import { DecimalPipe, Location } from '@angular/common';

@Component({
  selector: 'country-information',
  imports: [DecimalPipe],
  templateUrl: './country-information.html',
})
export class CountryInformation { 
  country = input.required<Country>()
  location = inject(Location)

  goBack() {
    this.location.back()
  }
}
