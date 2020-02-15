import { Injectable } from '@angular/core';
import csc from 'country-state-city';
import { ICountry, IState, ICity } from 'country-state-city';
@Injectable({
  providedIn: 'root'
})

export class CountryListService {

  constructor() { }
  get counrytList() {
     return csc.getAllCountries();
   }
   getStatesOfCountry(id) {
     return csc.getStatesOfCountry(id);
   }
}
// const headers = new HttpHeaders({
//   Authorization: 'Bearer xmQQn2d8oSSalTQnEj8Yc507YT5MHW9whT-H8YS84C9JHteRG6bxdag0f8K8wq5rtMk',
//   Accept: 'application/json'
// });
