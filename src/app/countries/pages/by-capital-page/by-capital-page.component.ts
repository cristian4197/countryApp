import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.scss']
})
export class ByCapitalPageComponent implements OnInit {
    countries:Country[] = [];
    isLoading = false;
    initialValue = '';
    constructor(private countriesService:CountriesService) {  }

    ngOnInit(): void {
      this.countries = this.countriesService.catchStore.byCapital.countries;
      this.initialValue = this.countriesService.catchStore.byCapital.term;
    }

    searchByCapital(term:string):void {
      this.isLoading = true;
      const typeSearch = 'capital';
      this.countriesService.searchCapital(term,typeSearch).subscribe((response) => {
        this.countries =  response;
        this.isLoading = false;
      });
    }
}
