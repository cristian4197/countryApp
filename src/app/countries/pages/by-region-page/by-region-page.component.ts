import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.scss']
})
export class ByRegionPageComponent implements OnInit{
  countries:Country[] = [];
  regions: Region [] = ['Africa','Americas','Asia','Europe','Ocean'];
  selectedRegion!:Region|string;
  constructor(private countriesService:CountriesService) {
  }
  ngOnInit(): void {
    console.log(this.countriesService.catchStore.byCountry.term);
    this.countries = this.countriesService.catchStore.byRegion.countries;
    this.selectedRegion = this.countriesService.catchStore.byRegion.region;
  }

  searchByRegion(term:Region):void {
    this.selectedRegion = term;
    const typeSearch = 'region';
    this.countriesService.searchCapital(term,typeSearch).subscribe((response) => {
      this.countries =  response;
    });
  }
}
