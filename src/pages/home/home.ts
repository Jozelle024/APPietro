import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OggettoProvider } from '../../providers/oggetto/oggetto';
import { OggettoPrestato } from '../../models/oggettoPrestato';
import { User } from '../../models/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  oggetti: OggettoPrestato[];
  users: User[];
  id: number;
  nome: string;
  a: string;
  constructor(public navCtrl: NavController,
              private servizioOggetto: OggettoProvider) {
    this.servizioOggetto.getOggettiPrestati().subscribe(oggetti => this.oggetti = oggetti);
    this.servizioOggetto.getUsers().subscribe(users => this.users = users);
    this.id = 0;
  }

  ionViewDidLoad() {
    console.log(this.id);
  }

  getUser(id: number): number{
    const temp = this.users.find(user => user.id === id);
    return temp.id;
  }
  prova(id: number){
    this.id = id;
    console.log(id);
  }
  
}
