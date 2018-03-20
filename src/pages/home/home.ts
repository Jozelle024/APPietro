import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OggettoProvider } from '../../providers/oggetto/oggetto';
import { OggettoPrestato } from '../../models/oggettoPrestato';
import { User } from '../../models/user';
import { FormPage } from '../form/form';
import { NativeStorage } from '@ionic-native/native-storage';

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
              private servizioOggetto: OggettoProvider,
              private nativeStorage: NativeStorage) {
    this.servizioOggetto.getUsers().subscribe(users => this.users = users);
    this.id = 0;
    this.nome = '';
    
  }

  ionViewDidLoad() {
    this.getDatiStorage();
  }

  getDatiStorage(){
    this.nativeStorage.getItem('oggetti').then(
      dati => {this.oggetti = dati; console.log(this.oggetti)}
  )}
  getUser(id: number):string{
    const temp = this.users.find(user => user.id === id);
    return temp.nome;
  }
  
  vaiAllaFormPage(){
    this.navCtrl.push(FormPage);
  }

  vaiPaginaModifica(oggetto: OggettoPrestato, user: string){
    this.navCtrl.push(FormPage,
    { oggetto: oggetto });
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
