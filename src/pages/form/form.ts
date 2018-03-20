import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { OggettoPrestato } from '../../models/oggettoPrestato';
import { User } from '../../models/user';
import { OggettoProvider } from '../../providers/oggetto/oggetto';
import { NativeStorage } from '@ionic-native/native-storage';
import { HomePage } from '../home/home';

/**
 * Generated class for the FormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {
  options: CameraOptions;
  imageUrl;
  oggettoPassato: OggettoPrestato;
  oggetti: OggettoPrestato[];
  oggettiLength: number;
  users: User[];
  nome: string;
  idUser: number;
  nomeUser: string;
  data: string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private camera: Camera,
              private servizioOggetto: OggettoProvider,
              private nativeStorage: NativeStorage) {
    this.oggettoPassato = this.navParams.get('oggetto');
    this.servizioOggetto.getUsers().subscribe(users => this.users = users);
    this.oggettiLength = 0;
    this.oggetti = [];
  }

  ionViewDidLoad() {
    this.caricaDati();
  }

  getUser(id: number):string{
    const temp = this.users.find(user => user.id === id);
    return temp.nome;
  }

  takePicture(){
    this.camera.getPicture().then((imageData) => {
      this.imageUrl = imageData;
      console.log('prova');
    },(error) => console.error(error))
  }
  
  caricaDati(){
    if(this.oggettoPassato){
      this.nome = this.oggettoPassato.nome;
      this.data = this.oggettoPassato.data;
      this.idUser = this.oggettoPassato.idUser;
    }
  }

  salvaDati(){
    if(!this.oggettoPassato) {
      const newOggetto = new OggettoPrestato();
      newOggetto.id =  this.oggettiLength+ 1;
      newOggetto.nome = this.nome;
      newOggetto.stato = false;
      newOggetto.data = this.data;
      newOggetto.idUser = 2;
      this.oggetti.push(newOggetto);
      this.nativeStorage.setItem('oggetti', this.oggetti);
      this.navCtrl.push(HomePage);
    }
  }

}
