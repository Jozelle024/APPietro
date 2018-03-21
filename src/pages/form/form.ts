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
  oggetti: OggettoPrestato[] = [];
  oggettoRicevuto: OggettoPrestato;
  users: User[];
  nome: string;
  idUser: number;
  nomeUser: string;
  data: string;
  id: number;
  base64Image;
  photos;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private camera: Camera,
              private servizioOggetto: OggettoProvider,
              private nativeStorage: NativeStorage) {
    this.oggettoRicevuto = this.navParams.get('oggettoRicevuto');
    this.servizioOggetto.getUsers().subscribe(users => this.users = users);
    this.nome = '';
    this.data = '';
    this.idUser = 1;
    this.id = 0;
  }

  ionViewDidLoad() {
    this.nativeStorage.getItem('oggetti').then(data => {
    this.oggetti = this.oggetti.concat(data);
    }
  );
  }

  getUser(id: number):string{
    const temp = this.users.find(user => user.id === id);
    return temp.nome;
  }

  salvaDati(){
    if(this.oggetti){
      const newOggetto = new OggettoPrestato();
      newOggetto.id = this.id + 1;
      newOggetto.nome = this.nome;
      newOggetto.stato = false;
      newOggetto.data = this.data;
      newOggetto.idUser = this.idUser;
      this.oggetti.push(newOggetto);
      console.log(this.oggetti);
      this.nativeStorage.setItem('oggetti', this.oggetti);
      this.navCtrl.push(HomePage);
    }
  }

  takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: 0
    }
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData
      this.photos.push(this.base64Image);
      console.log('prova');
    },(error) => console.error(error))
  }
}
