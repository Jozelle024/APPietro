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
  oggetti: OggettoPrestato[];
  oggettoRicevuto: OggettoPrestato;
  users: User[];
  nome: string;
  idUser: number;
  nomeUser: string;
  data: string;
  id: number;
  base64Image;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private camera: Camera,
              private servizioOggetto: OggettoProvider,
              private nativeStorage: NativeStorage) {
    this.oggettoRicevuto = this.navParams.get('oggetto');
    this.nome = '';
    this.data = '';
    this.idUser = 1;
    this.id = 0;
    this.oggetti = [];
  }

  ionViewDidLoad() {
    this.oggetti = this.servizioOggetto.getOggettiPrestati();
    //this.nativeStorage.getItem('oggetti').then(data => this.oggetti = data);
    // this.servizioOggetto.getOggettiPrestati().subscribe(oggetti => this.oggetti = oggetti);
    this.servizioOggetto.getUsers().subscribe(users => this.users = users);
    
    if(this.oggettoRicevuto){
      this.nome = this.oggettoRicevuto.nome;
      this.idUser = this.oggettoRicevuto.idUser;
      this.data = this.oggettoRicevuto.data;
      this.base64Image = this.oggettoRicevuto.imgUrl;
    }
  }

  getUser(id: number):string{
    if(id){
      const temp = this.users.find(user => user.id === id);
      return temp.nome;
    } else {
      return '';
    }
  }

  salvaDati(){
    if(this.oggetti){
      const newOggetto = new OggettoPrestato();
      newOggetto.nome = this.nome;
      newOggetto.data = this.data;
      newOggetto.id = this.id + 1;
      newOggetto.stato = false;
      newOggetto.idUser = this.idUser;
      newOggetto.imgUrl = this.base64Image;
      this.oggetti.push(newOggetto);
      this.nativeStorage.setItem('oggetti', this.oggetti).then(
        () => {this.navCtrl.push(HomePage);}
      );
    }
  }

  takePicture(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: 1,
      targetWidth: 160,
      targetHeight: 160
    }
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;

    },(error) => console.error(error));
  }
}
