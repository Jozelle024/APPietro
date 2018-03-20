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
    this.users = [{id: 1, nome: 'Jozelle', cognome: 'Lauzon'}]
    this.oggetti = [{id: 1, nome: 'Oggetto 1', stato: true, data:'2018-4-5', idUser: 1}]
  }

  getOggettiPrestati(): Observable<OggettoPrestato[]>{
    return of (this.oggetti);
  }

  getUsers(): Observable<User[]>{
    return of (this.users);
  }

}
