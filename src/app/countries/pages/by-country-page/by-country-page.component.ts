import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.scss']
})
export class ByCountryPageComponent implements OnInit{
  countries:Country[] = [];
  initialValue = '';
  constructor(private countriesService:CountriesService) {
  }

  ngOnInit(): void {
    this.countries = this.countriesService.catchStore.byCountry.countries;
    this.initialValue = this.countriesService.catchStore.byCountry.term;
  }

  searchByCountry(term:string):void {
    const typeSearch = 'name';
    this.countriesService.searchCapital(term,typeSearch).subscribe((response) => {
      this.countries =  response;
    });
  }
}
