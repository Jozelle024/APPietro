import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OggettoProvider } from '../../providers/oggetto/oggetto';
import { OggettoPrestato } from '../../models/oggettoPrestato';
import { User } from '../../models/user';
import { FormPage } from '../form/form';
import { ToastController} from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  oggetti: OggettoPrestato[];
  insertedOggetti: OggettoPrestato [] = [];
  users: User[];

  constructor(public navCtrl: NavController,
              private servizioOggetto: OggettoProvider,
              public toastCtrl: ToastController,
              private nativeStorage: NativeStorage) {
    this.oggetti = [];
    this.insertedOggetti = [];
  }

  ionViewDidLoad(){
    this.nativeStorage.getItem('oggetti').then(data => this.insertedOggetti = data);
   //this.insertedOggetti = this.servizioOggetto.getOggettiPrestati();
    this.servizioOggetto.getUsers().subscribe(users => this.users = users );
  }

  getUser(id: number):string{
    const temp = this.users.find(user => user.id === id);
    return temp.nome;
  }
  
  vaiAllaFormPage(){
    this.navCtrl.push(FormPage);
  }

  vaiPaginaModifica(oggetto: OggettoPrestato){
    this.navCtrl.push(FormPage,
    { oggetto: oggetto});
  }

  isRestituito(oggetto: OggettoPrestato){
    if(oggetto.stato === true){
      return 'Si'
    } else return 'No'
  }

  restituito(oggetto: OggettoPrestato){
    if(oggetto.stato === false){
      return oggetto.stato = true;
    } else {
      return oggetto.stato = false;
    }
  }

  openToast(){
    const toast = this.toastCtrl.create({
      message: 'Swipe to edit..',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  clear(){
    this.nativeStorage.clear().then( () => {
      const toast = this.toastCtrl.create({
        message: 'Local storage cleared',
        duration: 2000,
        position: 'top'
      });
      toast.present();
    });
    
  }
}
