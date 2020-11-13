import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://heroesapp-804f2.firebaseio.com/';

  constructor( private http: HttpClient ) { }

  crearHeroe( heroe: HeroeModel ){

    return this.http.post(`${this.url}/heroes.json`, heroe)
            .pipe(
              map((resp: any) => {
                heroe.id = resp.name;
                return heroe;
              })
            );

  }
}
