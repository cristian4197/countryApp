import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.scss']
})
export class CountryPageComponent implements OnInit{
  public country!:Country|null;
  constructor(
    private activateRouter:ActivatedRoute,
    private countriesService:CountriesService,
    private router:Router
    ) {  }
  
  ngOnInit(): void {
    this.activateRouter.params
    .pipe(
      // switchMap, nos retorna un observable
      switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode(id))
    )
    .subscribe((country) => {
      if(!country) return this.router.navigateByUrl('');
      return this.country = country;
    })
  }
}
