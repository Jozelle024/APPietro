import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { OggettoPrestato } from '../../models/oggettoPrestato';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { NativeStorage } from '@ionic-native/native-storage';

/*
  Generated class for the OggettoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OggettoProvider {
  users: User[];
  oggetti: OggettoPrestato[];
  user: User;
  oggetto: OggettoPrestato;
  constructor(private nativeStorage: NativeStorage) {
    this.user = {id: 1, nome: 'Jozelle'}
    this.users = [];
    this.oggetti = [];
    // this.oggetti = [{id: 1, nome: 'Oggetto 1', stato: true, data:'2018-4-5', idUser: 1}]
  }

  getOggettiPrestati(){
    this.nativeStorage.getItem('oggetti').then(data => this.oggetti = data);
    return this.oggetti;
  }

  getUsers(): Observable<User[]>{
    this.nativeStorage.setItem('users', this.user);
    this.nativeStorage.getItem('users').then(data => {
        this.users = this.users.concat(data);
    })
    return of (this.users);
  }
}
