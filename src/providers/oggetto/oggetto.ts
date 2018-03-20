import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { OggettoPrestato } from '../../models/oggettoPrestato';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

/*
  Generated class for the OggettoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OggettoProvider {
  user: User;
  users: User[];
  oggetto: OggettoPrestato;
  oggetti: OggettoPrestato[];
  constructor() {
    this.users = [{id: 1, nome: 'Jozelle', cognome: 'Lauzon'},
                  {id: 2, nome: 'Stefano', cognome: 'Fandino'},
                  {id: 3, nome: 'Kyra', cognome: 'Cabrera'}]
    this.oggetti = [{id: 1, nome: 'Oggetto 1', stato: true, data: '20-3-18', idUser: 1},
                    {id: 2, nome: 'Oggetto 2', stato: false, data: '11-2-18', idUser: 2},
                    {id: 3, nome: 'Oggetto 3', stato: false, data: '10-1-18', idUser: 3},
                    {id: 4, nome: 'Oggetto 4', stato: true, data: '5-12-17', idUser: 2},
                    {id: 5, nome: 'Oggetto 5', stato: true, data: '2-3-18', idUser: 2}]
  }

  getOggettiPrestati(): Observable<OggettoPrestato[]>{
    return of (this.oggetti);
  }

}
