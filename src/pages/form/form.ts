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
  oggettoRicevuto: OggettoPrestato;
  newOggetto: OggettoPrestato = new OggettoPrestato();
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
    this.oggettoRicevuto = this.navParams.get('oggettoRicevuto');
    console.log(this.navParams.get('oggettoRicevuto'));
    this.servizioOggetto.getUsers().subscribe(users => this.users = users);
    this.nome = '';
    this.data = '';
    this.idUser = 0;
  }

  ionViewDidLoad() {
    this.caricaDati();
    console.log(this.oggettoRicevuto);
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
      console.log(this.oggettoRicevuto);
  }

  salvaDati(){
    if(!this.oggettoRicevuto) {
      const newOggetto = new OggettoPrestato();
      newOggetto.id =  1;
      newOggetto.nome = this.nome;
      newOggetto.stato = false;
      newOggetto.data = this.data;
      newOggetto.idUser = 1;
      this.nativeStorage.setItem('oggetto', newOggetto).then(
        ()=> console.log('Set item success')
      );
      this.navCtrl.push(HomePage);
    }
  }
}
