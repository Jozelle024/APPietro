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
  constructor(public navCtrl: NavController,
              private servizioOggetto: OggettoProvider) {
    this.servizioOggetto.getOggettiPrestati().subscribe(oggetti => this.oggetti = oggetti);

  }

  getUser(id: number){

  }

}
