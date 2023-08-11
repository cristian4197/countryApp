import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CatchStore } from '../interfaces/cacht-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private apiRul = 'https://restcountries.com/v3.1';
  catchStore: CatchStore = {
    byCapital: {
      term:'',
      countries: []
    },
    byCountry: {
      term:'',
      countries: []
    },
    byRegion: {
      region:'',
      countries: []
    }

  };
  constructor(private htppClient:HttpClient) {
    this.loadFromLocalStorage();
   }

  searchCountryByAlphaCode(code: string):Observable<Country| null> {
    const url = `${ this.apiRul }/alpha/${code}`;
    return this.htppClient.get<Country[]>(url).
    pipe(
      map( countries => countries.length>0 ? countries[0]:null),
      catchError( () => of(null))
    );
  }

  searchCapital(termToSearch:string, typeSearch:string):Observable<Country[]> {
    const url = `${ this.apiRul }/${typeSearch}/${termToSearch}`;
    return this.htppClient.get<Country[]>(url).
    pipe(
      tap( countries => {
            this.setCatchStore(countries, typeSearch, termToSearch);          
      }),
      tap(()=>this.saveToLocalStorage()),
      catchError( () => of([]))
    );
  }

  // Guardamos la data
  private saveToLocalStorage():void {
    localStorage.setItem('catchStore', JSON.stringify(this.catchStore));
  }
  // Obtenemos la data
  private loadFromLocalStorage():void {
    if(!localStorage.getItem('catchStore')) return;
    // El simbolo ! es para indicar que se que vendra un valor
    this.catchStore = JSON.parse(localStorage.getItem('catchStore')!);
  }

 
  private setCatchStore(countries:Country[], typeSearch:string, termToSearch:string | Region):void {
      switch(typeSearch){
        case 'capital': {
          this.catchStore.byCapital.countries = countries;
          this.catchStore.byCapital.term = termToSearch;
          break;
        }

        case 'name': {
          this.catchStore.byCountry.countries = countries;
          this.catchStore.byCountry.term = termToSearch;
          break;
        }

        case 'region': {
          this.catchStore.byRegion.countries = countries;
          this.catchStore.byRegion.region = termToSearch;
          break;
        }

        default:{
          console.log("Tipo de busqueda no valida");
          break;
        }

      }
  }
}
