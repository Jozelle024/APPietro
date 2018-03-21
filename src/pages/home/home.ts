import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OggettoProvider } from '../../providers/oggetto/oggetto';
import { OggettoPrestato } from '../../models/oggettoPrestato';
import { User } from '../../models/user';
import { FormPage } from '../form/form';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  oggetti: OggettoPrestato[] = [];
  insertedOggetti: OggettoPrestato [];
  users: User[];

  constructor(public navCtrl: NavController,
              private servizioOggetto: OggettoProvider) {
    this.servizioOggetto.getOggettiPrestati().subscribe(oggetti => this.insertedOggetti = oggetti);
    this.servizioOggetto.getUsers().subscribe(users => this.users = users );
  }

  ionViewDidLoad(){
  }

  getUser(id: number):string{
    
    const temp = this.users.find(user => user.id === id);
    return temp.nome;
  }
  
  vaiAllaFormPage(){
    this.navCtrl.push(FormPage);
  }

  vaiPaginaModifica(oggetto: OggettoPrestato){
    console.log(oggetto)
    this.navCtrl.push(FormPage,
    { oggetto: oggetto});
  }

  isRestituito(oggetto: OggettoPrestato){
    if(oggetto.stato === true){
      return 'Si'
    } else return 'No'
  }

  restituito(oggetto: OggettoPrestato){
    oggetto.stato = true;
  }
}
